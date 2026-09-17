/**
 * 按类别筛选经文
 * @param {Array} cards - 经文数组
 * @param {string} category - 主题类别筛选（'all' 表示全部）
 * @returns {Array} 筛选后的经文数组
 */
export function filterCards(cards, category) {
    return cards.filter((card) => {
        return category === 'all' || card.category === category;
    });
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
