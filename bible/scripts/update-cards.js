/**
 * Update cards.js with extracted Bible verses
 * Converts verses-categorized.json to cards.js format
 */

const fs = require('fs');
const path = require('path');

// Category mapping: English -> Chinese
const categoryNames = {
    comfort: '安慰',
    love: '爱心',
    faith: '信心',
    strength: '力量',
    wisdom: '智慧',
    forgiveness: '宽恕',
    hope: '盼望'
};

// Category icons
const categoryIcons = {
    comfort: '🕊️',
    love: '❤️',
    faith: '✝️',
    strength: '💪',
    wisdom: '📖',
    forgiveness: '🤝',
    hope: '🌟'
};

// Category colors
const categoryColors = {
    comfort: '#4A90E2',
    love: '#E74C3C',
    faith: '#9B59B6',
    strength: '#F39C12',
    wisdom: '#1ABC9C',
    forgiveness: '#3498DB',
    hope: '#E67E22'
};

function generateCards() {
    const versesFile = path.join(__dirname, '..', 'data', 'verses-categorized.json');
    const cardsFile = path.join(__dirname, '..', 'src', 'data', 'cards.js');
    
    // Read verses
    const versesData = JSON.parse(fs.readFileSync(versesFile, 'utf8'));
    
    const cards = [];
    let id = 1;
    
    for (const [category, verses] of Object.entries(versesData)) {
        for (const verse of verses) {
            cards.push({
                id: id++,
                category: categoryNames[category],
                categoryEn: category,
                icon: categoryIcons[category],
                color: categoryColors[category],
                reference: verse.reference,
                text: verse.text,
                question: `这节关于"${categoryNames[category]}"的经文如何触动你的心？`
            });
        }
    }
    
    // Generate cards.js content
    const cardsContent = `/**
 * Bible Verse Cards Data
 * Auto-generated from CUS (Chinese Union Version Simplified)
 * Total: ${cards.length} verses across 7 categories
 */

export const categories = [
    { id: 'comfort', name: '安慰', icon: '🕊️', color: '#4A90E2', description: '在困难中找到神的安慰' },
    { id: 'love', name: '爱心', icon: '❤️', color: '#E74C3C', description: '体验神无条件的爱' },
    { id: 'faith', name: '信心', icon: '✝️', color: '#9B59B6', description: '建立坚定的信心' },
    { id: 'strength', name: '力量', icon: '💪', color: '#F39C12', description: '从神得着力量' },
    { id: 'wisdom', name: '智慧', icon: '📖', color: '#1ABC9C', description: '寻求从神而来的智慧' },
    { id: 'forgiveness', name: '宽恕', icon: '🤝', color: '#3498DB', description: '学习宽恕与恩典' },
    { id: 'hope', name: '盼望', icon: '🌟', color: '#E67E22', description: '在基督里存着盼望' }
];

export const cards = ${JSON.stringify(cards, null, 4)};

export function getCardsByCategory(categoryId) {
    return cards.filter(card => card.categoryEn === categoryId);
}

export function getRandomCard(categoryId = null) {
    if (categoryId) {
        const categoryCards = getCardsByCategory(categoryId);
        return categoryCards[Math.floor(Math.random() * categoryCards.length)];
    }
    return cards[Math.floor(Math.random() * cards.length)];
}

export function getCardById(id) {
    return cards.find(card => card.id === id);
}
`;
    
    fs.writeFileSync(cardsFile, cardsContent, 'utf8');
    console.log(`Updated ${cardsFile} with ${cards.length} cards`);
    
    // Print summary
    console.log('\n=== Cards Summary ===');
    for (const [category, verses] of Object.entries(versesData)) {
        console.log(`${categoryNames[category]} (${category}): ${verses.length} cards`);
    }
    console.log(`\nTotal: ${cards.length} cards`);
}

generateCards();
