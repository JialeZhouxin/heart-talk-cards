/**
 * 灵修记录的筛选与导出
 */

const SOURCE_LABELS = {
    draw: '抽取金句',
    daily: '今日经文',
    note: '手记'
};

/**
 * 解析记录时间戳。
 * 历史时间戳是 zh-CN 的本地格式（如 2026/9/17 16:01:32），
 * 部分旧数据可能是 ISO 字符串，两种都要能解析。
 * @param {string} timestamp
 * @returns {Date}
 */
function parseTimestamp(timestamp) {
    const text = String(timestamp || '');
    // zh-CN 本地格式：斜杠分隔
    if (/^\d{4}\/\d{1,2}\/\d{1,2}/.test(text)) {
        const [datePart, timePart = ''] = text.split(' ');
        const [y, m, d] = datePart.split('/').map(Number);
        const [hh = 0, mm = 0, ss = 0] = timePart ? timePart.split(':').map(Number) : [];
        return new Date(y, m - 1, d, hh, mm, ss);
    }
    return new Date(text);
}

/**
 * 取当天零点
 * @returns {Date}
 */
function startOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * 按日期范围筛选
 * @param {Array} history
 * @param {string} dateFilter - 'all' | 'today' | 'week' | 'month' | 'year'
 * @returns {Array}
 */
export function filterByDate(history, dateFilter) {
    if (dateFilter === 'all' || !dateFilter) {
        return history;
    }

    const today = startOfToday();

    return history.filter(item => {
        const itemDate = parseTimestamp(item.timestamp);
        if (Number.isNaN(itemDate.getTime())) return true;

        switch (dateFilter) {
            case 'today':
                return itemDate >= today;
            case 'week': {
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                return itemDate >= weekAgo;
            }
            case 'month': {
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return itemDate >= monthAgo;
            }
            case 'year': {
                const yearAgo = new Date(today);
                yearAgo.setFullYear(yearAgo.getFullYear() - 1);
                return itemDate >= yearAgo;
            }
            default:
                return true;
        }
    });
}

/**
 * 按主题筛选
 * @param {Array} history
 * @param {string} categoryFilter - 'all' | 主题 id | 'note'
 * @returns {Array}
 */
export function filterByCategory(history, categoryFilter) {
    if (categoryFilter === 'all' || !categoryFilter) {
        return history;
    }
    return history.filter(item => (item.card || {}).category === categoryFilter);
}

/**
 * 按来源筛选
 * @param {Array} history
 * @param {string} sourceFilter - 'all' | 'draw' | 'daily' | 'note'
 * @returns {Array}
 */
export function filterBySource(history, sourceFilter) {
    if (sourceFilter === 'all' || !sourceFilter) {
        return history;
    }
    // 旧数据没有 source 字段，视为抽卡
    return history.filter(item => (item.source || 'draw') === sourceFilter);
}

/**
 * 组合筛选（日期 + 主题 + 来源）
 * @param {Array} history
 * @param {Object} filters - { date, category, source }
 * @returns {Array}
 */
export function filterHistory(history, filters = {}) {
    let result = [...history];

    if (filters.date && filters.date !== 'all') {
        result = filterByDate(result, filters.date);
    }

    if (filters.category && filters.category !== 'all') {
        result = filterByCategory(result, filters.category);
    }

    if (filters.source && filters.source !== 'all') {
        result = filterBySource(result, filters.source);
    }

    return result;
}

/**
 * 将灵修记录导出为 JSON
 * @param {Array} history
 * @returns {string}
 */
export function exportToJSON(history) {
    const exportData = {
        exportDate: new Date().toISOString(),
        totalCount: history.length,
        records: history.map((item) => ({
            ...item,
            sourceLabel: SOURCE_LABELS[item.source || 'draw'] || item.source
        }))
    };
    return JSON.stringify(exportData, null, 2);
}

/**
 * 下载 JSON 文件
 * @param {string} jsonString
 * @param {string} filename
 */
export function downloadJSON(jsonString, filename = '圣经金句灵修记录.json') {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * 生成统计信息
 * @param {Array} history
 * @returns {Object}
 */
export function generateHistoryStats(history) {
    const stats = {
        totalCount: history.length,
        byCategory: {},
        bySource: {},
        byDate: {}
    };

    history.forEach(item => {
        const card = item.card || {};

        const category = card.category || 'unknown';
        stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

        const source = item.source || 'draw';
        stats.bySource[source] = (stats.bySource[source] || 0) + 1;

        const date = parseTimestamp(item.timestamp);
        if (!Number.isNaN(date.getTime())) {
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            stats.byDate[monthKey] = (stats.byDate[monthKey] || 0) + 1;
        }
    });

    return stats;
}

export { SOURCE_LABELS, parseTimestamp };
