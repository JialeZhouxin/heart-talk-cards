/**
 * 从 data/bible-cn/cus/books.txt 生成全本经文模块
 *
 * books.txt 是「圣经简体和合本」的纯文本全文，格式：
 *   =001 Genesis - 创世纪          ← 卷标记
 *   Ge 1:1 创世纪 1:1 起初　神创造天地。   ← 经文行（英/中节号 + 中文卷名节号 + 原文）
 *
 * 输出 src/data/bible-full.js：
 *   export const books = [...]                       卷名与索引
 *   export const verses = { 创世纪: { 1: { 1: '...' } } }
 *
 * 用法：node scripts/build-bible-full.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'data', 'bible-cn', 'cus', 'books.txt');
const OUT = path.join(ROOT, 'src', 'data', 'bible-full.js');
// 轻量卷名索引（与全本同源生成，避免两边卷名不同步）
const OUT_BOOKS = path.join(ROOT, 'src', 'data', 'book-names.js');

// 已知的繁简不统一：books.txt 里「啟示录」是繁体，其余卷名均为简体
const BOOK_NAME_FIXES = { '啟示录': '启示录' };

// 经文行：<英缩写> <章>:<节> <中文卷名> <章>:<节> <原文>
const VERSE_LINE = /^\S+\s+(\d+):(\d+)\s+(.+?)\s+(\d+):(\d+)\s+(.*)$/;
const BOOK_LINE = /^=(\d+)\s+(.+?)\s+-\s+(.+)$/;

function parse(raw) {
    const text = raw.replace(/^\uFEFF/, '');
    const books = [];
    const verses = {};
    let current = null;
    let skipped = 0;

    for (const line of text.split(/\r?\n/)) {
        if (line.startsWith('=')) {
            const m = line.match(BOOK_LINE);
            if (m) {
                let name = m[3].trim();
                if (name === 'ALL') { current = null; continue; }
                name = BOOK_NAME_FIXES[name] || name;
                current = name;
                if (!books.includes(name)) books.push(name);
                if (!verses[name]) verses[name] = {};
            }
            continue;
        }

        if (!current || !line.trim()) continue;

        const m = line.match(VERSE_LINE);
        if (!m) {
            // 卷末 'END ' 之类的标记，忽略；其他情况计数以便发现格式异常
            if (!/^END\s*$/.test(line)) skipped++;
            continue;
        }

        const chapter = Number(m[4]);
        const verse = Number(m[5]);
        const body = m[6].trim();
        if (!verses[current][chapter]) verses[current][chapter] = {};
        verses[current][chapter][verse] = body;
    }

    return { books, verses, skipped };
}

// 运行时辅助函数（随模块一起导出，写成独立常量避免嵌套引号）
const RUNTIME_HELPERS = `/**
 * 取指定经文的原文
 * @param {string} book - 卷名，如「约翰福音」
 * @param {number} chapter - 章
 * @param {number} verse - 节
 * @returns {string|null} 经文原文，找不到返回 null
 */
export function getVerse(book, chapter, verse) {
    return verses[book]?.[chapter]?.[verse] ?? null;
}

/**
 * 在全书范围内搜索关键词
 * @param {string} keyword - 关键词
 * @param {Object} [options]
 * @param {string} [options.book] - 限定卷名，不传则搜全部
 * @param {number} [options.limit] - 最多返回条数
 * @returns {Array<{book:string, chapter:number, verse:number, text:string}>}
 */
export function searchVerses(keyword, options = {}) {
    const { book = null, limit = 200 } = options;
    const kw = String(keyword || '').trim();
    if (!kw) return [];

    const result = [];
    const bookNames = book ? [book] : books;

    for (const bookName of bookNames) {
        const chapters = verses[bookName];
        if (!chapters) continue;
        for (const chapter of Object.keys(chapters)) {
            const vs = chapters[chapter];
            for (const verse of Object.keys(vs)) {
                if (vs[verse].includes(kw)) {
                    result.push({
                        book: bookName,
                        chapter: Number(chapter),
                        verse: Number(verse),
                        text: vs[verse]
                    });
                    if (result.length >= limit) return result;
                }
            }
        }
    }

    return result;
}

/**
 * 取某卷的章数
 * @param {string} book
 * @returns {number}
 */
export function getChapterCount(book) {
    const chapters = verses[book];
    return chapters ? Object.keys(chapters).length : 0;
}

/**
 * 取某卷某章的节数
 * @param {string} book
 * @param {number} chapter
 * @returns {number}
 */
export function getVerseCount(book, chapter) {
    const vs = verses[book]?.[chapter];
    return vs ? Object.keys(vs).length : 0;
}
`;

function main() {
    if (!fs.existsSync(SRC)) {
        console.error(`找不到经文源文件: ${SRC}`);
        process.exit(1);
    }

    const raw = fs.readFileSync(SRC, 'utf8');
    const { books, verses, skipped } = parse(raw);

    let verseCount = 0;
    Object.values(verses).forEach((chapters) => {
        Object.values(chapters).forEach((vs) => { verseCount += Object.keys(vs).length; });
    });

    console.log(`解析完成：${books.length} 卷，${verseCount} 节`);
    if (skipped) {
        console.warn(`警告：${skipped} 行未匹配经文格式（已忽略）`);
    }

    const banner = `/**
 * 圣经简体和合本全文（自动生成，请勿手改）
 *
 * 生成：node scripts/build-bible-full.js
 * 来源：data/bible-cn/cus/books.txt
 * 规模：${books.length} 卷 / ${verseCount} 节
 *
 * 本模块体积较大（约 3.3MB），只在需要检索经文时按需 import()，
 * 不要放进首屏加载路径。
 */`;

    const body = [
        banner,
        '',
        `export const books = ${JSON.stringify(books, null, 0)};`,
        '',
        `export const verses = ${JSON.stringify(verses)};`,
        '',
        RUNTIME_HELPERS,
        ''
    ].join('\n');
    fs.writeFileSync(OUT, body, 'utf8');
    const size = fs.statSync(OUT).size;
    console.log(`已写入 ${path.relative(ROOT, OUT)}  ${(size / 1048576).toFixed(2)} MB`);

    // 同步生成卷名索引：界面先把卷名下拉渲染出来，不必等 3.3MB 的全本
    const booksModule = `/**
 * 书卷索引（轻量，由 scripts/build-bible-full.js 自动生成，请勿手改）
 *
 * 全本经文 3.3MB（gzip 后仍 1.2MB），弱网下要十几秒才能到。但「按卷查找」
 * 的卷名下拉没必要等全本 —— 先把这个 ${books.length} 个卷名的列表同步渲染，
 * 界面立刻可用，经文正文再去后台加载。
 */

export const BOOK_NAMES = ${JSON.stringify(books, null, 4)};
`;
    fs.writeFileSync(OUT_BOOKS, booksModule, 'utf8');
    console.log(`已写入 ${path.relative(ROOT, OUT_BOOKS)}  ${fs.statSync(OUT_BOOKS).size} B`);
}

main();
