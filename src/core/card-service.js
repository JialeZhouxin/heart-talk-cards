export function filterCards(cards, category, level) {
    return cards.filter((card) => {
        const categoryMatched = category === 'all' || card.category === category;
        const levelMatched = level === 'all' || String(card.level) === String(level);
        return categoryMatched && levelMatched;
    });
}

export function drawRandomCard(cards) {
    if (!cards.length) return null;
    const index = Math.floor(Math.random() * cards.length);
    return cards[index];
}
