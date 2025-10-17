// 搜索系统

const SearchSystem = {
    // 搜索索引
    searchIndex: {
        '鬼魂': {
            type: 'special',
            content: '数字幽灵现象检测记录...',
            action: 'revealGhostInfo'
        },
        '救我出来': {
            type: 'special', 
            content: '检测到求救信号...',
            action: 'revealSOSSignal'
        },
        '回声': {
            type: 'normal',
            results: ['回声计划技术文档', '回声系统检测日志']
        },
        '守望者': {
            type: 'restricted',
            content: '访问受限...',
            action: 'showWarning'
        },
        '镜子': {
            type: 'special',
            content: '镜子协议相关信息...',
            action: 'revealMirrorProtocol'
        },
        '李浩': {
            type: 'normal',
            results: ['李浩的个人简介', '李浩的技术笔记']
        }
    },
    
    // 执行搜索
    search(query, context = 'blog') {
        const normalizedQuery = query.trim().toLowerCase();
        
        if (!normalizedQuery) {
            this.clearSearch();
            return;
        }
        
        // 特殊搜索词处理
        if (this.searchIndex[normalizedQuery]) {
            const item = this.searchIndex[normalizedQuery];
            this.handleSpecialSearch(normalizedQuery, item, context);
            return;
        }
        
        // 普通搜索
        this.handleNormalSearch(normalizedQuery, context);
    },
    
    // 处理特殊搜索
    handleSpecialSearch(query, item, context) {
        switch(item.type) {
            case 'special':
                if (item.action && typeof window[item.action] === 'function') {
                    window[item.action]();
                }
                Utils.showNotification(`特殊搜索: ${query}`, 'info');
                GameState.addClue(`搜索: ${query}`);
                break;
                
            case 'restricted':
                Utils.showNotification('警告: 该搜索词访问受限', 'warning');
                this.triggerSecurityAlert(query);
                break;
        }
    },
    
    // 处理普通搜索
    handleNormalSearch(query, context) {
        const results = [];
        
        // 在实际应用中，这里会搜索真实的内容
        // 现在只是模拟搜索
        for (const [keyword, data] of Object.entries(this.searchIndex)) {
            if (keyword.includes(query) && data.type === 'normal') {
                results.push(...(data.results || []));
            }
        }
        
        this.displaySearchResults(results, query, context);
    },
    
    // 显示搜索结果
    displaySearchResults(results, query, context) {
        const resultsContainer = document.getElementById('searchResults');
        const originalContent = document.getElementById('blogPosts');
        
        if (!resultsContainer || !originalContent) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `<p>没有找到关于 "${query}" 的结果</p>`;
        } else {
            resultsContainer.innerHTML = results.map(result => 
                `<div class="search-result-item">${result}</div>`
            ).join('');
        }
        
        resultsContainer.style.display = 'block';
        originalContent.style.display = 'none';
    },
    
    // 清除搜索
    clearSearch() {
        const resultsContainer = document.getElementById('searchResults');
        const originalContent = document.getElementById('blogPosts');
        
        if (resultsContainer && originalContent) {
            resultsContainer.style.display = 'none';
            originalContent.style.display = 'block';
        }
    },
    
    // 触发安全警报
    triggerSecurityAlert(query) {
        console.warn(`安全警报: 尝试搜索受限词汇 "${query}"`);
        
        // 触发故障效果
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            Utils.triggerGlitch(searchInput);
            searchInput.value = '';
        }
    },
    
    // 初始化搜索框
    initSearchInput(inputId, context = 'blog') {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        let searchTimeout;
        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.search(input.value, context);
            }, 500);
        });
        
        // 回车键搜索
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.search(input.value, context);
            }
        });
    }
};

// 特殊搜索动作函数
function revealGhostInfo() {
    Utils.showNotification('数字幽灵信号解码中...', 'info');
    
    // 显示幽灵相关信息
    const content = `
        <div class="special-search-result">
            <h3>数字幽灵检测记录</h3>
            <p>在凌晨3点检测到异常网络信号...</p>
            <p>信号模式: 重复二进制序列</p>
            <p>内容: 疑似加密求救信息</p>
        </div>
    `;
    
    displaySpecialContent(content);
}

function revealSOSSignal() {
    Utils.showNotification('求救信号解码完成！', 'warning');
    
    const content = `
        <div class="special-search-result">
            <h3>紧急求救信号</h3>
            <p>信号内容: "我在镜子后面...回声是钥匙...救我出来..."</p>
            <p>来源: 未知</p>
            <p>建议: 尝试激活镜子协议</p>
        </div>
    `;
    
    displaySpecialContent(content);
}

function revealMirrorProtocol() {
    Utils.showNotification('镜子协议信息解锁', 'info');
    
    const content = `
        <div class="special-search-result">
            <h3>镜子协议</h3>
            <p>激活条件:</p>
            <ul>
                <li>系统时间: 03:00:00</li>
                <li>键盘输入: "mirror"</li>
                <li>控制台命令: activateGhostMode()</li>
            </ul>
        </div>
    `;
    
    displaySpecialContent(content);
}

function displaySpecialContent(content) {
    const resultsContainer = document.getElementById('searchResults');
    const originalContent = document.getElementById('blogPosts');
    
    if (resultsContainer && originalContent) {
        resultsContainer.innerHTML = content;
        resultsContainer.style.display = 'block';
        originalContent.style.display = 'none';
    }
}

// 博客系统初始化
function initBlogSystem() {
    SearchSystem.initSearchInput('searchInput', 'blog');
}

// 导出到全局作用域
window.SearchSystem = SearchSystem;
window.initBlogSystem = initBlogSystem;