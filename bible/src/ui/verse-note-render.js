/**
 * 「记一节经文」界面
 *
 * 两条找经文的路径：
 * - 按卷 / 章 / 节三级选择
 * - 关键词搜索（可限定书卷范围）
 *
 * 选中后回填经文原文，交给上层打开「写下感受」。
 */

import {
    loadFullBible, getChapters, getVersesInChapter, getVerse,
    searchVerses, groupByBook, isFullBibleLoaded
} from '../core/verse-search-service.js';
import { BOOK_NAMES } from '../data/book-names.js';

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
 * 填充下拉选项
 * @param {HTMLSelectElement} select
 * @param {Array<string|number>} values
 * @param {string} placeholder
 */
function fillOptions(select, values, placeholder) {
    select.replaceChildren();
    const first = document.createElement('option');
    first.value = '';
    first.textContent = placeholder;
    select.appendChild(first);

    values.forEach((value) => {
        const opt = document.createElement('option');
        opt.value = String(value);
        opt.textContent = String(value);
        select.appendChild(opt);
    });
}

/**
 * 渲染「记一节经文」界面
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器
 * @param {Function} params.onPick - 选中经文回调，收到 {book, chapter, verse, text}
 */
export function renderVerseNote({ container, onPick }) {
    if (!container) return;

    container.innerHTML = `
        <div class="verse-note-modal-content">
            <div class="verse-note-status" id="verseNoteStatus"></div>

            <div class="verse-note-tabs" role="tablist">
                <button class="verse-note-tab active" data-tab="browse" role="tab">按卷查找</button>
                <button class="verse-note-tab" data-tab="search" role="tab">关键词搜索</button>
            </div>

            <div class="verse-note-pane" data-pane="browse">
                <div class="verse-note-fields">
                    <label>卷
                        <select id="vnBook"></select>
                    </label>
                    <label>章
                        <select id="vnChapter"></select>
                    </label>
                    <label>节
                        <select id="vnVerse"></select>
                    </label>
                </div>
                <div class="verse-note-preview" id="vnPreview"></div>
            </div>

            <div class="verse-note-pane" data-pane="search" style="display: none;">
                <div class="verse-note-search-row">
                    <input type="search" id="vnKeyword" placeholder="输入经文中的词句，如「凡事都可行」" autocomplete="off">
                    <select id="vnScope" title="限定书卷范围"></select>
                    <button class="btn" id="vnSearchBtn">搜索</button>
                </div>
                <div class="verse-note-results" id="vnResults"></div>
            </div>
        </div>
    `;

    const statusEl = container.querySelector('#verseNoteStatus');
    const bookSel = container.querySelector('#vnBook');
    const chapterSel = container.querySelector('#vnChapter');
    const verseSel = container.querySelector('#vnVerse');
    const previewEl = container.querySelector('#vnPreview');
    const keywordEl = container.querySelector('#vnKeyword');
    const scopeSel = container.querySelector('#vnScope');
    const resultsEl = container.querySelector('#vnResults');

    /**
     * 确保全本已加载（失败则给出降级提示）
     * @returns {Promise<boolean>}
     */
    async function ensureLoaded() {
        if (isFullBibleLoaded()) {
            statusEl.style.display = 'none';
            return true;
        }
        statusEl.textContent = '正在加载经文库…';
        statusEl.style.display = 'block';
        try {
            await loadFullBible();
            statusEl.style.display = 'none';
            return true;
        } catch (error) {
            console.error('经文库加载失败:', error);
            statusEl.textContent = '经文库加载失败，请检查网络后重试。';
            statusEl.style.display = 'block';
            return false;
        }
    }

    // ---- 按卷查找的联动 ----
    bookSel.addEventListener('change', async () => {
        const book = bookSel.value;
        if (!book) {
            fillOptions(chapterSel, [], '章');
            fillOptions(verseSel, [], '节');
            previewEl.textContent = '';
            return;
        }
        const chapters = await getChapters(book);
        fillOptions(chapterSel, Array.from({ length: chapters }, (_, i) => i + 1), '章');
        fillOptions(verseSel, [], '节');
        previewEl.textContent = '';
    });

    chapterSel.addEventListener('change', async () => {
        const book = bookSel.value;
        const chapter = Number(chapterSel.value);
        if (!book || !chapter) {
            fillOptions(verseSel, [], '节');
            previewEl.textContent = '';
            return;
        }
        const count = await getVersesInChapter(book, chapter);
        fillOptions(verseSel, Array.from({ length: count }, (_, i) => i + 1), '节');
        previewEl.textContent = '';
    });

    verseSel.addEventListener('change', async () => {
        const book = bookSel.value;
        const chapter = Number(chapterSel.value);
        const verse = Number(verseSel.value);
        if (!book || !chapter || !verse) {
            previewEl.textContent = '';
            return;
        }
        const text = await getVerse(book, chapter, verse);
        if (!text) {
            previewEl.textContent = '找不到这一节';
            return;
        }
        const ref = `${book} ${chapter}:${verse}`;
        previewEl.innerHTML = `
            <div class="vn-text">${escapeHtml(text)}</div>
            <div class="vn-ref">—— ${escapeHtml(ref)}</div>
            <button class="btn" id="vnPickBrowse">✍️ 记下这节，写下感受</button>
        `;
        previewEl.querySelector('#vnPickBrowse').addEventListener('click', () => {
            onPick({ book, chapter, verse, text, reference: ref });
        });
    });

    // ---- 关键词搜索 ----
    function renderResults(items, truncated) {
        if (!items.length) {
            resultsEl.innerHTML = '<div class="verse-note-empty">没有找到匹配的经文，换个词试试</div>';
            return;
        }

        const groups = groupByBook(items);
        let html = truncated
            ? `<div class="verse-note-hint">结果较多，只显示前 ${items.length} 条。可用书卷范围收窄，或换更具体的词。</div>`
            : `<div class="verse-note-hint">共 ${items.length} 条</div>`;

        groups.forEach((group) => {
            html += `<div class="vn-group"><div class="vn-group-title">${escapeHtml(group.book)} (${group.count})</div>`;
            group.verses.forEach((v) => {
                const ref = `${v.book} ${v.chapter}:${v.verse}`;
                html += `
                    <button class="vn-result" data-book="${escapeHtml(v.book)}" data-chapter="${v.chapter}" data-verse="${v.verse}">
                        <span class="vn-result-ref">${escapeHtml(ref)}</span>
                        <span class="vn-result-text">${escapeHtml(v.text)}</span>
                    </button>
                `;
            });
            html += '</div>';
        });

        resultsEl.innerHTML = html;
        resultsEl.querySelectorAll('.vn-result').forEach((btn) => {
            btn.addEventListener('click', async () => {
                const book = btn.dataset.book;
                const chapter = Number(btn.dataset.chapter);
                const verse = Number(btn.dataset.verse);
                const text = await getVerse(book, chapter, verse);
                if (!text) return;
                onPick({ book, chapter, verse, text, reference: `${book} ${chapter}:${verse}` });
            });
        });
    }

    async function doSearch() {
        const keyword = keywordEl.value.trim();
        if (!keyword) {
            resultsEl.innerHTML = '<div class="verse-note-empty">请输入要搜索的词句</div>';
            return;
        }
        const ok = await ensureLoaded();
        if (!ok) {
            resultsEl.innerHTML = '<div class="verse-note-empty">经文库不可用</div>';
            return;
        }
        resultsEl.innerHTML = '<div class="verse-note-empty">搜索中…</div>';
        try {
            const { items, truncated } = await searchVerses(keyword, { book: scopeSel.value || null });
            renderResults(items, truncated);
        } catch (error) {
            console.error('搜索失败:', error);
            resultsEl.innerHTML = '<div class="verse-note-empty">搜索失败，请重试</div>';
        }
    }

    container.querySelector('#vnSearchBtn').addEventListener('click', doSearch);
    keywordEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            doSearch();
        }
    });

    /**
     * 先同步填上静态卷名（0.5KB，不用等全本），再在后台加载经文正文。
     * 否则弱网下卷名下拉会空十几秒。
     */
    function populateBookSelects(books) {
        if (!bookSel.options.length) {
            fillOptions(bookSel, books, '选择卷');
        }
        if (!scopeSel.options.length) {
            const all = document.createElement('option');
            all.value = '';
            all.textContent = '全部书卷';
            scopeSel.appendChild(all);
            books.forEach((b) => {
                const opt = document.createElement('option');
                opt.value = b;
                opt.textContent = b;
                scopeSel.appendChild(opt);
            });
        }
    }

    // ---- 标签切换 ----
    container.querySelectorAll('.verse-note-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.verse-note-tab').forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            container.querySelectorAll('.verse-note-pane').forEach((pane) => {
                pane.style.display = pane.dataset.pane === tab.dataset.tab ? '' : 'none';
            });
            ensureLoaded();
        });
    });

    // 打开即可用：卷名静态渲染（不用等全本），经文正文在后台加载
    populateBookSelects(BOOK_NAMES);
    ensureLoaded();
}
