/**
 * Bible Verse Extraction Script
 * Extracts verses from CUS (Chinese Union Version Simplified) books.txt
 * and categorizes them by theme for the Bible Verse Cards app
 */

const fs = require('fs');
const path = require('path');

// Book name mapping: English -> Chinese
const bookMapping = {
    'Genesis': '创世纪',
    'Exodus': '出埃及记',
    'Leviticus': '利未记',
    'Numbers': '民数记',
    'Deuteronomy': '申命记',
    'Joshua': '约书亚记',
    'Judges': '士师记',
    'Ruth': '路得记',
    '1 Samuel': '撒母耳记上',
    '2 Samuel': '撒母耳记下',
    '1 Kings': '列王纪上',
    '2 Kings': '列王纪下',
    '1 Chronicles': '历代志上',
    '2 Chronicles': '历代志下',
    'Ezra': '以斯拉记',
    'Nehemiah': '尼希米记',
    'Esther': '以斯帖记',
    'Job': '约伯记',
    'Psalms': '诗篇',
    'Proverbs': '箴言',
    'Ecclesiastes': '传道书',
    'Song of Songs': '雅歌',
    'Isaiah': '以赛亚书',
    'Jeremiah': '耶利米书',
    'Lamentations': '耶利米哀歌',
    'Ezekiel': '以西结书',
    'Daniel': '但以理书',
    'Hosea': '何西阿书',
    'Joel': '约珥书',
    'Amos': '阿摩司书',
    'Obadiah': '俄巴底亚书',
    'Jonah': '约拿书',
    'Micah': '弥迦书',
    'Nahum': '那鸿书',
    'Habakkuk': '哈巴谷书',
    'Zephaniah': '西番雅书',
    'Haggai': '哈该书',
    'Zechariah': '撒迦利亚书',
    'Malachi': '玛拉基书',
    'Matthew': '马太福音',
    'Mark': '马可福音',
    'Luke': '路加福音',
    'John': '约翰福音',
    'Acts': '使徒行传',
    'Romans': '罗马书',
    '1 Corinthians': '哥林多前书',
    '2 Corinthians': '哥林多后书',
    'Galatians': '加拉太书',
    'Ephesians': '以弗所书',
    'Philippians': '腓立比书',
    'Colossians': '歌罗西书',
    '1 Thessalonians': '帖撒罗尼迦前书',
    '2 Thessalonians': '帖撒罗尼迦后书',
    '1 Timothy': '提摩太前书',
    '2 Timothy': '提摩太后书',
    'Titus': '提多书',
    'Philemon': '腓利门书',
    'Hebrews': '希伯来书',
    'James': '雅各书',
    '1 Peter': '彼得前书',
    '2 Peter': '彼得后书',
    '1 John': '约翰一书',
    '2 John': '约翰二书',
    '3 John': '约翰三书',
    'Jude': '犹大书',
    'Revelation': '启示录'
};

// Reverse mapping for lookup: Chinese -> English
const chineseToEnglish = {};
for (const [eng, chn] of Object.entries(bookMapping)) {
    chineseToEnglish[chn] = eng;
}

// Bible verse references by category
const verseReferences = {
    comfort: [
        { book: 'Psalms', chapter: 23, verse: 1 },
        { book: 'Psalms', chapter: 23, verse: 4 },
        { book: 'Psalms', chapter: 46, verse: 1 },
        { book: 'Psalms', chapter: 46, verse: 10 },
        { book: 'Psalms', chapter: 121, verse: 1, endVerse: 2 },
        { book: 'Isaiah', chapter: 41, verse: 10 },
        { book: 'Isaiah', chapter: 43, verse: 2 },
        { book: 'Matthew', chapter: 11, verse: 28 },
        { book: 'Matthew', chapter: 5, verse: 4 },
        { book: 'John', chapter: 14, verse: 27 },
        { book: '2 Corinthians', chapter: 1, verse: 3, endVerse: 4 },
        { book: 'Revelation', chapter: 21, verse: 4 }
    ],
    love: [
        { book: 'John', chapter: 3, verse: 16 },
        { book: 'John', chapter: 15, verse: 12, endVerse: 13 },
        { book: 'John', chapter: 13, verse: 34, endVerse: 35 },
        { book: 'Romans', chapter: 8, verse: 38, endVerse: 39 },
        { book: 'Romans', chapter: 5, verse: 8 },
        { book: '1 Corinthians', chapter: 13, verse: 4, endVerse: 8 },
        { book: '1 Corinthians', chapter: 16, verse: 14 },
        { book: 'Galatians', chapter: 5, verse: 22, endVerse: 23 },
        { book: 'Ephesians', chapter: 5, verse: 2 },
        { book: '1 John', chapter: 4, verse: 7, endVerse: 8 },
        { book: '1 John', chapter: 3, verse: 18 }
    ],
    faith: [
        { book: 'Hebrews', chapter: 11, verse: 1 },
        { book: 'Hebrews', chapter: 11, verse: 6 },
        { book: 'Mark', chapter: 9, verse: 23 },
        { book: 'Mark', chapter: 11, verse: 22, endVerse: 24 },
        { book: 'Romans', chapter: 10, verse: 17 },
        { book: '2 Corinthians', chapter: 5, verse: 7 },
        { book: 'Ephesians', chapter: 2, verse: 8 },
        { book: 'James', chapter: 2, verse: 17 },
        { book: '1 John', chapter: 5, verse: 4 }
    ],
    strength: [
        { book: 'Philippians', chapter: 4, verse: 13 },
        { book: 'Isaiah', chapter: 40, verse: 31 },
        { book: 'Isaiah', chapter: 41, verse: 10 },
        { book: 'Psalms', chapter: 27, verse: 1 },
        { book: 'Psalms', chapter: 28, verse: 7 },
        { book: 'Psalms', chapter: 31, verse: 24 },
        { book: 'Nehemiah', chapter: 8, verse: 10 },
        { book: 'Zechariah', chapter: 4, verse: 6 },
        { book: '2 Timothy', chapter: 1, verse: 7 },
        { book: 'Ephesians', chapter: 6, verse: 10 }
    ],
    wisdom: [
        { book: 'Proverbs', chapter: 3, verse: 5, endVerse: 6 },
        { book: 'Proverbs', chapter: 9, verse: 10 },
        { book: 'Proverbs', chapter: 4, verse: 7 },
        { book: 'Proverbs', chapter: 2, verse: 6 },
        { book: 'Proverbs', chapter: 19, verse: 20 },
        { book: 'James', chapter: 1, verse: 5 },
        { book: 'James', chapter: 3, verse: 17 },
        { book: 'Ecclesiastes', chapter: 7, verse: 12 },
        { book: 'Daniel', chapter: 2, verse: 20, endVerse: 21 },
        { book: 'Colossians', chapter: 2, verse: 2, endVerse: 3 }
    ],
    forgiveness: [
        { book: 'Ephesians', chapter: 4, verse: 32 },
        { book: 'Psalms', chapter: 103, verse: 12 },
        { book: 'Psalms', chapter: 32, verse: 1, endVerse: 2 },
        { book: 'Matthew', chapter: 6, verse: 14, endVerse: 15 },
        { book: 'Mark', chapter: 11, verse: 25 },
        { book: 'Luke', chapter: 6, verse: 37 },
        { book: 'Colossians', chapter: 3, verse: 13 },
        { book: '1 John', chapter: 1, verse: 9 },
        { book: 'Isaiah', chapter: 1, verse: 18 },
        { book: 'Micah', chapter: 7, verse: 18, endVerse: 19 }
    ],
    hope: [
        { book: 'Jeremiah', chapter: 29, verse: 11 },
        { book: 'Romans', chapter: 15, verse: 13 },
        { book: 'Romans', chapter: 8, verse: 24, endVerse: 25 },
        { book: 'Romans', chapter: 5, verse: 2, endVerse: 5 },
        { book: 'Psalms', chapter: 39, verse: 7 },
        { book: 'Psalms', chapter: 71, verse: 5 },
        { book: 'Psalms', chapter: 130, verse: 5 },
        { book: 'Isaiah', chapter: 40, verse: 31 },
        { book: '1 Corinthians', chapter: 13, verse: 13 },
        { book: 'Hebrews', chapter: 6, verse: 19 },
        { book: '1 Peter', chapter: 1, verse: 3, endVerse: 4 },
        { book: 'Revelation', chapter: 22, verse: 20 }
    ]
};

// Parse books.txt and build verse database
function parseBibleText(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    const verses = {};
    let currentBook = '';
    
    for (const line of lines) {
        // Skip empty lines and headers
        if (!line.trim() || line.startsWith('=')) continue;
        
        // Parse verse line: "Ge 1:1 创世纪 1:1 起初　神创造天地。"
        const match = line.match(/^([A-Za-z0-9]+)\s+(\d+):(\d+)\s+(.+?)\s+(\d+):(\d+)\s+(.+)$/);
        if (match) {
            const [, bookCode, chapter, verse, chineseBook, , , text] = match;
            const key = `${chineseBook} ${chapter}:${verse}`;
            verses[key] = {
                book: chineseBook,
                chapter: parseInt(chapter),
                verse: parseInt(verse),
                text: text.trim()
            };
        }
    }
    
    return verses;
}

// Extract verses by reference
function extractVerses(bibleVerses, references) {
    const extracted = [];
    
    for (const ref of references) {
        const chineseBook = bookMapping[ref.book];
        if (!chineseBook) {
            console.warn(`Book not found: ${ref.book}`);
            continue;
        }
        
        const endVerse = ref.endVerse || ref.verse;
        
        if (ref.verse === endVerse) {
            // Single verse
            const key = `${chineseBook} ${ref.chapter}:${ref.verse}`;
            const verse = bibleVerses[key];
            if (verse) {
                extracted.push({
                    reference: `${chineseBook} ${ref.chapter}:${ref.verse}`,
                    text: verse.text
                });
            } else {
                console.warn(`Verse not found: ${key}`);
            }
        } else {
            // Verse range
            let combinedText = '';
            for (let v = ref.verse; v <= endVerse; v++) {
                const key = `${chineseBook} ${ref.chapter}:${v}`;
                const verse = bibleVerses[key];
                if (verse) {
                    combinedText += verse.text + ' ';
                }
            }
            if (combinedText) {
                extracted.push({
                    reference: `${chineseBook} ${ref.chapter}:${ref.verse}-${endVerse}`,
                    text: combinedText.trim()
                });
            }
        }
    }
    
    return extracted;
}

// Main execution
function main() {
    const inputFile = path.join(__dirname, '..', 'data', 'bible-cn', 'cus', 'books.txt');
    const outputFile = path.join(__dirname, '..', 'data', 'verses-categorized.json');
    
    console.log('Parsing Bible text...');
    const bibleVerses = parseBibleText(inputFile);
    console.log(`Parsed ${Object.keys(bibleVerses).length} verses`);
    
    const categorized = {};
    
    for (const [category, references] of Object.entries(verseReferences)) {
        console.log(`Extracting ${category} verses...`);
        categorized[category] = extractVerses(bibleVerses, references);
        console.log(`  Found ${categorized[category].length} verses`);
    }
    
    // Write output
    fs.writeFileSync(outputFile, JSON.stringify(categorized, null, 2), 'utf8');
    console.log(`\nOutput written to: ${outputFile}`);
    
    // Print summary
    console.log('\n=== Summary ===');
    let total = 0;
    for (const [category, verses] of Object.entries(categorized)) {
        console.log(`${category}: ${verses.length} verses`);
        total += verses.length;
    }
    console.log(`Total: ${total} verses`);
}

main();
