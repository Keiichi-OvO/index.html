// 拼图系统

const PuzzleSystem = {
    // 拼图配置
    fragments: [
        {
            id: '1',
            content: '[文字描述：技术文档封面 - "回声计划 v2.0 - 机密"]',
            correctPosition: 0
        },
        {
            id: '2', 
            content: '监控检测算法基于异常行为模式识别...',
            correctPosition: 1
        },
        {
            id: '3',
            content: '[文字描述：数据流程图 - 显示网络数据经过多层分析]',
            correctPosition: 2
        },
        {
            id: '4',
            content: '守望者系统的反制措施需要特殊权限...',
            correctPosition: 3
        },
        {
            id: '5',
            content: '[文字描述：系统日志截图 - 显示多次"数字幽灵"检测记录]',
            correctPosition: 4
        },
        {
            id: '6',
            content: '镜子协议：在特定条件下激活隐藏功能...',
            correctPosition: 5
        }
    ],
    
    // 当前拼图状态
    currentPieces: [],
    isCompleted: false,
    
    // 初始化拼图
    init() {
        this.setupDragAndDrop();
        this.setupEventListeners();
        this.updateProgress();
    },
    
    // 设置拖放功能
    setupDragAndDrop() {
        const fragments = document.querySelectorAll('.fragment');
        const workspace = document.getElementById('workspace');
        
        if (!fragments.length || !workspace) return;
        
        // 设置碎片可拖拽
        fragments.forEach(fragment => {
            fragment.setAttribute('draggable', 'true');
            fragment.addEventListener('dragstart', this.handleDragStart.bind(this));
        });
        
        // 工作区拖放事件
        workspace.addEventListener('dragover', this.handleDragOver);
        workspace.addEventListener('drop', this.handleDrop.bind(this));
        workspace.addEventListener('dragenter', this.handleDragEnter);
        workspace.addEventListener('dragleave', this.handleDragLeave);
    },
    
    // 设置事件监听器
    setupEventListeners() {
        const resetBtn = document.getElementById('resetBtn');
        const checkBtn = document.getElementById('checkBtn');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', this.resetPuzzle.bind(this));
        }
        
        if (checkBtn) {
            checkBtn.addEventListener('click', this.checkSolution.bind(this));
        }
    },
    
    // 拖拽开始
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
        e.target.classList.add('dragging');
    },
    
    // 拖拽经过
    handleDragOver(e) {
        e.preventDefault();
    },
    
    // 拖拽进入
    handleDragEnter(e) {
        e.preventDefault();
        const workspace = document.getElementById('workspace');
        if (workspace) {
            workspace.style.borderColor = 'var(--accent-color)';
        }
    },
    
    // 拖拽离开
    handleDragLeave(e) {
        const workspace = document.getElementById('workspace');
        if (workspace && !workspace.contains(e.relatedTarget)) {
            workspace.style.borderColor = 'rgba(0, 255, 255, 0.1)';
        }
    },
    
    // 放置碎片
    handleDrop(e) {
        e.preventDefault();
        
        const workspace = document.getElementById('workspace');
        if (workspace) {
            workspace.style.borderColor = 'rgba(0, 255, 255, 0.1)';
        }
        
        const fragmentId = e.dataTransfer.getData('text/plain');
        this.placeFragment(fragmentId);
        
        // 移除拖拽状态
        const draggingFragment = document.querySelector('.fragment.dragging');
        if (draggingFragment) {
            draggingFragment.classList.remove('dragging');
        }
    },
    
    // 放置碎片到工作区
    placeFragment(fragmentId) {
        // 如果碎片已经在工作区，先移除
        this.removeFragmentFromWorkspace(fragmentId);
        
        // 获取原始碎片
        const originalFragment = document.querySelector(`.fragment[data-id="${fragmentId}"]`);
        if (!originalFragment) return;
        
        // 创建工作区碎片副本
        const workspace = document.getElementById('workspace');
        const fragmentCopy = document.createElement('div');
        
        fragmentCopy.className = 'fragment-in-workspace';
        fragmentCopy.setAttribute('data-id', fragmentId);
        fragmentCopy.textContent = originalFragment.textContent;
        fragmentCopy.draggable = true;
        
        // 添加事件监听器
        fragmentCopy.addEventListener('dragstart', this.handleDragStart.bind(this));
        fragmentCopy.addEventListener('click', () => {
            this.removeFragmentFromWorkspace(fragmentId);
        });
        
        workspace.appendChild(fragmentCopy);
        
        // 更新当前拼图状态
        if (!this.currentPieces.includes(fragmentId)) {
            this.currentPieces.push(fragmentId);
        }
        
        this.updateProgress();
    },
    
    // 从工作区移除碎片
    removeFragmentFromWorkspace(fragmentId) {
        const existingFragment = document.querySelector(`.fragment-in-workspace[data-id="${fragmentId}"]`);
        if (existingFragment) {
            existingFragment.remove();
            this.currentPieces = this.currentPieces.filter(id => id !== fragmentId);
            this.updateProgress();
        }
    },
    
    // 更新进度
    updateProgress() {
        const progressText = document.getElementById('progressText');
        const progressFill = document.getElementById('progressFill');
        
        if (!progressText || !progressFill) return;
        
        const progress = (this.currentPieces.length / this.fragments.length) * 100;
        progressText.textContent = `${Math.round(progress)}%`;
        progressFill.style.width = `${progress}%`;
    },
    
    // 检查解决方案
    checkSolution() {
        if (this.isCompleted) return;
        
        let correctCount = 0;
        const workspaceFragments = document.querySelectorAll('.fragment-in-workspace');
        
        workspaceFragments.forEach((fragment, index) => {
            const fragmentId = fragment.getAttribute('data-id');
            const correctFragment = this.fragments[index];
            
            if (fragmentId === correctFragment.id) {
                fragment.classList.add('correct');
                correctCount++;
            } else {
                fragment.classList.remove('correct');
            }
        });
        
        // 检查是否完成
        if (correctCount === this.fragments.length && this.currentPieces.length === this.fragments.length) {
            this.completePuzzle();
        } else {
            Utils.showNotification(`拼图进度: ${correctCount}/${this.fragments.length}`, 'info');
        }
    },
    
    // 完成拼图
    completePuzzle() {
        this.isCompleted = true;
        
        const completedMessage = document.getElementById('completedMessage');
        const checkBtn = document.getElementById('checkBtn');
        
        if (completedMessage) {
            completedMessage.style.display = 'block';
            completedMessage.classList.add('fade-in');
        }
        
        if (checkBtn) {
            checkBtn.disabled = true;
        }
        
        // 记录成就
        GameState.addClue('文档拼图完成');
        GameState.unlockPage('content.html');
        
        // 显示庆祝效果
        Utils.showNotification('恭喜！文档重组完成！', 'success', 5000);
        
        // 触发故障庆祝效果
        setTimeout(() => {
            completedMessage.classList.add('glitch-simple');
            setTimeout(() => {
                completedMessage.classList.remove('glitch-simple');
            }, 2000);
        }, 1000);
    },
    
    // 重置拼图
    resetPuzzle() {
        const workspace = document.getElementById('workspace');
        if (workspace) {
            workspace.innerHTML = '';
        }
        
        this.currentPieces = [];
        this.isCompleted = false;
        
        const completedMessage = document.getElementById('completedMessage');
        const checkBtn = document.getElementById('checkBtn');
        
        if (completedMessage) {
            completedMessage.style.display = 'none';
        }
        
        if (checkBtn) {
            checkBtn.disabled = false;
        }
        
        // 重置碎片样式
        const fragments = document.querySelectorAll('.fragment');
        fragments.forEach(fragment => {
            fragment.classList.remove('dragging');
        });
        
        const workspaceFragments = document.querySelectorAll('.fragment-in-workspace');
        workspaceFragments.forEach(fragment => fragment.remove());
        
        this.updateProgress();
        
        Utils.showNotification('拼图已重置', 'info');
    },
    
    // 自动解决拼图（开发者功能）
    solve() {
        this.resetPuzzle();
        
        // 按正确顺序放置所有碎片
        this.fragments.forEach(fragment => {
            this.placeFragment(fragment.id);
        });
        
        // 标记为正确
        setTimeout(() => {
            this.checkSolution();
        }, 500);
    }
};

// 拼图初始化
function initPuzzle() {
    PuzzleSystem.init();
}

// 导出到全局作用域
window.PuzzleSystem = PuzzleSystem;
window.initPuzzle = initPuzzle;