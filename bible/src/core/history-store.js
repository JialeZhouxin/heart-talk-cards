import { STORAGE_KEYS } from './storage-migration.js';

const HISTORY_KEY = STORAGE_KEYS.history;

export function loadHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        return true;
    } catch {
        return false;
    }
}

export function clearHistoryStore() {
    try {
        localStorage.removeItem(HISTORY_KEY);
        return true;
    } catch {
        return false;
    }
}

export function updateHistoryItem(history, id, newAnswer) {
    try {
        const index = history.findIndex(item => item.id === id);
        if (index === -1) return null;
        
        const updatedItem = {
            ...history[index],
            answer: newAnswer,
            updatedAt: new Date().toLocaleString('zh-CN')
        };
        
        const newHistory = [...history];
        newHistory[index] = updatedItem;
        
        if (!saveHistory(newHistory)) {
            return null;
        }
        
        return newHistory;
    } catch {
        return null;
    }
}

export function deleteHistoryItem(history, id) {
    try {
        const newHistory = history.filter(item => item.id !== id);
        
        if (!saveHistory(newHistory)) {
            return null;
        }
        
        return newHistory;
    } catch {
        return null;
    }
}
