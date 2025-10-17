// 李浩的跨次元信息系统
const GhostMessages = {
    // 信息配置 - 更像是谜题提示而非直接指引
    messages: {
        afterPuzzle: {
            condition: () => GameState.unlockedPages.includes('content.html') && !GameState.mirrorMode,
            message: `系统日志 2018-05-30 02:45<br>
            <em>"镜子...不只是反射...是通道..."</em><br>
            <span class="log-note">// 回声系统捕捉到异常数据片段</span>`,
            glitch: true
        },
        
        firstSearch: {
            condition: () => GameState.discoveredClues.includes('搜索: 鬼魂') && !GameState.ghostMode,
            message: `数字幽灵现象记录<br>
            <em>"他们能听见我们...在信号中...在静默时..."</em><br>
            <span class="log-note">// 自动归档至"异常通信"分类</span>`,
            urgent: true
        },
        
        timeTrigger: {
            condition: () => {
                const now = new Date();
                return now.getHours() === 3 && now.getMinutes() <= 5 && !GameState.timeMessageShown;
            },
            message: `紧急系统警报 03:00:00<br>
            <em>"时间到了...钥匙在时间里..."</em><br>
            <span class="log-note">// 周期性信号峰值检测</span>`,
            autoClose: false
        },
        
        consoleDiscovery: {
            condition: () => GameState.consoleUsed && !GameState.consoleMessageShown,
            message: `开发者调试日志<br>
            <em>"底层协议...他们看不见的层面..."</em><br>
            <span class="log-note">// 权限等级: 系统核心</span>`,
            technical: true
        },
        
        mirrorHint: {
            condition: () => GameState.discoveredClues.length >= 4 && !GameState.mirrorMode,
            message: `加密通信片段 - 来源未知<br>
            <em>"说我的名字...在虚无中..."</em><br>
            <span class="log-note">// 信号强度: 微弱但稳定</span>`,
            mysterious: true
        }
    },

    // 显示神秘信息
    showMessage(messageConfig, triggerKey) {
        // 创建信息弹窗
        const messageHTML = `
            <div class="ghost-message-overlay">
                <div class="ghost-message-modal ${messageConfig.glitch ? 'glitch-border' : ''} ${messageConfig.urgent ? 'urgent-message' : ''}">
                    <div class="message-header">
                        <span class="message-type">${this.getMessageType(messageConfig)}</span>
                        <span class="message-time">${this.getCurrentTime()}</span>
                    </div>
                    
                    <div class="message-content">
                        ${messageConfig.message}
                    </div>
                    
                    <div class="message-footer">
                        <span class="signal-strength">信号: ${this.getRandomSignalStrength()}</span>
                        <button class="btn btn-ghost understand-btn">确认接收</button>
                    </div>
                    
                    ${messageConfig.glitch ? '<div class="glitch-effect"></div>' : ''}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', messageHTML);
        this.bindMessageEvents(triggerKey, messageConfig);
        
        // 记录状态
        GameState.ghostMessagesReceived = GameState.ghostMessagesReceived || [];
        GameState.ghostMessagesReceived.push(triggerKey);
        GameState.save();
        
        // 故障效果
        if (messageConfig.glitch) {
            this.triggerMessageGlitch();
        }
    },

    // 获取信息类型
    getMessageType(config) {
        if (config.urgent) return '🚨 紧急通信';
        if (config.technical) return '🔧 系统调试';
        if (config.mysterious) return '🌌 未知来源';
        return '📡 信号接收';
    },

    // 获取当前时间（伪造的系统时间）
    getCurrentTime() {
        const now = new Date();
        return now.toISOString().replace('T', ' ').substring(0, 19);
    },

    // 随机信号强度
    getRandomSignalStrength() {
        const strengths = ['微弱', '不稳定', '中等', '良好', '强烈'];
        return strengths[Math.floor(Math.random() * strengths.length)];
    },

    // 信息弹窗事件绑定
    bindMessageEvents(triggerKey, config) {
        const overlay = document.querySelector('.ghost-message-overlay');
        const understandBtn = overlay.querySelector('.understand-btn');

        const closeMessage = () => {
            overlay.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                overlay.remove();
                // 自动触发下一个相关提示
                this.triggerRelatedHint(triggerKey);
            }, 500);
        };

        understandBtn.addEventListener('click', closeMessage);

        // 紧急消息不能点击背景关闭
        if (!config.urgent && !config.autoClose) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeMessage();
            });
        }

        // 自动关闭的消息
        if (config.autoClose) {
            setTimeout(closeMessage, 8000);
        }
    },

    // 触发相关信息提示
    triggerRelatedHint(triggerKey) {
        const hints = {
            afterPuzzle: () => {
                setTimeout(() => {
                    if (!GameState.mirrorMode) {
                        this.showMessage({
                            message: `系统通知<br>
                            <em>"用户行为模式匹配：探索型"</em><br>
                            <span class="log-note">// 建议：扩大搜索参数范围</span>`,
                            technical: true
                        }, 'searchHint');
                    }
                }, 30000);
            },
            
            mirrorHint: () => {
                setTimeout(() => {
                    if (!GameState.mirrorMode) {
                        this.showMessage({
                            message: `语音识别日志<br>
                            <em>"关键词识别：反射/镜像/玻璃"</em><br>
                            <span class="log-note">// 关联协议：光学接口</span>`,
                            glitch: true
                        }, 'voiceHint');
                    }
                }, 45000);
            }
        };

        if (hints[triggerKey]) {
            hints[triggerKey]();
        }
    },

    // 信息故障效果
    triggerMessageGlitch() {
        const modal = document.querySelector('.ghost-message-modal');
        setTimeout(() => {
            modal.classList.add('glitch-simple');
            setTimeout(() => modal.classList.remove('glitch-simple'), 1000);
        }, 500);
    },

    // 初始化信息系统
    init() {
        console.log('李浩的跨次元信息系统启动');
        
        setInterval(() => {
            this.checkMessages();
        }, 15000);
        
        setTimeout(() => this.checkMessages(), 5000);
    },

    // 检查信息触发条件
    checkMessages() {
        for (const [messageKey, messageConfig] of Object.entries(this.messages)) {
            if (this.shouldShowMessage(messageKey, messageConfig)) {
                this.showMessage(messageConfig, messageKey);
            }
        }
    },

    // 判断是否显示信息
    shouldShowMessage(messageKey, config) {
        const shownMessages = GameState.ghostMessagesReceived || [];
        return config.condition() && !shownMessages.includes(messageKey);
    }
};