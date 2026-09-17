/**
 * 历史记录导出功能 - 图片和PDF纪念册
 */

import { generateHistoryStats } from './history-filter.js';

/**
 * 生成历史记录纪念册图片
 * @param {Array} history - 历史记录数组
 * @param {Object} categoryNames - 主题名称映射
 * @returns {Promise<string>} 图片DataURL
 */
export async function generateHistoryAlbumImage(history, categoryNames) {
    if (!history.length) {
        throw new Error('没有历史记录可导出');
    }

    // 创建临时容器
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 800px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 40px;
        font-family: 'Noto Serif SC', serif;
    `;

    // 生成统计信息
    const stats = generateHistoryStats(history);

    // 构建纪念册HTML
    let albumHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            min-height: 1000px;
        ">
            <!-- 封面 -->
            <div style="text-align: center; margin-bottom: 50px; padding-bottom: 40px; border-bottom: 3px solid #e8f5e9;">
                <div style="font-size: 60px; margin-bottom: 20px;">📖</div>
                <h1 style="
                    font-size: 42px;
                    color: #2e7d32;
                    margin: 0 0 15px 0;
                    font-weight: 700;
                ">心语卡牌纪念册</h1>
                <p style="
                    font-size: 18px;
                    color: #666;
                    margin: 0;
                ">记录每一次心灵的对话</p>
                <p style="
                    font-size: 14px;
                    color: #999;
                    margin-top: 15px;
                ">生成时间：${new Date().toLocaleString('zh-CN')}</p>
            </div>

            <!-- 统计概览 -->
            <div style="margin-bottom: 40px; padding: 25px; background: #f8f9fa; border-radius: 15px;">
                <h2 style="font-size: 24px; color: #333; margin: 0 0 20px 0;">📊 对话统计</h2>
                <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 36px; font-weight: bold; color: #2e7d32;">${stats.totalCount}</div>
                        <div style="font-size: 14px; color: #666;">总记录数</div>
                    </div>
                    ${Object.entries(stats.byCategory).map(([cat, count]) => `
                        <div style="text-align: center;">
                            <div style="font-size: 28px; font-weight: bold; color: #4caf50;">${count}</div>
                            <div style="font-size: 14px; color: #666;">${categoryNames[cat] || cat}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 历史记录列表 -->
            <div>
                <h2 style="font-size: 24px; color: #333; margin: 0 0 25px 0;">💭 灵修记录</h2>
    `;

    // 添加每条记录
    history.slice(0, 20).forEach((item, index) => {
        const card = item.card || {};
        const categoryName = categoryNames[card.category] || card.category || '';
        
        albumHTML += `
            <div style="
                margin-bottom: 25px;
                padding: 20px;
                background: #fafafa;
                border-radius: 12px;
                border-left: 4px solid #4caf50;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="
                        font-size: 12px;
                        color: #fff;
                        background: ${getCategoryColor(card.category)};
                        padding: 4px 12px;
                        border-radius: 20px;
                    ">${categoryName}</span>
                    <span style="font-size: 12px; color: #999;">${item.timestamp}</span>
                </div>
                <div style="
                    font-size: 16px;
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 10px;
                    line-height: 1.5;
                ">${escapeHtml(card.text || '')}</div>
                <div style="
                    font-size: 13px;
                    color: #8a7561;
                    margin-bottom: 10px;
                ">—— ${escapeHtml(card.reference || '')}</div>
                <div style="
                    font-size: 14px;
                    color: #555;
                    line-height: 1.6;
                    padding: 12px;
                    background: white;
                    border-radius: 8px;
                ">${escapeHtml(item.answer)}</div>
            </div>
        `;
    });

    if (history.length > 20) {
        albumHTML += `
            <div style="text-align: center; padding: 30px; color: #999; font-size: 14px;">
                ... 还有 ${history.length - 20} 条记录 ...
            </div>
        `;
    }

    albumHTML += `
            </div>
            
            <!-- 页脚 -->
            <div style="
                text-align: center;
                margin-top: 50px;
                padding-top: 30px;
                border-top: 2px solid #e8f5e9;
                color: #999;
                font-size: 14px;
            ">
                <p>记录神的话语，数算他的恩典</p>
                <p style="margin-top: 10px;">📖 圣经金句</p>
            </div>
        </div>
    `;

    container.innerHTML = albumHTML;
    document.body.appendChild(container);

    try {
        // 等待字体加载
        await document.fonts.ready;
        
        // 检测是否在 file:// 协议下运行
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
            throw new Error('请使用 HTTP 服务器访问以生成图片');
        }

        // 使用 html2canvas 生成图片
        const canvas = await html2canvas(container.firstElementChild, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false,
            width: 800,
            height: container.firstElementChild.scrollHeight
        });

        return canvas.toDataURL('image/png');
    } finally {
        document.body.removeChild(container);
    }
}

/**
 * 下载纪念册图片
 * @param {string} dataUrl - 图片DataURL
 */
export function downloadAlbumImage(dataUrl) {
    const link = document.createElement('a');
    link.download = `圣经金句灵修记录_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
}

/**
 * 生成并下载PDF纪念册
 * @param {Array} history - 历史记录数组
 * @param {Object} categoryNames - 类别名称映射
 * @param {Object} categoryNames - 主题名称映射
 */
export async function generatePDFAlbum(history, categoryNames) {
    // 由于PDF生成需要额外库，这里先提供图片导出
    // PDF功能可以通过引入 jspdf 或 html2pdf.js 实现
    const imageData = await generateHistoryAlbumImage(history, categoryNames);
    downloadAlbumImage(imageData);
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
 * 获取主题对应的颜色
 * @param {string} category - 主题代码
 * @returns {string} 颜色代码
 */
function getCategoryColor(category) {
    const colors = {
        comfort: '#4A90E2',
        love: '#E74C3C',
        faith: '#9B59B6',
        strength: '#F39C12',
        wisdom: '#1ABC9C',
        forgiveness: '#3498DB',
        hope: '#E67E22'
    };
    return colors[category] || '#4caf50';
}

/**
 * 批量导出多条记录为图片（分页）
 * @param {Array} history - 历史记录数组
 * @param {Object} categoryNames - 类别名称映射
 * @param {Object} categoryNames - 主题名称映射
 * @param {number} itemsPerPage - 每页记录数
 * @returns {Promise<string[]>} 图片DataURL数组
 */
export async function generatePagedAlbumImages(history, categoryNames, itemsPerPage = 10) {
    const images = [];
    const totalPages = Math.ceil(history.length / itemsPerPage);
    
    for (let i = 0; i < totalPages; i++) {
        const pageHistory = history.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
        const imageData = await generateHistoryAlbumImage(pageHistory, categoryNames);
        images.push(imageData);
    }
    
    return images;
}
