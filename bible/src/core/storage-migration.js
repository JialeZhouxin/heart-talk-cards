/**
 * 存储命名空间与历史数据迁移
 *
 * 背景：本应用早期是从「心语卡牌」项目复制而来，localStorage key 沿用了
 * heartTalk* 前缀。两个应用部署在同一域名（jialezhouxin.github.io）下，
 * localStorage 按源共享 → 两边的记录写进同一个数组，互相覆盖。
 *
 * 本模块：
 * 1. 提供 bible* 命名空间的新 key（STORAGE_KEYS）
 * 2. 首次启动时把 heartTalk* 里的圣经记录迁移到 bible*，并把旧 key 里
 *    属于心语卡牌的记录留下（不删），解除串台
 *
 * 原则：**凡心语卡牌还在用的 key，一律只复制、不删除。**
 * 已确认心语卡牌仍在读 heartTalkHistory 与 heartTalkTheme，故这两个 key
 * 无论内容如何都保留；heartTalkCheckIn / heartTalkDailyCard 心语卡牌不用，
 * 搬完即删。
 */

export const STORAGE_KEYS = {
    history: 'bibleHistory',
    theme: 'bibleTheme',
    checkIn: 'bibleCheckIn',
    dailyCard: 'bibleDailyCard',
    migrationFlag: 'bibleStorageMigrated'
};

/** 旧 key（来自心语卡牌项目） */
const LEGACY_KEYS = {
    history: 'heartTalkHistory',
    theme: 'heartTalkTheme',
    checkIn: 'heartTalkCheckIn',
    dailyCard: 'heartTalkDailyCard'
};

/** 7 个经文主题，用于判定某条记录是否属于圣经应用 */
const VERSE_CATEGORIES = new Set([
    'comfort', 'love', 'faith', 'strength', 'wisdom', 'forgiveness', 'hope'
]);

/**
 * 判断一条历史记录是否属于圣经应用。
 * 保守策略：只有在能明确确认是经文记录时才返回 true，
 * 拿不准的一律留在旧 key（宁可少迁，也不误删心语卡牌的数据）。
 * @param {Object} item - 历史记录
 * @returns {boolean}
 */
export function isVerseRecord(item) {
    if (!item || typeof item !== 'object') return false;
    const card = item.card;
    if (!card || typeof card !== 'object') return false;
    // 明确的经文特征：有出处且有原文
    const hasVerseFields = typeof card.reference === 'string' && card.reference
        && typeof card.text === 'string' && card.text;
    if (hasVerseFields) return true;
    // 主题属于 7 个经文主题，且不是心语卡牌的关系类类别
    return typeof card.category === 'string' && VERSE_CATEGORIES.has(card.category);
}

/**
 * 从 localStorage 安全读取并解析 JSON
 * @param {string} key
 * @returns {*} 解析结果，失败返回 null
 */
function readJSON(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

/**
 * 执行一次性迁移。幂等：迁移过就跳过。
 * @returns {{migrated:boolean, movedHistory:number, keptLegacyHistory:number}}
 */
export function migrateLegacyStorage() {
    const result = { migrated: false, movedHistory: 0, keptLegacyHistory: 0 };

    try {
        if (localStorage.getItem(STORAGE_KEYS.migrationFlag) === '1') {
            return result;
        }

        // ---- 历史记录：按记录特征分流 ----
        const legacyHistory = readJSON(LEGACY_KEYS.history);
        if (Array.isArray(legacyHistory) && legacyHistory.length) {
            const verseRecords = legacyHistory.filter(isVerseRecord);
            const otherRecords = legacyHistory.filter((item) => !isVerseRecord(item));

            if (verseRecords.length) {
                // 合并进新 key（若已有新数据则并集，按 id 去重）
                const existing = readJSON(STORAGE_KEYS.history);
                const merged = Array.isArray(existing) ? existing.slice() : [];
                const seen = new Set(merged.map((it) => it && it.id));
                verseRecords.forEach((it) => {
                    if (it && !seen.has(it.id)) {
                        // 旧数据没有来源字段，按「抽取金句」处理
                        merged.push(it.source ? it : { ...it, source: 'draw' });
                        seen.add(it.id);
                    }
                });
                merged.sort((a, b) => (b.id || 0) - (a.id || 0));
                localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(merged));
                result.movedHistory = verseRecords.length;
            }

            // 旧 key 只保留不属于圣经的记录；空了就删掉，还给心语卡牌
            if (otherRecords.length) {
                localStorage.setItem(LEGACY_KEYS.history, JSON.stringify(otherRecords));
                result.keptLegacyHistory = otherRecords.length;
            } else {
                localStorage.removeItem(LEGACY_KEYS.history);
            }
        }

        // ---- 主题：继承旧值，但**不删旧 key** ----
        // 背景：heartTalkTheme 这个 key 心语卡牌自己还在用（heart-talk/src/main.js）。
        // 两个应用同源，删了它会把心语卡牌的主题设置一并抹掉。
        // 所以这里只「复制一份」过来，旧 key 留给心语卡牌。
        if (!localStorage.getItem(STORAGE_KEYS.theme)) {
            const legacyTheme = localStorage.getItem(LEGACY_KEYS.theme);
            if (legacyTheme) {
                localStorage.setItem(STORAGE_KEYS.theme, legacyTheme);
            }
        }

        // ---- 打卡 / 每日卡牌：整体搬运，然后删旧 key ----
        // 这两个 key 心语卡牌完全不用，可以安全清掉。
        [
            [LEGACY_KEYS.checkIn, STORAGE_KEYS.checkIn],
            [LEGACY_KEYS.dailyCard, STORAGE_KEYS.dailyCard]
        ].forEach(([oldKey, newKey]) => {
            const value = localStorage.getItem(oldKey);
            if (value !== null) {
                if (!localStorage.getItem(newKey)) {
                    localStorage.setItem(newKey, value);
                }
                localStorage.removeItem(oldKey);
            }
        });

        localStorage.setItem(STORAGE_KEYS.migrationFlag, '1');
        result.migrated = true;
    } catch (error) {
        // 迁移失败不能阻塞应用启动；下次启动会再试
        console.warn('存储迁移未完成:', error);
    }

    return result;
}
