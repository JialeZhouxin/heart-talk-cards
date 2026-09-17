/**
 * 经文检索服务
 *
 * 两种找法：
 * 1. 三级选择（卷 → 章 → 节）—— 知道出处时用，快且准
 * 2. 关键词搜索 —— 记得某句话但忘了在哪卷时用
 *
 * 全书全文（3.3MB）按需 import()，只在用户真正打开检索时才加载。
 */

let fullBibleModule = null;
let loadingPromise = null;

/**
 * 按需加载全本经文模块
 * @returns {Promise<Object>}
 */
export async function loadFullBible() {
    if (fullBibleModule) return fullBibleModule;
    if (loadingPromise) return loadingPromise;

    loadingPromise = import('../data/bible-full.js')
        .then((mod) => {
            fullBibleModule = mod;
            return mod;
        })
        .catch((error) => {
            loadingPromise = null;
            throw error;
        });

    return loadingPromise;
}

/**
 * 全本是否已经加载过
 * @returns {boolean}
 */
export function isFullBibleLoaded() {
    return fullBibleModule !== null;
}

/**
 * 取书卷列表
 * @returns {Promise<string[]>}
 */
export async function getBooks() {
    const mod = await loadFullBible();
    return mod.books;
}

/**
 * 取某卷的章数
 * @param {string} book
 * @returns {Promise<number>}
 */
export async function getChapters(book) {
    const mod = await loadFullBible();
    return mod.getChapterCount(book);
}

/**
 * 取某章有多少节
 * @param {string} book
 * @param {number} chapter
 * @returns {Promise<number>}
 */
export async function getVersesInChapter(book, chapter) {
    const mod = await loadFullBible();
    return mod.getVerseCount(book, chapter);
}

/**
 * 取指定经文
 * @param {string} book
 * @param {number} chapter
 * @param {number} verse
 * @returns {Promise<string|null>}
 */
export async function getVerse(book, chapter, verse) {
    const mod = await loadFullBible();
    return mod.getVerse(book, chapter, verse);
}

/**
 * 关键词搜索
 * @param {string} keyword
 * @param {Object} [options]
 * @param {string|null} [options.book] - 限定卷名
 * @param {number} [options.limit] - 最多返回条数（默认 200）
 * @returns {Promise<{items:Array, truncated:boolean}>}
 */
export async function searchVerses(keyword, options = {}) {
    const limit = options.limit || 200;
    const mod = await loadFullBible();
    // 多取一条用于判断是否被截断
    const items = mod.searchVerses(keyword, { book: options.book || null, limit: limit + 1 });
    const truncated = items.length > limit;
    return {
        items: truncated ? items.slice(0, limit) : items,
        truncated
    };
}

/**
 * 把搜索结果按书卷分组
 * @param {Array} items
 * @returns {Array<{book:string, count:number, verses:Array}>}
 */
export function groupByBook(items) {
    const groups = new Map();
    items.forEach((item) => {
        if (!groups.has(item.book)) {
            groups.set(item.book, { book: item.book, count: 0, verses: [] });
        }
        const group = groups.get(item.book);
        group.count++;
        group.verses.push(item);
    });
    return [...groups.values()];
}
