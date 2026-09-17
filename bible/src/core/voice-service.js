/**
 * 语音服务 - 提供语音合成(TTS)和语音识别(ASR)功能
 * 使用 Web Speech API
 */

/**
 * 检查浏览器是否支持语音识别
 * @returns {boolean} 是否支持
 */
export function isSpeechRecognitionSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * 检查浏览器是否支持语音合成
 * @returns {boolean} 是否支持
 */
export function isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window;
}

/**
 * 创建语音合成器
 * @returns {Object|null} 语音合成器对象，不支持时返回 null
 */
export function createSpeechSynthesizer() {
    if (!isSpeechSynthesisSupported()) {
        return null;
    }

    let voices = [];
    let isVoicesLoaded = false;

    const loadVoices = () => {
        voices = speechSynthesis.getVoices();
        isVoicesLoaded = true;
    };

    // Chrome 需要通过 voiceschanged 事件加载语音
    if ('onvoiceschanged' in speechSynthesis) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();

    return {
        /**
         * 朗读文本
         * @param {string} text - 要朗读的文本
         * @param {Object} options - 配置选项
         * @param {Function} options.onStart - 开始朗读回调
         * @param {Function} options.onEnd - 朗读结束回调
         * @param {Function} options.onError - 错误回调
         * @param {number} options.rate - 语速 (0.1 - 2.0)
         * @param {number} options.pitch - 音调 (0 - 2)
         * @returns {SpeechSynthesisUtterance|null} 朗读实例
         */
        speak(text, options = {}) {
            const {
                onStart,
                onEnd,
                onError,
                rate = 0.9,
                pitch = 1.0
            } = options;

            // 每次重新创建 utterance（解决 Chrome 中文朗读 bug）
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            utterance.pitch = pitch;

            // 查找中文语音
            if (isVoicesLoaded && voices.length > 0) {
                const chineseVoice = voices.find(v =>
                    v.lang === 'zh-CN' || v.lang.startsWith('zh-')
                );
                if (chineseVoice) {
                    utterance.voice = chineseVoice;
                }
            }

            // 事件处理
            if (onStart) {
                utterance.onstart = onStart;
            }
            if (onEnd) {
                utterance.onend = onEnd;
            }
            if (onError) {
                utterance.onerror = (event) => {
                    onError(event.error, event);
                };
            }

            speechSynthesis.speak(utterance);
            return utterance;
        },

        /**
         * 停止朗读
         */
        cancel() {
            speechSynthesis.cancel();
        },

        /**
         * 暂停朗读
         */
        pause() {
            speechSynthesis.pause();
        },

        /**
         * 恢复朗读
         */
        resume() {
            speechSynthesis.resume();
        },

        /**
         * 是否正在朗读
         * @returns {boolean}
         */
        isSpeaking() {
            return speechSynthesis.speaking;
        },

        /**
         * 是否已暂停
         * @returns {boolean}
         */
        isPaused() {
            return speechSynthesis.paused;
        }
    };
}

/**
 * 创建语音识别器
 * @returns {Object|null} 语音识别器对象，不支持时返回 null
 */
export function createSpeechRecognizer() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let isActive = false;

    return {
        /**
         * 获取底层 Recognition 对象（用于直接事件绑定）
         * @returns {SpeechRecognition}
         */
        get native() {
            return recognition;
        },

        /**
         * 是否正在识别
         * @returns {boolean}
         */
        get isActive() {
            return isActive;
        },

        /**
         * 开始识别
         * @param {Object} options - 配置选项
         * @param {Function} options.onResult - 识别结果回调 (transcript, isFinal)
         * @param {Function} options.onError - 错误回调 (error, message)
         * @param {Function} options.onStart - 开始识别回调
         * @param {Function} options.onEnd - 识别结束回调
         */
        start(options = {}) {
            const {
                onResult,
                onError,
                onStart,
                onEnd
            } = options;

            // 重置事件处理器
            recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (onResult) {
                    onResult(finalTranscript, interimTranscript, event.results);
                }
            };

            recognition.onerror = (event) => {
                let message = '语音识别出错';
                switch (event.error) {
                    case 'not-allowed':
                        message = '请允许麦克风权限';
                        break;
                    case 'audio-capture':
                        message = '无法访问麦克风';
                        break;
                    case 'no-speech':
                        message = '未检测到语音，请重试';
                        break;
                    case 'network':
                        message = '网络连接问题，请检查网络';
                        break;
                    case 'aborted':
                        message = '识别已取消';
                        break;
                    case 'language-not-supported':
                        message = '不支持该语言';
                        break;
                    default:
                        message = `识别错误: ${event.error}`;
                }

                if (onError) {
                    onError(event.error, message, event);
                }
            };

            recognition.onstart = () => {
                isActive = true;
                if (onStart) {
                    onStart();
                }
            };

            recognition.onend = () => {
                isActive = false;
                if (onEnd) {
                    onEnd();
                }
            };

            try {
                recognition.start();
            } catch (error) {
                if (onError) {
                    onError('start-failed', '启动识别失败，请重试');
                }
            }
        },

        /**
         * 停止识别
         */
        stop() {
            isActive = false;
            try {
                recognition.stop();
            } catch (error) {
                // 忽略停止时的错误
            }
        },

        /**
         * 中止识别
         */
        abort() {
            isActive = false;
            try {
                recognition.abort();
            } catch (error) {
                // 忽略中止时的错误
            }
        }
    };
}

/**
 * 请求麦克风权限
 * @returns {Promise<boolean>} 是否获得权限
 */
export async function requestMicrophonePermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // 立即停止所有轨道，我们只是检查权限
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 获取语音功能支持状态
 * @returns {Object} 支持状态对象
 */
export function getVoiceSupportStatus() {
    return {
        tts: isSpeechSynthesisSupported(),
        asr: isSpeechRecognitionSupported(),
        ttsChinese: isSpeechSynthesisSupported(), // TTS 中文支持通常可用
        asrChinese: isSpeechRecognitionSupported() // ASR 中文支持取决于浏览器
    };
}
