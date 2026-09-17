function createElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

export function renderCard({ currentCard, categoryNames, elements }) {
    const {
        emptyState,
        cardContent,
        cardCategory,
        cardLevel,
        cardQuestion,
        saveBtn,
        shareBtn
    } = elements;

    if (!currentCard) {
        emptyState.style.display = 'block';
        cardContent.style.display = 'none';
        saveBtn.style.display = 'none';
        shareBtn.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    cardContent.style.display = 'block';
    cardCategory.textContent = categoryNames[currentCard.category] || currentCard.category;

    // 副标题显示经文出处
    cardLevel.textContent = currentCard.reference || '';
    cardLevel.className = 'card-level verse-reference-label';

    // 正文显示经文原文
    cardQuestion.innerHTML = `
        <div class="verse-text">${escapeHtml(currentCard.text)}</div>
        <div class="verse-reference">${escapeHtml(currentCard.reference)}</div>
    `;

    saveBtn.style.display = 'inline-block';
    shareBtn.style.display = 'inline-block';
}

/**
 * 转义 HTML，防止经文文本破坏标签结构
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

export function renderHistory({ history, categoryNames, historyList, onEdit, onDelete }) {
    historyList.replaceChildren();

    if (!history.length) {
        const empty = createElement('div', 'empty-state');
        empty.appendChild(createElement('p', '', '暂无灵修记录'));
        historyList.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    history.forEach((item) => {
        const wrapper = createElement('div', 'history-item');
        wrapper.dataset.id = item.id;

        // 头部信息：时间戳 + 操作按钮
        const header = createElement('div', 'history-item-header');
        header.appendChild(createElement('span', 'timestamp', item.timestamp));
        
        // 操作按钮组
        const actions = createElement('div', 'history-item-actions');
        
        const editBtn = createElement('button', 'history-action-btn edit-btn', '✏️');
        editBtn.title = '编辑';
        editBtn.dataset.action = 'edit';
        editBtn.dataset.id = item.id;
        
        const deleteBtn = createElement('button', 'history-action-btn delete-btn', '🗑️');
        deleteBtn.title = '删除';
        deleteBtn.dataset.action = 'delete';
        deleteBtn.dataset.id = item.id;
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        header.appendChild(actions);
        wrapper.appendChild(header);

        // 主题标签 + 来源 + 经文出处（容忍旧数据里缺失 card 的记录）
        const card = item.card || {};
        const SOURCE_LABELS = { draw: '抽卡', daily: '每日', note: '手记' };
        const source = item.source || 'draw';
        const tagsRow = createElement('div', 'history-item-tags');
        if (item.source || item.source === undefined) {
            const sourceTag = createElement('span', `source-tag source-${source}`, SOURCE_LABELS[source] || source);
            tagsRow.appendChild(sourceTag);
        }
        if (card.category && card.category !== 'note') {
            const categoryName = categoryNames[card.category] || card.category;
            const categoryTag = createElement('span', `category-tag category-${card.category}`, categoryName);
            tagsRow.appendChild(categoryTag);
        }

        if (tagsRow.childNodes.length) {
            wrapper.appendChild(tagsRow);
        }

        // 经文原文 + 我的感受
        if (card.text) {
            wrapper.appendChild(createElement('div', 'question verse-text', card.text));
            wrapper.appendChild(createElement('div', 'verse-reference', card.reference ? `—— ${card.reference}` : ''));
        } else if (card.reference) {
            wrapper.appendChild(createElement('div', 'verse-reference', `—— ${card.reference}`));
        }
        wrapper.appendChild(createElement('div', 'answer', item.answer));
        
        // 如果有更新时间，显示
        if (item.updatedAt) {
            wrapper.appendChild(createElement('div', 'updated-at', `编辑于 ${item.updatedAt}`));
        }

        // 绑定事件
        if (onEdit) {
            editBtn.addEventListener('click', () => onEdit(item));
        }
        if (onDelete) {
            deleteBtn.addEventListener('click', () => onDelete(item));
        }

        fragment.appendChild(wrapper);
    });

    historyList.appendChild(fragment);
}

/**
 * 渲染筛选控件
 * @param {Object} params - 参数对象
 * @param {HTMLElement} params.container - 容器元素
 * @param {Object} params.categoryNames - 主题名称映射
 * @param {Function} params.onFilterChange - 筛选变化回调
 */
export function renderHistoryFilters({ container, categoryNames, onFilterChange }) {
    container.replaceChildren();
    
    const wrapper = createElement('div', 'history-filters');
    
    // 日期筛选
    const dateFilterGroup = createElement('div', 'filter-group');
    dateFilterGroup.appendChild(createElement('label', '', '时间：'));
    
    const dateSelect = createElement('select', 'filter-select');
    dateSelect.dataset.filterType = 'date';
    const dateOptions = [
        { value: 'all', label: '全部时间' },
        { value: 'today', label: '今天' },
        { value: 'week', label: '最近7天' },
        { value: 'month', label: '最近30天' },
        { value: 'year', label: '最近一年' }
    ];
    dateOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        dateSelect.appendChild(option);
    });
    dateFilterGroup.appendChild(dateSelect);
    wrapper.appendChild(dateFilterGroup);
    
    // 主题筛选
    const categoryFilterGroup = createElement('div', 'filter-group');
    categoryFilterGroup.appendChild(createElement('label', '', '主题：'));
    
    const categorySelect = createElement('select', 'filter-select');
    categorySelect.dataset.filterType = 'category';
    const categoryOptions = [
        { value: 'all', label: '全部主题' },
        ...Object.entries(categoryNames).map(([key, name]) => ({ value: key, label: name })),
        { value: 'note', label: '手记' }
    ];
    categoryOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        categorySelect.appendChild(option);
    });
    categoryFilterGroup.appendChild(categorySelect);
    wrapper.appendChild(categoryFilterGroup);

    // 来源筛选
    const sourceFilterGroup = createElement('div', 'filter-group');
    sourceFilterGroup.appendChild(createElement('label', '', '来源：'));

    const sourceSelect = createElement('select', 'filter-select');
    sourceSelect.dataset.filterType = 'source';
    [
        { value: 'all', label: '全部来源' },
        { value: 'draw', label: '抽取金句' },
        { value: 'daily', label: '今日经文' },
        { value: 'note', label: '手记' }
    ].forEach((opt) => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        sourceSelect.appendChild(option);
    });
    sourceFilterGroup.appendChild(sourceSelect);
    wrapper.appendChild(sourceFilterGroup);
    
    // 绑定事件
    if (onFilterChange) {
        const emit = () => onFilterChange({
            date: dateSelect.value,
            category: categorySelect.value,
            source: sourceSelect.value
        });
        dateSelect.addEventListener('change', emit);
        categorySelect.addEventListener('change', emit);
        sourceSelect.addEventListener('change', emit);
    }
    
    container.appendChild(wrapper);
}

/**
 * 渲染导出控件
 * @param {Object} params - 参数对象
 * @param {HTMLElement} params.container - 容器元素
 * @param {Function} params.onExportJSON - 导出JSON回调
 * @param {Function} params.onExportImage - 导出图片回调
 * @param {Function} params.onExportAlbum - 导出纪念册回调
 * @param {Function} params.onShowStats - 显示统计回调
 * @param {Function} params.onShowReport - 显示报告回调
 */
export function renderExportControls({ container, onExportJSON, onExportImage, onExportAlbum, onShowStats, onShowReport }) {
    container.replaceChildren();
    
    const wrapper = createElement('div', 'export-controls');
    
    const exportBtn = createElement('button', 'btn btn-secondary export-btn', '📤 导出');
    exportBtn.title = '导出历史记录';
    
    const dropdown = createElement('div', 'export-dropdown');
    dropdown.style.display = 'none';
    
    const jsonOption = createElement('div', 'export-option', '📄 导出为 JSON');
    jsonOption.dataset.exportType = 'json';
    
    const imageOption = createElement('div', 'export-option', '🖼️ 导出为图片');
    imageOption.dataset.exportType = 'image';
    
    const albumOption = createElement('div', 'export-option', '📖 生成纪念册');
    albumOption.dataset.exportType = 'album';
    
    const statsOption = createElement('div', 'export-option', '📊 数据统计');
    statsOption.dataset.exportType = 'stats';
    
    const reportOption = createElement('div', 'export-option', '📋 我的报告');
    reportOption.dataset.exportType = 'report';
    
    dropdown.appendChild(jsonOption);
    dropdown.appendChild(imageOption);
    dropdown.appendChild(albumOption);
    dropdown.appendChild(statsOption);
    dropdown.appendChild(reportOption);
    
    wrapper.appendChild(exportBtn);
    wrapper.appendChild(dropdown);
    
    // 切换下拉菜单显示
    exportBtn.addEventListener('click', () => {
        const isVisible = dropdown.style.display !== 'none';
        dropdown.style.display = isVisible ? 'none' : 'block';
    });
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // 绑定导出事件
    if (onExportJSON) {
        jsonOption.addEventListener('click', () => {
            onExportJSON();
            dropdown.style.display = 'none';
        });
    }
    if (onExportImage) {
        imageOption.addEventListener('click', () => {
            onExportImage();
            dropdown.style.display = 'none';
        });
    }
    if (onExportAlbum) {
        albumOption.addEventListener('click', () => {
            onExportAlbum();
            dropdown.style.display = 'none';
        });
    }
    if (onShowStats) {
        statsOption.addEventListener('click', () => {
            onShowStats();
            dropdown.style.display = 'none';
        });
    }
    if (onShowReport) {
        reportOption.addEventListener('click', () => {
            onShowReport();
            dropdown.style.display = 'none';
        });
    }
    
    container.appendChild(wrapper);
}
