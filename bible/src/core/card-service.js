/**
 * 经文主题服务
 * 提供主题 id 解析、按主题筛选、随机抽取
 */

import { categories } from '../data/cards.js';

/**
 * 取一张卡的主题 id（英文，如 'comfort'）
 *
 * 卡的 `category` 字段是中文名（如「安慰」），仅供显示；而所有查找表
 * ——categories[].id、CSS 类名、data-category、筛选下拉、统计配色——
 * 用的都是英文 id。这两套命名混用是本项目出错最多的地方，统一从这里取值。
 *
 * @param {Object} card
 * @returns {string} 主题 id；取不到时返回 ''
 */
export function getCardThemeId(card) {
    if (!card) return '';
    if (card.categoryEn) return card.categoryEn;
    // 回退：老数据可能只存了中文名，反查 categories 得到 id
    const match = categories.find((c) => c.name === card.category);
    return match ? match.id : '';
}

/**
 * 按主题筛选经文
 * @param {Array} cards - 经文数组
 * @param {string} category - 主题 id（'comfort'），'all' 或空表示全部
 * @returns {Array} 筛选后的经文数组
 */
export function filterCards(cards, category) {
    if (category === 'all' || !category) return cards;
    return cards.filter((card) => getCardThemeId(card) === category);
}

/**
 * 随机抽取一节经文
 * @param {Array} cards - 经文数组
 * @returns {Object|null} 随机选中的经文
 */
export function drawRandomCard(cards) {
    if (!cards.length) return null;
    const index = Math.floor(Math.random() * cards.length);
    return cards[index];
}
