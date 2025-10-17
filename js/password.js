// 密码系统

const PasswordSystem = {
    // 密码配置
    passwords: {
        '180523': { // CTF比赛日期
            target: 'blog.html',
            message: '密码正确！正在进入李浩的博客...',
            clue: 'CTF比赛日期'
        },
        'mirror': {
            target: '#mirror-mode',
            message: '镜子协议激活中...',
            clue: '隐藏协议'
        },
        '030000': {
            target: 'content.html?unlock=true',
            message: '时间密钥验证通过！',
            clue: '幽灵时间'
        }
    },
    
    // 验证密码
    validate(password, context = 'default') {
        const normalizedPassword = password.trim();
        
        if (this.passwords[normalizedPassword]) {
            const config = this.passwords[normalizedPassword];
            
            // 记录线索发现
            if (config.clue) {
                GameState.addClue(config.clue);
            }
            
            Utils.showNotification(config.message, 'success');
            
            // 处理跳转或特殊操作
            this.handlePasswordSuccess(normalizedPassword, config, context);
            return true;
        } else {
            Utils.showNotification('密码错误！请检查线索并重试。', 'error');
            this.handlePasswordFailure(normalizedPassword, context);
            return false;
        }
    },
    
    // 密码验证成功处理
    handlePasswordSuccess(password, config, context) {
        switch(context) {
            case 'email':
                // 邮件界面的密码验证
                setTimeout(() => {
                    if (config.target.startsWith('http') || config.target.startsWith('/')) {
                        window.location.href = config.target;
                    } else {
                        window.location.href = config.target;
                    }
                }, 2000);
                break;
                
            case 'blog':
                // 博客搜索的特殊密码
                if (password === 'mirror') {
                    activateMirrorMode();
                }
                break;
                
            default:
                // 默认处理
                if (config.target.startsWith('#')) {
                    // 页面内跳转
                    const targetElement = document.querySelector(config.target);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else if (config.target) {
                    // 页面跳转
                    setTimeout(() => {
                        window.location.href = config.target;
                    }, 1500);
                }
        }
    },
    
    // 密码验证失败处理
    handlePasswordFailure(password, context) {
        // 记录失败尝试（可用于触发安全机制）
        console.log(`密码尝试失败: ${password} (上下文: ${context})`);
        
        // 多次失败后给出提示
        const failCount = this.getFailCount();
        if (failCount >= 3) {
            setTimeout(() => {
                Utils.showNotification('提示：密码格式为YYMMDD（年年月月日日）', 'info', 5000);
            }, 1000);
        }
    },
    
    // 获取失败次数
    getFailCount() {
        let count = parseInt(sessionStorage.getItem('password_fail_count') || '0');
        count++;
        sessionStorage.setItem('password_fail_count', count.toString());
        return count;
    },
    
    // 重置失败计数
    resetFailCount() {
        sessionStorage.setItem('password_fail_count', '0');
    },
    
    // 初始化密码输入框
    initPasswordInput(inputId, buttonId, context = 'default') {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        
        if (!input || !button) return;
        
        button.addEventListener('click', () => {
            this.validate(input.value, context);
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.validate(input.value, context);
            }
        });
    }
};

// 邮件系统初始化
function initEmailSystem() {
    PasswordSystem.initPasswordInput('passwordInput', 'submitPassword', 'email');
    
    // 初始化线索点击
    const clueItems = document.querySelectorAll('.clue-item');
    clueItems.forEach(item => {
        item.addEventListener('click', function() {
            const clueType = this.getAttribute('data-clue');
            showClueModal(clueType);
        });
    });
}

// 线索模态框显示
function showClueModal(clueType) {
    // 这里可以实现在邮件界面中显示线索详情
    Utils.showNotification(`线索查看: ${clueType}`, 'info');
    GameState.addClue(clueType);
}

// 导出到全局作用域
window.PasswordSystem = PasswordSystem;
window.initEmailSystem = initEmailSystem;