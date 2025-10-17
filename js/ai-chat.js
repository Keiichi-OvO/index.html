// AI聊天系统

const AIChatSystem = {
    // AI回应配置
    responses: {
        '回声计划': {
            response: '回声计划是李浩开发的网络监控检测系统。它能够识别隐蔽的监控行为并发出警报。',
            details: '[文字描述：系统架构图 - 显示数据采集层、分析引擎、警报系统三个主要组件]'
        },
        '守望者': {
            response: '检测到敏感词汇。建议谨慎讨论此话题。',
            details: '[文字描述：警告图标 - 红色三角形感叹号，下方文字"访问受限"]',
            restricted: true
        },
        '李浩': {
            response: '李浩是我的开发者。他于2018年5月失踪，最后一次活跃记录在CTF比赛后。',
            details: '[文字描述：个人档案照片 - 年轻男性，黑色眼镜，背景是代码编辑器]'
        },
        '数字幽灵': {
            response: '数字幽灵是指在网络中出现的无法解释的异常信号。我记录了多次此类事件。',
            details: '[文字描述：信号波形图 - 显示规律的异常峰值，时间标记为凌晨3点]'
        },
        '镜子': {
            response: '镜子...镜子模式...无法访问该数据。权限被锁定。',
            details: '[文字描述：加密文件图标 - 显示"mirror_access_denied"错误信息]',
            glitch: true
        },
        '救我': {
            response: '检测到求救信号。正在分析来源...来源无法追踪。信号重复中：救我出来',
            details: '[文字描述：信号源追踪图 - 显示多个跳转节点，最终指向未知位置]',
            urgent: true
        },
        '你好': {
            response: '你好，我是回声AI。我是李浩开发的对话系统，用于分析网络监控数据。',
            details: ''
        },
        '帮助': {
            response: '我可以帮助你了解：回声计划、数字幽灵现象、李浩的相关信息。请提出你的问题。',
            details: ''
        }
    },
    
    // 对话历史
    conversationHistory: [],
    
    // 发送消息
    async sendMessage(message) {
        // 添加到对话历史
        this.conversationHistory.push({
            type: 'user',
            content: message,
            timestamp: new Date()
        });
        
        // 显示用户消息
        this.displayMessage(message, 'user');
        
        // 显示AI正在输入
        this.showTypingIndicator();
        
        // 模拟AI思考时间
        await Utils.delay(1500);
        
        // 隐藏输入指示器
        this.hideTypingIndicator();
        
        // 生成AI回复
        const aiResponse = this.generateResponse(message);
        
        // 添加AI回复到历史
        this.conversationHistory.push({
            type: 'ai',
            content: aiResponse.response,
            details: aiResponse.details,
            timestamp: new Date()
        });
        
        // 显示AI回复
        this.displayMessage(aiResponse.response, 'ai');
        
        if (aiResponse.details) {
            await Utils.delay(800);
            this.displayMessage(aiResponse.details, 'ai');
        }
        
        // 特殊效果处理
        this.handleSpecialEffects(message, aiResponse);
    },
    
    // 生成AI回复
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // 查找匹配的回复
        for (const [keyword, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                return response;
            }
        }
        
        // 默认回复
        return {
            response: '我正在学习理解你的问题。请尝试询问关于网络监控、数字幽灵或李浩的话题。',
            details: ''
        };
    },
    
    // 显示消息
    displayMessage(content, type) {
        const chatContainer = document.getElementById('chatContainer');
        if (!chatContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = content;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // 添加淡入效果
        messageDiv.classList.add('fade-in');
    },
    
    // 显示输入指示器
    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
            const chatContainer = document.getElementById('chatContainer');
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    },
    
    // 隐藏输入指示器
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    },
    
    // 处理特殊效果
    handleSpecialEffects(message, response) {
        const lowerMessage = message.toLowerCase();
        
        // 镜子相关触发故障效果
        if (response.glitch || lowerMessage.includes('镜子') || lowerMessage.includes('mirror')) {
            setTimeout(() => {
                this.displayMessage('警告：系统异常！检测到未授权访问镜子协议！', 'ai');
                Utils.triggerGlitch(document.querySelector('.header'));
            }, 1000);
        }
        
        // 幽灵相关触发特殊效果
        if (lowerMessage.includes('鬼魂') || lowerMessage.includes('幽灵')) {
            setTimeout(() => {
                this.displayMessage('[文字描述：监控画面 - 显示空无一人的办公室，但键盘在自动输入]', 'ai');
            }, 1000);
        }
        
        // 紧急求救触发警报
        if (response.urgent) {
            Utils.showNotification('检测到紧急求救信号！', 'warning', 5000);
        }
        
        // 受限内容触发安全警报
        if (response.restricted) {
            setTimeout(() => {
                this.displayMessage('[文字描述：安全警报日志 - 显示多次访问尝试被阻止]', 'ai');
            }, 1500);
        }
    },
    
    // 初始化聊天界面
    init() {
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        
        if (!userInput || !sendButton) return;
        
        // 发送按钮点击事件
        sendButton.addEventListener('click', () => {
            const message = userInput.value.trim();
            if (message) {
                this.sendMessage(message);
                userInput.value = '';
            }
        });
        
        // 回车键发送
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = userInput.value.trim();
                if (message) {
                    this.sendMessage(message);
                    userInput.value = '';
                }
            }
        });
        
        // 清空对话历史
        const clearBtn = document.getElementById('clearChat');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearHistory();
            });
        }
    },
    
    // 清空对话历史
    clearHistory() {
        this.conversationHistory = [];
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) {
            // 保留系统消息
            const systemMessages = chatContainer.querySelectorAll('.message:not(.user-message):not(.ai-message)');
            chatContainer.innerHTML = '';
            systemMessages.forEach(msg => chatContainer.appendChild(msg));
        }
    }
};

// AI聊天初始化
function initAIChat() {
    AIChatSystem.init();
}

// 导出到全局作用域
window.AIChatSystem = AIChatSystem;
window.initAIChat = initAIChat;