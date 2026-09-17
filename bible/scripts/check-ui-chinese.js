const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const targets = {
    html: path.join(root, 'index.html'),
    main: path.join(root, 'src', 'main.js'),
    render: path.join(root, 'src', 'ui', 'render.js'),
    bundle: path.join(root, 'src', 'app.bundle.js')
};

function read(filePath) {
    return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
}

function hasAsciiWord(text) {
    return /[A-Za-z]{2,}/.test(text);
}

function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function extractHtmlVisibleTexts(html) {
    const htmlWithoutScript = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '');
    const values = [];
    const textMatches = htmlWithoutScript.matchAll(/>([^<]+)</g);
    for (const match of textMatches) {
        const value = cleanText(match[1]);
        if (value) values.push(value);
    }

    const placeholderMatches = html.matchAll(/placeholder="([^"]+)"/g);
    for (const match of placeholderMatches) {
        const value = cleanText(match[1]);
        if (value) values.push(value);
    }

    return values;
}

function extractUiStringsFromJs(js) {
    const values = [];

    const directPatterns = [
        /alert\((['"`])([\s\S]*?)\1\)/g,
        /confirm\((['"`])([\s\S]*?)\1\)/g,
        /textContent\s*=\s*(['"`])([\s\S]*?)\1/g,
        /placeholder\s*=\s*(['"`])([\s\S]*?)\1/g
    ];

    for (const pattern of directPatterns) {
        for (const match of js.matchAll(pattern)) {
            const value = cleanText(match[2]);
            if (value) values.push(value);
        }
    }

    // 关键分享文案
    const shareText = js.match(/const text = `([\s\S]*?)`;/);
    if (shareText && shareText[1]) {
        values.push(cleanText(shareText[1]));
    }

    return values;
}

function validateChineseOnly(strings, fileLabel) {
    const errors = [];

    strings.forEach((value, index) => {
        const normalized = value.replace(/\$\{[\s\S]*?\}/g, '').trim();
        if (!normalized) return;

        // 跳过非展示类字符串的明显模式
        if (/^(\.\/|https?:|file:|zh-CN|all|module)$/.test(normalized)) return;
        if (hasAsciiWord(normalized)) {
            errors.push({
                file: fileLabel,
                index: index + 1,
                value: normalized
            });
        }
    });

    return errors;
}

function main() {
    const html = read(targets.html);
    const mainJs = read(targets.main);
    const renderJs = read(targets.render);
    const bundleJs = read(targets.bundle);

    const htmlErrors = validateChineseOnly(extractHtmlVisibleTexts(html), 'index.html');
    const mainErrors = validateChineseOnly(extractUiStringsFromJs(mainJs), 'src/main.js');
    const renderErrors = validateChineseOnly(extractUiStringsFromJs(renderJs), 'src/ui/render.js');
    const bundleErrors = validateChineseOnly(extractUiStringsFromJs(bundleJs), 'src/app.bundle.js');

    const errors = [...htmlErrors, ...mainErrors, ...renderErrors, ...bundleErrors];

    if (!errors.length) {
        console.log('PASS: 前端可见文案中文校验通过。');
        process.exit(0);
    }

    console.error('FAIL: 检测到可能的英文可见文案。');
    errors.forEach((item) => {
        console.error(`[${item.file}] #${item.index}: ${item.value}`);
    });
    process.exit(1);
}

main();
