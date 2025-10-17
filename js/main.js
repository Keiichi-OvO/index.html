// 数字幽灵 - 主逻辑文件

// === 路径修复 - 添加到 main.js 最开头 ===
(function() {
    // 自动修复所有链接的路径
    document.addEventListener('DOMContentLoaded', function() {
        // 修复所有链接
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
                link.href = '/' + href;
            }
        });
        
        // 修复所有按钮跳转（覆盖默认行为）
        const originalSubmit = document.getElementById('submitPassword');
        if (originalSubmit) {
            originalSubmit.onclick = function(e) {
                e.preventDefault();
                const password = document.getElementById('passwordInput').value;
                if (password === '180523') {
                    window.location.href = '/blog.html';
                } else {
                    alert('密码错误！');
                }
            };
        }
    });
})();
// === 路径修复结束 ===

// 下面是原有的 main.js 代码...
const GameState = {
    // ... 原有代码不变
};
// 全局状态管理
const GameState = {
    currentPage: 'index',
    unlockedPages: ['index'],
    discoveredClues: [],
    ghostMode: false,
    mirrorMode: false,
    lastAccess: new Date(),
    ghostMessagesReceived: [],
    timeMessageShown: false,
    consoleMessageShown: false,
    
};
    // 保存游戏状态到本地存储
    save() {
        const saveData = {
            unlockedPages: this.unlockedPages,
            discoveredClues: this.discoveredClues,
            ghostMode: this.ghostMode,
            mirrorMode: this.mirrorMode,
            lastAccess: this.lastAccess.toISOString()
        };
        localStorage.setItem('digitalGhost_save', JSON.stringify(saveData));
    },
    
    // 从本地存储加载游戏状态
    load() {
        const saved = localStorage.getItem('digitalGhost_save');
        if (saved) {
            const data = JSON.parse(saved);
            this.unlockedPages = data.unlockedPages || ['index'];
            this.discoveredClues = data.discoveredClues || [];
            this.ghostMode = data.ghostMode || false;
            this.mirrorMode = data.mirrorMode || false;
            this.lastAccess = new Date(data.lastAccess) || new Date();
        }
    },
    
    // 解锁新页面
    unlockPage(pageName) {
        if (!this.unlockedPages.includes(pageName)) {
            this.unlockedPages.push(pageName);
            this.save();
            console.log(`新页面已解锁: ${pageName}`);
        }
    },
    
    // 添加发现的线索
    addClue(clueName) {
        if (!this.discoveredClues.includes(clueName)) {
            this.discoveredClues.push(clueName);
            this.save();
            console.log(`新线索发现: ${clueName}`);
        }
    }
};

// 工具函数
const Utils = {
    // 显示通知
    showNotification(message, type = 'info', duration = 3000) {
        // 移除现有通知
        const existingNotification = document.getElementById('global-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建新通知
        const notification = document.createElement('div');
        notification.id = 'global-notification';
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            z-index: 10000;
            font-family: inherit;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // 设置背景颜色
        const colors = {
            info: 'var(--accent-color)',
            warning: 'var(--warning-color)',
            success: 'var(--success-color)',
            error: 'var(--warning-color)'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // 自动隐藏
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    },
    
    // 格式化日期
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
    },
    
    // 随机故障效果
    triggerGlitch(element, duration = 1000) {
        if (!element) return;
        
        element.classList.add('glitch-simple');
        setTimeout(() => {
            element.classList.remove('glitch-simple');
        }, duration);
    },
    
    // 加密/解密简单文本
    simpleEncrypt(text, key = 'digitalghost') {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return btoa(result);
    },
    
    simpleDecrypt(encryptedText, key = 'digitalghost') {
        try {
            const text = atob(encryptedText);
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                result += String.fromCharCode(charCode);
            }
            return result;
        } catch {
            return '[解密失败]';
        }
    },
    
    // 检查是否为凌晨3点
    isWitchingHour() {
        const now = new Date();
        return now.getHours() === 3 && now.getMinutes() === 0;
    },
    
    // 延迟执行
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// 初始化函数
function initGame() {
    // 加载游戏状态
    GameState.load();
    
    // 设置全局事件监听
    setupGlobalListeners();
    
    // 检查特殊时间
    checkSpecialTimings();
    
    // 初始化页面特定功能
    initPageSpecific();
    
    console.log('数字幽灵游戏初始化完成');
    console.log('已解锁页面:', GameState.unlockedPages);
    console.log('已发现线索:', GameState.discoveredClues);
}

// 全局事件监听
function setupGlobalListeners() {
    // 镜子模式激活
    let mirrorInput = '';
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.altKey) return;
        
        mirrorInput += e.key.toLowerCase();
        if (mirrorInput.includes('mirror')) {
            activateMirrorMode();
            mirrorInput = '';
        }
        
        // 限制输入长度
        if (mirrorInput.length > 10) {
            mirrorInput = mirrorInput.substring(1);
        }
    });
    
    // 凌晨3点检查
    setInterval(checkSpecialTimings, 60000);
    
    // 页面卸载前保存
    window.addEventListener('beforeunload', () => {
        GameState.save();
    });
}

// 检查特殊时间触发
function checkSpecialTimings() {
    if (Utils.isWitchingHour() && !GameState.ghostMode) {
        activateGhostMode();
    }
}

// 页面特定初始化
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initEmailSystem();
            break;
        case 'blog.html':
            initBlogSystem();
            break;
        case 'ai-chat.html':
            initAIChat();
            break;
        case 'puzzle.html':
            initPuzzle();
            break;
        case 'content.html':
            initContentPage();
            break;
    }
}

// 镜子模式激活
function activateMirrorMode() {
    if (GameState.mirrorMode) return;
    
    GameState.mirrorMode = true;
    GameState.save();
    
    Utils.showNotification('镜子模式已激活！', 'info', 5000);
    
    // 视觉特效
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 3000);
    
    // 触发全局故障效果
    const elements = document.querySelectorAll('h1, h2, h3');
    elements.forEach(el => Utils.triggerGlitch(el, 2000));
}

// 幽灵模式激活（凌晨3点自动触发）
function activateGhostMode() {
    GameState.ghostMode = true;
    GameState.save();
    
    Utils.showNotification('数字幽灵信号增强中...', 'warning', 10000);
    
    // 更强烈的视觉特效
    document.body.classList.add('glitch-simple');
    
    // 随机元素故障
    const allElements = document.querySelectorAll('*');
    const randomElements = Array.from(allElements)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
    
    randomElements.forEach(el => {
        setTimeout(() => Utils.triggerGlitch(el, 1500), Math.random() * 3000);
    });
    
    // 10秒后恢复
    setTimeout(() => {
        document.body.classList.remove('glitch-simple');
        GameState.ghostMode = false;
        GameState.save();
    }, 10000);
}

// 导出到全局作用域
window.GameState = GameState;
window.Utils = Utils;
window.initGame = initGame;
window.activateMirrorMode = activateMirrorMode;
window.activateGhostMode = activateGhostMode;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
    // ... 原有代码 ...
    
    // === 新增：李浩的跨次元信息系统 ===
    setTimeout(() => {
        if (typeof GhostMessages !== 'undefined') {
            GhostMessages.init();
            console.log('跨次元信息系统启动');
        }
    }, 5000);
}