/**
 * 统计计算模块
 * 提供灵修记录的数据分析和报告生成功能
 */

import { categories } from '../data/cards.js';

// 主题名称/配色（以 cards.js 的 categories 为唯一真源）
const CATEGORY_NAMES = {};
const CATEGORY_COLORS = {};
categories.forEach((c) => {
    CATEGORY_NAMES[c.id] = c.name;
    CATEGORY_COLORS[c.id] = c.color;
});

/**
 * 解析历史记录时间戳为 Date 对象
 * @param {string} timestamp - 本地时间字符串 (zh-CN 格式)
 * @returns {Date}
 */
function parseTimestamp(timestamp) {
    return new Date(String(timestamp).replace(/\//g, '-'));
}

/**
 * 获取日期字符串 (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
function getDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * 计算基础统计数据
 * @param {Array} history - 历史记录数组
 * @returns {Object}
 */
export function calculateBasicStats(history) {
    if (!history || history.length === 0) {
        return {
            totalCount: 0,
            todayCount: 0,
            weekCount: 0,
            monthCount: 0
        };
    }

    const now = new Date();
    const today = getDateString(now);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    history.forEach(item => {
        const itemDate = parseTimestamp(item.timestamp);
        const itemDateStr = getDateString(itemDate);

        if (itemDateStr === today) {
            todayCount++;
        }
        if (itemDate >= weekAgo) {
            weekCount++;
        }
        if (itemDate >= monthAgo) {
            monthCount++;
        }
    });

    return {
        totalCount: history.length,
        todayCount,
        weekCount,
        monthCount
    };
}

/**
 * 计算主题分布
 * @param {Array} history - 历史记录数组
 * @returns {Array} - 饼图数据格式 [{name, value, color}]
 */
export function calculateCategoryDistribution(history) {
    if (!history || history.length === 0) {
        return [];
    }

    const counts = {};
    history.forEach(item => {
        const cat = item.card?.category || 'unknown';
        counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts).map(([category, count]) => ({
        name: CATEGORY_NAMES[category] || category,
        value: count,
        color: CATEGORY_COLORS[category] || '#999',
        category
    })).sort((a, b) => b.value - a.value);
}

/**
 * 计算来源分布（抽卡 / 每日 / 手记）
 * @param {Array} history - 历史记录数组
 * @returns {Array} - 饼图数据格式 [{name, value, color}]
 */
export function calculateSourceDistribution(history) {
    if (!history || history.length === 0) {
        return [];
    }

    const SOURCE_NAMES = { draw: '抽取金句', daily: '今日经文', note: '手记' };
    const SOURCE_COLORS = { draw: '#4A90E2', daily: '#E67E22', note: '#1ABC9C' };

    const counts = {};
    history.forEach(item => {
        const src = item.source || 'draw';
        counts[src] = (counts[src] || 0) + 1;
    });

    return Object.entries(counts).map(([source, count]) => ({
        name: SOURCE_NAMES[source] || source,
        value: count,
        color: SOURCE_COLORS[source] || '#999',
        source
    })).sort((a, b) => b.value - a.value);
}

/**
 * 计算每日活跃度（最近 N 天）
 * @param {Array} history - 历史记录数组
 * @param {number} days - 天数
 * @returns {Array}
 */
export function calculateDailyActivity(history, days = 7) {
    if (!history || history.length === 0) {
        return [];
    }

    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = getDateString(date);
        const dayName = i === 0 ? '今天' : i === 1 ? '昨天' : `${date.getMonth() + 1}/${date.getDate()}`;

        const count = history.filter(item => {
            const itemDate = getDateString(parseTimestamp(item.timestamp));
            return itemDate === dateStr;
        }).length;

        result.push({
            date: dateStr,
            dayName,
            count,
            isToday: i === 0
        });
    }

    return result;
}

/**
 * 生成报告洞察文字
 * @param {Array} history - 历史记录数组
 * @param {Object} stats - 统计数据
 * @returns {Array<string>}
 */
export function generateInsights(history, stats) {
    if (!history || history.length === 0) {
        return ['开始记录经文，生成你的专属灵修报告吧！'];
    }

    const insights = [];
    const catDist = calculateCategoryDistribution(history);

    // 基础统计洞察
    if (stats.totalCount < 10) {
        insights.push(`你已记录 ${stats.totalCount} 条灵修笔记，继续加油！`);
    } else if (stats.totalCount < 50) {
        insights.push(`很棒！你已积累 ${stats.totalCount} 条灵修笔记，渐入佳境。`);
    } else {
        insights.push(`你已记录 ${stats.totalCount} 条灵修笔记，这是很可贵的坚持。`);
    }

    // 主题洞察
    if (catDist.length > 0) {
        const topCat = catDist[0];
        const percentage = Math.round((topCat.value / stats.totalCount) * 100);
        insights.push(`你在「${topCat.name}」主题的经文上最常受触动，占比 ${percentage}%。`);
    }

    // 活跃度洞察
    if (stats.weekCount >= 5) {
        insights.push('本周灵修很稳定，愿神的话继续滋养你。');
    } else if (stats.todayCount > 0) {
        insights.push('今天也有新的领受，感谢神的恩典。');
    }

    return insights;
}

/**
 * 生成完整报告数据
 * @param {Array} history - 历史记录数组
 * @param {number} streakDays - 连续打卡天数
 * @returns {Object}
 */
export function generateFullReport(history, streakDays = 0) {
    const basicStats = calculateBasicStats(history);
    const categoryDist = calculateCategoryDistribution(history);
    const sourceDist = calculateSourceDistribution(history);
    const dailyActivity = calculateDailyActivity(history, 7);
    const insights = generateInsights(history, basicStats);

    return {
        stats: {
            ...basicStats,
            streakDays
        },
        categoryDistribution: categoryDist,
        sourceDistribution: sourceDist,
        dailyActivity,
        insights,
        generatedAt: new Date().toLocaleString('zh-CN')
    };
}

export { CATEGORY_NAMES, CATEGORY_COLORS };
