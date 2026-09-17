/**
 * 语音功能 UI 渲染模块
 * 提供朗读按钮和语音输入按钮的渲染
 */

/**
 * 创建朗读按钮
 * @param {Object} options - 配置选项
 * @param {Function} options.onClick - 点击回调
 * @param {boolean} options.isActive - 是否正在朗读
 * @param {boolean} options.disabled - 是否禁用
 * @returns {HTMLElement} 按钮元素
 */
export function createReadAloudButton(options = {}) {
    const { onClick, isActive = false, disabled = false } = options;

    const button = document.createElement('button');
    button.className = `voice-btn voice-read-btn ${isActive ? 'active' : ''}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', isActive ? '停止朗读' : '朗读问题');
    button.setAttribute('aria-pressed', String(isActive));
    button.setAttribute('title', isActive ? '点击停止朗读' : '点击朗读问题');
    button.disabled = disabled;

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = isActive ? '⏹️' : '🔊';
    button.appendChild(iconSpan);

    // 文本标签
    const labelSpan = document.createElement('span');
    labelSpan.className = 'voice-btn-label';
    labelSpan.textContent = isActive ? '停止' : '朗读';
    button.appendChild(labelSpan);

    // 键盘无障碍支持
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick();
        }
    });

    // 点击事件
    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}

/**
 * 创建语音输入按钮
 * @param {Object} options - 配置选项
 * @param {Function} options.onClick - 点击回调
 * @param {boolean} options.isActive - 是否正在录音
 * @param {boolean} options.disabled - 是否禁用
 * @param {string} options.size - 按钮大小 ('small' | 'normal')
 * @returns {HTMLElement} 按钮元素
 */
export function createVoiceInputButton(options = {}) {
    const { onClick, isActive = false, disabled = false, size = 'normal' } = options;

    const button = document.createElement('button');
    button.className = `voice-btn voice-input-btn ${isActive ? 'active' : ''} voice-btn-${size}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', isActive ? '停止语音输入' : '开始语音输入');
    button.setAttribute('aria-pressed', String(isActive));
    button.setAttribute('title', isActive ? '点击停止录音' : '点击开始语音输入');
    button.disabled = disabled;

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = isActive ? '⏹️' : '🎤';
    button.appendChild(iconSpan);

    // 只有 normal 大小显示文本标签
    if (size === 'normal') {
        const labelSpan = document.createElement('span');
        labelSpan.className = 'voice-btn-label';
        labelSpan.textContent = isActive ? '停止' : '语音输入';
        button.appendChild(labelSpan);
    }

    // 键盘无障碍支持
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick();
        }
    });

    // 点击事件
    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}

/**
 * 创建语音状态指示器
 * @param {Object} options - 配置选项
 * @param {string} options.status - 状态类型 ('idle' | 'listening' | 'processing' | 'error')
 * @param {string} options.message - 状态消息
 * @returns {HTMLElement} 状态指示器元素
 */
export function createVoiceStatusIndicator(options = {}) {
    const { status = 'idle', message = '' } = options;

    const indicator = document.createElement('div');
    indicator.className = `voice-status voice-status-${status}`;
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    indicator.setAttribute('aria-atomic', 'true');

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.className = 'voice-status-icon';
    iconSpan.setAttribute('aria-hidden', 'true');

    switch (status) {
        case 'listening':
            iconSpan.textContent = '🎙️';
            break;
        case 'processing':
            iconSpan.textContent = '⏳';
            break;
        case 'error':
            iconSpan.textContent = '⚠️';
            break;
        default:
            iconSpan.textContent = '';
    }

    if (iconSpan.textContent) {
        indicator.appendChild(iconSpan);
    }

    // 消息文本
    if (message) {
        const textSpan = document.createElement('span');
        textSpan.className = 'voice-status-text';
        textSpan.textContent = message;
        indicator.appendChild(textSpan);
    }

    return indicator;
}

/**
 * 更新语音按钮状态
 * @param {HTMLElement} button - 按钮元素
 * @param {Object} options - 配置选项
 * @param {boolean} options.isActive - 是否激活
 * @param {string} options.type - 按钮类型 ('read' | 'input')
 */
export function updateVoiceButtonState(button, options = {}) {
    const { isActive = false, type = 'read' } = options;

    if (!button) return;

    // 更新类名
    button.classList.toggle('active', isActive);

    // 更新 ARIA 属性
    button.setAttribute('aria-pressed', String(isActive));

    // 更新图标和标签
    const iconSpan = button.querySelector('span[aria-hidden="true"]');
    const labelSpan = button.querySelector('.voice-btn-label');

    if (iconSpan) {
        iconSpan.textContent = isActive ? '⏹️' : (type === 'read' ? '🔊' : '🎤');
    }

    if (labelSpan) {
        labelSpan.textContent = isActive ? '停止' : (type === 'read' ? '朗读' : '语音输入');
    }

    // 更新标题
    button.setAttribute('title', isActive
        ? (type === 'read' ? '点击停止朗读' : '点击停止录音')
        : (type === 'read' ? '点击朗读问题' : '点击开始语音输入')
    );

    button.setAttribute('aria-label', isActive
        ? (type === 'read' ? '停止朗读' : '停止语音输入')
        : (type === 'read' ? '朗读问题' : '开始语音输入')
    );
}

/**
 * 更新语音状态指示器
 * @param {HTMLElement} indicator - 指示器元素
 * @param {Object} options - 配置选项
 * @param {string} options.status - 状态类型
 * @param {string} options.message - 状态消息
 */
export function updateVoiceStatusIndicator(indicator, options = {}) {
    const { status = 'idle', message = '' } = options;

    if (!indicator) return;

    // 更新类名
    indicator.className = `voice-status voice-status-${status}`;

    // 清空内容
    indicator.replaceChildren();

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.className = 'voice-status-icon';
    iconSpan.setAttribute('aria-hidden', 'true');

    switch (status) {
        case 'listening':
            iconSpan.textContent = '🎙️';
            break;
        case 'processing':
            iconSpan.textContent = '⏳';
            break;
        case 'error':
            iconSpan.textContent = '⚠️';
            break;
        default:
            iconSpan.textContent = '';
    }

    if (iconSpan.textContent) {
        indicator.appendChild(iconSpan);
    }

    // 消息文本
    if (message) {
        const textSpan = document.createElement('span');
        textSpan.className = 'voice-status-text';
        textSpan.textContent = message;
        indicator.appendChild(textSpan);
    }
}

/**
 * 创建带语音输入的文本域包装器
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.textarea - 文本域元素
 * @param {Function} options.onVoiceInput - 语音输入回调
 * @param {boolean} options.isListening - 是否正在录音
 * @returns {HTMLElement} 包装器元素
 */
export function createTextareaWithVoiceInput(options = {}) {
    const { textarea, onVoiceInput, isListening = false } = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'textarea-with-voice';

    // 将文本域移入包装器
    if (textarea && textarea.parentNode) {
        textarea.parentNode.insertBefore(wrapper, textarea);
        wrapper.appendChild(textarea);
    }

    // 创建语音输入容器
    const voiceContainer = document.createElement('div');
    voiceContainer.className = 'voice-input-container';

    // 状态指示器
    const statusIndicator = createVoiceStatusIndicator({
        status: isListening ? 'listening' : 'idle',
        message: isListening ? '正在聆听...' : ''
    });
    statusIndicator.id = `${textarea?.id || 'textarea'}-voice-status`;
    voiceContainer.appendChild(statusIndicator);

    // 语音输入按钮
    const voiceButton = createVoiceInputButton({
        onClick: onVoiceInput,
        isActive: isListening,
        size: 'small'
    });
    voiceButton.id = `${textarea?.id || 'textarea'}-voice-btn`;
    voiceContainer.appendChild(voiceButton);

    wrapper.appendChild(voiceContainer);

    return wrapper;
}

/**
 * 渲染卡牌区域的语音控制按钮
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.container - 容器元素
 * @param {Function} options.onReadAloud - 朗读回调
 * @param {boolean} options.isReading - 是否正在朗读
 * @param {boolean} options.disabled - 是否禁用
 */
export function renderCardVoiceControls(options = {}) {
    const { container, onReadAloud, isReading = false, disabled = false } = options;

    if (!container) return;

    container.replaceChildren();

    const button = createReadAloudButton({
        onClick: onReadAloud,
        isActive: isReading,
        disabled
    });
    button.id = 'cardReadAloudBtn';

    container.appendChild(button);
}

/**
 * 渲染模态框的语音输入控制
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.container - 容器元素
 * @param {Function} options.onVoiceInput - 语音输入回调
 * @param {boolean} options.isListening - 是否正在录音
 * @param {string} options.status - 状态消息
 */
export function renderModalVoiceControls(options = {}) {
    const { container, onVoiceInput, isListening = false, status = '' } = options;

    if (!container) return;

    container.replaceChildren();

    // 状态指示器
    const statusIndicator = createVoiceStatusIndicator({
        status: isListening ? 'listening' : (status ? 'processing' : 'idle'),
        message: status
    });

    // 语音输入按钮
    const voiceButton = createVoiceInputButton({
        onClick: onVoiceInput,
        isActive: isListening,
        size: 'small'
    });

    container.appendChild(statusIndicator);
    container.appendChild(voiceButton);
}
