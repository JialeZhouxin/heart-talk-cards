const HISTORY_KEY = 'heartTalkHistory';

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
