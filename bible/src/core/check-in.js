/**
 * 打卡记录模块
 * 管理用户连续打卡天数和打卡历史
 */

import { STORAGE_KEYS } from './storage-migration.js';

const CHECKIN_KEY = STORAGE_KEYS.checkIn;

/**
 * 获取日期字符串 (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
function getDateString(date) {
    return date.toISOString().split('T')[0];
}

/**
 * 加载打卡数据
 * @returns {Object} - { dates: string[], streak: number, lastDate: string|null }
 */
export function loadCheckInData() {
    try {
        const raw = localStorage.getItem(CHECKIN_KEY);
        if (!raw) {
            return { dates: [], streak: 0, lastDate: null };
        }
        const parsed = JSON.parse(raw);
        return {
            dates: Array.isArray(parsed.dates) ? parsed.dates : [],
            streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
            lastDate: parsed.lastDate || null
        };
    } catch {
        return { dates: [], streak: 0, lastDate: null };
    }
}

/**
 * 保存打卡数据
 * @param {Object} data
 * @returns {boolean}
 */
function saveCheckInData(data) {
    try {
        localStorage.setItem(CHECKIN_KEY, JSON.stringify(data));
        return true;
    } catch {
        return false;
    }
}

/**
 * 检查今天是否已打卡
 * @param {Object} checkInData
 * @returns {boolean}
 */
export function isTodayCheckedIn(checkInData) {
    if (!checkInData || !checkInData.lastDate) {
        return false;
    }
    const today = getDateString(new Date());
    return checkInData.lastDate === today;
}

/**
 * 计算两个日期之间的天数差
 * @param {string} dateStr1 - YYYY-MM-DD
 * @param {string} dateStr2 - YYYY-MM-DD
 * @returns {number}
 */
function daysBetween(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 执行打卡
 * 如果今天已打卡则返回当前数据，否则更新打卡记录
 * @returns {Object} - 更新后的打卡数据
 */
export function doCheckIn() {
    const data = loadCheckInData();
    const today = getDateString(new Date());

    // 今天已打卡，直接返回
    if (data.lastDate === today) {
        return data;
    }

    // 更新打卡日期列表
    if (!data.dates.includes(today)) {
        data.dates.push(today);
    }

    // 计算连续打卡天数
    if (!data.lastDate) {
        // 首次打卡
        data.streak = 1;
    } else {
        const daysDiff = daysBetween(data.lastDate, today);
        if (daysDiff === 1) {
            // 连续打卡
            data.streak += 1;
        } else if (daysDiff === 0) {
            // 同一天，不做任何操作
        } else {
            // 断签，重新计算
            data.streak = 1;
        }
    }

    data.lastDate = today;
    saveCheckInData(data);
    return data;
}

/**
 * 在保存回答时自动打卡
 * 这是主要的打卡入口，每次用户保存回答时调用
 * @returns {Object} - { isNewCheckIn: boolean, data: Object }
 */
export function checkInOnSave() {
    const data = loadCheckInData();
    const wasCheckedIn = isTodayCheckedIn(data);

    const newData = doCheckIn();

    return {
        isNewCheckIn: !wasCheckedIn,
        data: newData
    };
}

/**
 * 获取连续打卡天数
 * @returns {number}
 */
export function getStreakDays() {
    const data = loadCheckInData();
    return data.streak;
}

/**
 * 获取本月打卡天数
 * @returns {number}
 */
export function getMonthlyCheckInCount() {
    const data = loadCheckInData();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return data.dates.filter(dateStr => {
        const date = new Date(dateStr);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;
}

/**
 * 获取最近 N 天的打卡状态
 * @param {number} days
 * @returns {Array<{date: string, checked: boolean}>}
 */
export function getRecentCheckInStatus(days = 7) {
    const data = loadCheckInData();
    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = getDateString(date);

        result.push({
            date: dateStr,
            dayName: i === 0 ? '今天' : i === 1 ? '昨天' : `${date.getMonth() + 1}/${date.getDate()}`,
            checked: data.dates.includes(dateStr),
            isToday: i === 0
        });
    }

    return result;
}

/**
 * 清除所有打卡数据
 * @returns {boolean}
 */
export function clearCheckInData() {
    try {
        localStorage.removeItem(CHECKIN_KEY);
        return true;
    } catch {
        return false;
    }
}
