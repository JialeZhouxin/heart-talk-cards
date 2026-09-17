/**
 * 生成 app.bundle.js —— 供 file:// 直接打开 index.html 时使用
 *
 * 为什么需要：file:// 协议下浏览器因 CORS 限制禁止加载 ES modules，
 * 所以直接双击 index.html 时不能走 src/main.js 的 import 图。
 *
 * 做法：从 src/main.js 出发按依赖顺序收集所有模块，剥掉 import/export
 * 关键字后拼成一个大脚本。全本经文（src/data/bible-full.js）体积 3.3MB
 * 且走动态 import()，不进 bundle —— 离线时「记一节经文」的检索会降级，
 * 其余功能全部可用（与设计一致）。
 *
 * 用法：node scripts/build-bundle.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ENTRY = path.join(ROOT, 'src', 'main.js');
const OUT = path.join(ROOT, 'src', 'app.bundle.js');

// 不进 bundle 的模块（体积大 / 只在运行时按需 import）
const EXCLUDE = new Set([
    'src/data/bible-full.js'
]);

/** 依赖声明：import ... from '...'; 或 import '...'; */
const IMPORT_RE = /^\s*import\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]\s*;?\s*$/gm;

/** 动态导入：import('...') */
const DYNAMIC_IMPORT_RE = /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

/**
 * 把模块路径规范成相对 ROOT 的 posix 路径
 * @param {string} fromAbs - 引用方绝对路径
 * @param {string} spec - import 里的说明符
 * @returns {string|null} 相对 ROOT 的路径，非相对说明符返回 null
 */
function resolveSpec(fromAbs, spec) {
    if (!spec.startsWith('.')) return null;
    const abs = path.resolve(path.dirname(fromAbs), spec);
    return path.relative(ROOT, abs).split(path.sep).join('/');
}

/**
 * 解析模块导出的名字（供动态 import() 拼命名空间对象用）
 * @param {string} code
 * @returns {string[]}
 */
function parseExportNames(code) {
    const names = new Set();

    // export function foo / export async function foo / export class Foo
    for (const m of code.matchAll(/^\s*export\s+(?:async\s+)?(?:function|class)\s+([A-Za-z_$][\w$]*)/gm)) {
        names.add(m[1]);
    }
    // export const a = ... / export let / export var（可能一行多个声明）
    for (const m of code.matchAll(/^\s*export\s+(?:const|let|var)\s+([^=;\n]+)/gm)) {
        m[1].split(',').forEach((part) => {
            const name = part.trim().split(/[=\s]/)[0];
            if (/^[A-Za-z_$][\w$]*$/.test(name)) names.add(name);
        });
    }
    // export { a, b as c };
    for (const m of code.matchAll(/^\s*export\s*\{([^}]*)\}\s*;?/gm)) {
        m[1].split(',').forEach((part) => {
            const alias = part.includes(' as ') ? part.split(' as ')[1] : part;
            const name = alias.trim();
            if (/^[A-Za-z_$][\w$]*$/.test(name)) names.add(name);
        });
    }

    return [...names];
}

/**
 * 深度优先收集模块（被依赖者先输出）
 * @param {string} abs
 * @param {Set<string>} visited
 * @param {Array<{rel:string, code:string, exports:string[]}>} out
 */
function collect(abs, visited, out) {
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (visited.has(rel)) return;
    visited.add(rel);

    if (!fs.existsSync(abs)) {
        throw new Error(`模块不存在: ${rel}`);
    }

    const raw = fs.readFileSync(abs, 'utf8').replace(/^\uFEFF/, '');

    // 先递归处理依赖（静态 import）
    for (const m of raw.matchAll(IMPORT_RE)) {
        const depRel = resolveSpec(abs, m[1]);
        if (depRel && !EXCLUDE.has(depRel)) collect(path.join(ROOT, depRel), visited, out);
    }

    // 动态 import() 也把依赖收进来（除非显式排除）
    for (const m of raw.matchAll(DYNAMIC_IMPORT_RE)) {
        const depRel = resolveSpec(abs, m[1]);
        if (depRel && !EXCLUDE.has(depRel)) collect(path.join(ROOT, depRel), visited, out);
    }

    if (EXCLUDE.has(rel)) return;

    out.push({ rel, code: raw, exports: parseExportNames(raw) });
}

/**
 * 剥掉 import/export 关键字，让模块能在一个脚本里共存
 * @param {Object} mod
 * @param {Object<string,string[]>} exportsByRel
 * @param {string} fromRel
 * @returns {string}
 */
function stripModuleSyntax(mod, exportsByRel, fromRel) {
    const dynamicNs = (spec) => {
        const depRel = resolveSpec(path.join(ROOT, fromRel), spec);
        if (!depRel) return 'Promise.resolve({})';
        const names = exportsByRel[depRel];
        if (!names) {
            // 未打包（如全本经文）：给出明确失败，让调用方的降级分支生效
            return `Promise.reject(new Error(${JSON.stringify(`未打包模块: ${spec}（离线不可用）`)}))`;
        }
        return `Promise.resolve({ ${names.join(', ')} })`;
    };

    return mod.code
        // 静态 import 整行删除
        .replace(IMPORT_RE, '')
        // 动态 import('...') 换成已解析的命名空间 Promise
        .replace(DYNAMIC_IMPORT_RE, (_, spec) => dynamicNs(spec))
        // export function / export async function / export const / export let / export class
        .replace(/^(\s*)export\s+(async\s+function|function|const|let|var|class)\b/gm, '$1$2')
        // 末尾的 export { a, b };
        .replace(/^\s*export\s*\{[^}]*\}\s*;?\s*$/gm, '')
        // export default（本仓库未使用，稳妥兜底）
        .replace(/^\s*export\s+default\s+/gm, '');
}

function main() {
    const visited = new Set();
    const modules = [];

    // 收集时先不排除入口，collect 内部会跳过 EXCLUDE
    collect(ENTRY, visited, modules);

    // 未打包模块的导出名单（解析一次，供报错信息判断用）
    const exportsByRel = {};
    modules.forEach((m) => { exportsByRel[m.rel] = m.exports; });

    const parts = [];
    parts.push('/*');
    parts.push(' * app.bundle.js —— 自动生成，请勿手改');
    parts.push(' *');
    parts.push(' * 用途：file:// 直接打开 index.html 时加载（此协议下不能用 ES modules）。');
    parts.push(' * 生成：node scripts/build-bundle.js');
    parts.push(` * 模块顺序（${modules.length} 个）： ${modules.map((m) => m.rel).join(', ')}`);
    parts.push(` * 未打包（体积大 / 动态 import）： ${[...EXCLUDE].join(', ')}`);
    parts.push(' */');
    parts.push('');
    parts.push('(function () {');
    parts.push("'use strict';");
    parts.push('');

    modules.forEach((mod) => {
        parts.push(`// ==================== ${mod.rel} ====================`);
        parts.push(stripModuleSyntax(mod, exportsByRel, mod.rel).trim());
        parts.push('');
    });

    parts.push('})();');
    parts.push('');

    fs.writeFileSync(OUT, parts.join('\n'), 'utf8');

    const size = fs.statSync(OUT).size;
    console.log(`已写入 ${path.relative(ROOT, OUT)}`);
    console.log(`  模块数 ${modules.length}，体积 ${(size / 1024).toFixed(1)} KB`);
}

main();
