/**
 * 今日经文服务
 *
 * 用日期做种子在 200 条精选池里确定性地选一节，保证：
 * - 同一天内所有设备看到同一节
 * - 当天不变，隔天自动更换
 * - 同一出处只出现一次（池中有 2 处重复经文，抽前按出处去重）
 *
 * 「换一句」= 在当天内向后偏移若干位，偏移量存在本地，
 * 这样刷新页面仍然停留在用户自己换到的那一节。
 */

import { STORAGE_KEYS } from './storage-migration.js';

const OFFSET_KEY = 'bibleDailyOffset';

/**
 * 基于字符串生成确定性随机数（FNV-1a + Mulberry32）
 * @param {string} seedStr
 * @returns {number} 0-1
 */
function seededRandom(seedStr) {
    let seed = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
        seed ^= seedStr.charCodeAt(i);
        seed = Math.imul(seed, 16777619);
    }
    seed = seed >>> 0;
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * 取本地日期字符串 YYYY-MM-DD
 * @param {Date} [date]
 * @returns {string}
 */
export function getTodayString(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * 按出处去重（池中「以赛亚书 41:10」「以赛亚书 40:31」各收了两次）
 * @param {Array} cards
 * @returns {Array}
 */
export function dedupeByReference(cards) {
    const seen = new Set();
    return cards.filter((card) => {
        const ref = card.reference || `id-${card.id}`;
        if (seen.has(ref)) return false;
        seen.add(ref);
        return true;
    });
}

/**
 * 读取当天的偏移量
 * @param {string} today
 * @returns {number}
 */
function loadOffset(today) {
    try {
        const raw = localStorage.getItem(OFFSET_KEY);
        if (!raw) return 0;
        const parsed = JSON.parse(raw);
        return parsed && parsed.date === today && Number.isInteger(parsed.offset) ? parsed.offset : 0;
    } catch {
        return 0;
    }
}

/**
 * 保存当天的偏移量
 * @param {string} today
 * @param {number} offset
 */
function saveOffset(today, offset) {
    try {
        localStorage.setItem(OFFSET_KEY, JSON.stringify({ date: today, offset }));
    } catch {
        // 存储不可用时不影响阅读
    }
}

/**
 * 取今日经文
 * @param {Array} cards - 精选经文池
 * @returns {Object|null} 经文对象（附带 isDailyVerse 标记）
 */
export function getTodayVerse(cards) {
    if (!cards || !cards.length) return null;

    const pool = dedupeByReference(cards);
    const today = getTodayString();
    const baseIndex = Math.floor(seededRandom(today) * pool.length);
    const offset = loadOffset(today);
    const index = (baseIndex + offset) % pool.length;

    return {
        ...pool[index],
        isDailyVerse: true,
        isDailyCard: true
    };
}

/**
 * 换一句：当天偏移 +1
 * @param {Array} cards
 * @returns {Object|null} 换过之后的经文
 */
export function nextTodayVerse(cards) {
    const today = getTodayString();
    const pool = dedupeByReference(cards);
    const current = loadOffset(today);
    saveOffset(today, (current + 1) % Math.max(pool.length, 1));
    return getTodayVerse(cards);
}

/**
 * 今天是否已经为今日经文写下感受
 * @param {Array} history
 * @param {Array} cards
 * @returns {boolean}
 */
export function isTodayVerseAnswered(history, cards) {
    const verse = getTodayVerse(cards);
    if (!verse) return false;
    const today = getTodayString();
    return history.some((item) => {
        if (!item || !item.card) return false;
        if (item.source !== 'daily') return false;
        const stamp = String(item.timestamp || '');
        return item.card.reference === verse.reference && stamp.startsWith(today.replace(/-/g, '/'));
    });
}
