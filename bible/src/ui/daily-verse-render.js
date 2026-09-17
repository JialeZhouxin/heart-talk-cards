/**
 * 今日经文 UI 渲染
 *
 * 卡片显示经文原文 + 出处，并提供「写下感受」「换一句」。
 * 同时显示连续打卡天数与最近 7 天日历（沿用打卡数据）。
 */

const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

/**
 * 判断今天是否已写下感受
 * @param {Array} history
 * @param {Object} verse
 * @returns {boolean}
 */
function hasAnsweredToday(history, verse) {
    if (!verse) return false;
    const today = new Date();
    const todayStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    return history.some((item) => {
        if (!item || !item.card || item.source !== 'daily') return false;
        const stamp = String(item.timestamp || '').replace(/-/g, '/');
        return item.card.reference === verse.reference && stamp.startsWith(todayStr);
    });
}

/**
 * 渲染迷你日历（最近 N 天，标记已记录的日子）
 * @param {Array} history
 * @param {number} days
 * @returns {string}
 */
function renderMiniCalendar(history, days = 7) {
    const stamps = new Set(
        history.map((item) => {
            const d = new Date(String(item.timestamp || '').replace(/\//g, '-'));
            if (Number.isNaN(d.getTime())) return null;
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }).filter(Boolean)
    );

    let html = '';
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        const done = stamps.has(key);
        const isToday = i === 0;
        const cls = ['calendar-day', done ? 'completed' : '', isToday ? 'today' : ''].filter(Boolean).join(' ');
        html += `
            <div class="${cls}" title="${key}">
                <span class="day-label">${WEEKDAY_NAMES[d.getDay()]}</span>
                <span class="day-dot"></span>
            </div>
        `;
    }
    return html;
}

/**
 * 转义 HTML
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * 渲染今日经文区域
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器
 * @param {Object} params.verse - 今日经文
 * @param {Array} params.history - 灵修记录
 * @param {number} params.streak - 连续打卡天数
 * @param {Function} params.onAnswer - 点「写下感受」
 * @param {Function} params.onNext - 点「换一句」
 */
export function renderTodayVerse({ container, verse, history = [], streak = 0, onAnswer, onNext }) {
    if (!container) return;

    if (!verse) {
        container.innerHTML = `
            <div class="daily-card-section">
                <div class="daily-card-empty"><p>暂时取不到今日经文</p></div>
            </div>
        `;
        return;
    }

    const answered = hasAnsweredToday(history, verse);

    container.innerHTML = `
        <div class="daily-card-section">
            <div class="daily-card-header">
                <div class="daily-card-title">
                    <span class="daily-icon">📖</span>
                    <span>今日经文</span>
                    ${streak > 0 ? `<span class="daily-streak">🔥 ${streak} 天</span>` : ''}
                </div>
                <div class="daily-calendar-mini">
                    ${renderMiniCalendar(history)}
                </div>
            </div>
            <div class="daily-card-content">
                <div class="daily-card-display ${answered ? 'answered' : ''}">
                    <div class="daily-card-badge">今日经文</div>
                    <div class="daily-verse-body">${escapeHtml(verse.text)}</div>
                    <div class="daily-verse-ref">—— ${escapeHtml(verse.reference)}</div>
                    ${answered ? `
                        <div class="daily-card-status answered">
                            <span>✓ 今天已写下感受</span>
                        </div>
                    ` : `
                        <div class="daily-card-actions">
                            <button class="btn" data-action="answer">✍️ 写下感受</button>
                            <button class="btn btn-secondary" data-action="next">🔄 换一句</button>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll('[data-action]').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.dataset.action === 'answer' && onAnswer) onAnswer();
            if (btn.dataset.action === 'next' && onNext) onNext();
        });
    });
}
