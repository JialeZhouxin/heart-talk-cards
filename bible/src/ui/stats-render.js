/**
 * 统计渲染模块
 * 负责渲染统计图表和报告界面
 */

import {
    generateFullReport, calculateBasicStats, calculateCategoryDistribution, calculateDailyActivity
} from '../core/stats.js';
import { getStreakDays, getRecentCheckInStatus } from '../core/check-in.js';

/**
 * 渲染统计概览卡片
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.history - 历史记录
 */
export function renderStatsOverview({ container, history }) {
    const stats = calculateBasicStats(history);
    const streakDays = getStreakDays();
    const catDist = calculateCategoryDistribution(history);
    const topCategory = catDist.length > 0 ? catDist[0].name : '-';

    container.innerHTML = `
        <div class="stats-overview">
            <div class="stat-card stat-card-primary">
                <div class="stat-value">${stats.totalCount}</div>
                <div class="stat-label">总回答数</div>
            </div>
            <div class="stat-card stat-card-streak">
                <div class="stat-value">${streakDays}</div>
                <div class="stat-label">连续打卡</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.weekCount}</div>
                <div class="stat-label">本周回答</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.todayCount}</div>
                <div class="stat-label">今日回答</div>
            </div>
        </div>
        <div class="stats-top-category">
            <span class="stats-top-label">最活跃类别：</span>
            <span class="stats-top-value">${topCategory}</span>
        </div>
    `;
}

/**
 * 渲染 SVG 饼图
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.data - 饼图数据 [{name, value, color}]
 */
export function renderPieChart({ container, data, title = '分布' }) {
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="chart-empty">暂无数据</div>';
        return;
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const size = 200;
    const center = size / 2;
    const radius = 80;
    let currentAngle = -Math.PI / 2; // 从顶部开始

    let svgPaths = '';
    let legendItems = '';

    data.forEach(item => {
        const percentage = item.value / total;
        const angle = percentage * 2 * Math.PI;
        const endAngle = currentAngle + angle;

        // 计算路径
        const x1 = center + radius * Math.cos(currentAngle);
        const y1 = center + radius * Math.sin(currentAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        const largeArcFlag = angle > Math.PI ? 1 : 0;

        const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');

        svgPaths += `<path d="${pathData}" fill="${item.color}" stroke="#fff" stroke-width="2" />`;

        // 图例
        const percentText = Math.round(percentage * 100);
        legendItems += `
            <div class="chart-legend-item">
                <span class="chart-legend-color" style="background-color: ${item.color}"></span>
                <span class="chart-legend-name">${item.name}</span>
                <span class="chart-legend-value">${item.value} (${percentText}%)</span>
            </div>
        `;

        currentAngle = endAngle;
    });

    // 中心文字显示总数
    const centerText = `
        <text x="${center}" y="${center - 5}" text-anchor="middle" class="chart-center-label">总计</text>
        <text x="${center}" y="${center + 20}" text-anchor="middle" class="chart-center-value">${total}</text>
    `;

    container.innerHTML = `
        <div class="chart-container">
            <div class="chart-title">${title}</div>
            <div class="chart-content">
                <svg viewBox="0 0 ${size} ${size}" class="pie-chart">
                    ${svgPaths}
                    ${centerText}
                </svg>
                <div class="chart-legend">
                    ${legendItems}
                </div>
            </div>
        </div>
    `;
}

/**
 * 渲染 SVG 柱状图
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.data - 柱状图数据 [{name, value}]
 * @param {string} params.title - 图表标题
 */
export function renderBarChart({ container, data, title }) {
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="chart-empty">暂无数据</div>';
        return;
    }

    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartHeight = 150;
    const barWidth = 40;
    const gap = 30;
    const totalWidth = data.length * (barWidth + gap) + gap;

    let bars = '';
    let labels = '';

    data.forEach((item, index) => {
        const x = gap + index * (barWidth + gap);
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = chartHeight - barHeight;

        bars += `
            <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
                  class="bar-chart-rect" rx="4" />
            <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" class="bar-chart-value">${item.value}</text>
        `;

        labels += `
            <text x="${x + barWidth / 2}" y="${chartHeight + 20}" text-anchor="middle" class="bar-chart-label">${item.name}</text>
        `;
    });

    container.innerHTML = `
        <div class="chart-container">
            <div class="chart-title">${title}</div>
            <svg viewBox="0 0 ${totalWidth} ${chartHeight + 40}" class="bar-chart">
                ${bars}
                ${labels}
            </svg>
        </div>
    `;
}

/**
 * 渲染活跃度热力图（最近7天）
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.history - 历史记录
 */
export async function renderActivityHeatmap({ container, history }) {
    const activity = calculateDailyActivity(history, 7);

    const maxCount = Math.max(...activity.map(d => d.count), 1);

    let daysHtml = '';
    activity.forEach(day => {
        const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 4);
        const intensityClass = `heatmap-day-intensity-${intensity}`;
        daysHtml += `
            <div class="heatmap-day ${intensityClass} ${day.isToday ? 'heatmap-day-today' : ''}">
                <div class="heatmap-day-count">${day.count > 0 ? day.count : ''}</div>
                <div class="heatmap-day-name">${day.dayName}</div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="heatmap-container">
            <div class="chart-title">最近7天活跃度</div>
            <div class="heatmap-days">
                ${daysHtml}
            </div>
            <div class="heatmap-legend">
                <span>少</span>
                <div class="heatmap-legend-box intensity-1"></div>
                <div class="heatmap-legend-box intensity-2"></div>
                <div class="heatmap-legend-box intensity-3"></div>
                <div class="heatmap-legend-box intensity-4"></div>
                <span>多</span>
            </div>
        </div>
    `;
}

/**
 * 渲染打卡日历
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 */
export function renderCheckInCalendar({ container }) {
    const checkInStatus = getRecentCheckInStatus(7);

    let daysHtml = '';
    checkInStatus.forEach(day => {
        daysHtml += `
            <div class="calendar-day ${day.checked ? 'calendar-day-checked' : ''} ${day.isToday ? 'calendar-day-today' : ''}">
                <div class="calendar-day-dot"></div>
                <div class="calendar-day-name">${day.dayName}</div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="calendar-container">
            <div class="chart-title">打卡记录</div>
            <div class="calendar-days">
                ${daysHtml}
            </div>
        </div>
    `;
}

/**
 * 渲染洞察列表
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.insights - 洞察文字数组
 */
export function renderInsights({ container, insights }) {
    if (!insights || insights.length === 0) {
        container.innerHTML = '';
        return;
    }

    const itemsHtml = insights.map(insight => `
        <li class="insight-item">
            <span class="insight-bullet">💡</span>
            <span class="insight-text">${insight}</span>
        </li>
    `).join('');

    container.innerHTML = `
        <div class="insights-container">
            <div class="chart-title">智能洞察</div>
            <ul class="insights-list">
                ${itemsHtml}
            </ul>
        </div>
    `;
}

/**
 * 渲染完整统计报告
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.history - 历史记录
 * @param {Function} params.onExportImage - 导出图片回调
 */
export async function renderFullStatsReport({ container, history, onExportImage }) {
    const report = generateFullReport(history, getStreakDays());

    container.innerHTML = `
        <div class="stats-report" id="statsReportContent">
            <div class="stats-report-header">
                <div class="stats-report-title">灵修报告</div>
                <div class="stats-report-date">生成于 ${report.generatedAt}</div>
            </div>
            <div class="stats-report-body">
                <div class="stats-overview-section" id="statsOverviewSection"></div>
                <div class="stats-charts-section">
                    <div class="stats-chart-container" id="categoryChartContainer"></div>
                    <div class="stats-chart-container" id="sourceChartContainer"></div>
                </div>
                <div class="stats-activity-section" id="activitySection"></div>
                <div class="stats-calendar-section" id="calendarSection"></div>
                <div class="stats-insights-section" id="insightsSection"></div>
            </div>
        </div>
        <div class="stats-actions">
            <button class="btn" id="exportStatsImageBtn">导出报告图片</button>
        </div>
    `;

    // 渲染各个部分
    const overviewSection = container.querySelector('#statsOverviewSection');
    const categoryChartContainer = container.querySelector('#categoryChartContainer');
    const sourceChartContainer = container.querySelector('#sourceChartContainer');
    const activitySection = container.querySelector('#activitySection');
    const calendarSection = container.querySelector('#calendarSection');
    const insightsSection = container.querySelector('#insightsSection');

    renderStatsOverview({ container: overviewSection, history });
    renderPieChart({ container: categoryChartContainer, data: report.categoryDistribution, title: '主题分布' });
    renderPieChart({ container: sourceChartContainer, data: report.sourceDistribution, title: '记录来源' });

    // 动态导入避免循环依赖
    const activity = calculateDailyActivity(history, 7);
    const maxCount = Math.max(...activity.map(d => d.count), 1);

    let daysHtml = '';
    activity.forEach(day => {
        const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 4);
        const intensityClass = `heatmap-day-intensity-${intensity}`;
        daysHtml += `
            <div class="heatmap-day ${intensityClass} ${day.isToday ? 'heatmap-day-today' : ''}">
                <div class="heatmap-day-count">${day.count > 0 ? day.count : ''}</div>
                <div class="heatmap-day-name">${day.dayName}</div>
            </div>
        `;
    });

    activitySection.innerHTML = `
        <div class="heatmap-container">
            <div class="chart-title">最近7天活跃度</div>
            <div class="heatmap-days">
                ${daysHtml}
            </div>
            <div class="heatmap-legend">
                <span>少</span>
                <div class="heatmap-legend-box intensity-1"></div>
                <div class="heatmap-legend-box intensity-2"></div>
                <div class="heatmap-legend-box intensity-3"></div>
                <div class="heatmap-legend-box intensity-4"></div>
                <span>多</span>
            </div>
        </div>
    `;

    renderCheckInCalendar({ container: calendarSection });
    renderInsights({ container: insightsSection, insights: report.insights });

    // 绑定导出按钮
    const exportBtn = container.querySelector('#exportStatsImageBtn');
    if (exportBtn && onExportImage) {
        exportBtn.addEventListener('click', onExportImage);
    }
}
