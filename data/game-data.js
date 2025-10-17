// 游戏数据

const GameData = {
    // 线索数据
    clues: {
        'ctf': {
            name: 'CTF比赛信息',
            description: '全国CTF网络安全大赛决赛通知',
            content: `
                <h3>CTF比赛信息</h3>
                <p><strong>比赛名称：</strong>全国CTF网络安全大赛</p>
                <p><strong>决赛日期：</strong>2018年5月23日</p>
                <p><strong>李浩的成就：</strong>进入决赛并获得一等奖</p>
                <p><strong>线索提示：</strong>这个日期可能是重要密码的组成部分</p>
            `,
            relatedPassword: '180523'
        },
        'awards': {
            name: '李浩获奖记录', 
            description: '李浩的技术成就和获奖情况',
            content: `
                <h3>李浩获奖记录</h3>
                <p><strong>2018年5月：</strong>全国CTF网络安全大赛一等奖</p>
                <p><strong>2017年11月：</strong>国际黑客马拉松第二名</p>
                <p><strong>2017年6月：</strong>大学生程序设计竞赛金奖</p>
                <p><strong>线索提示：</strong>最近的重大成就日期可能被用作密码</p>
            `
        },
        'calendar': {
            name: '2018年5月日历',
            description: '标记重要日期的日历',
            content: `
                <h3>2018年5月日历</h3>
                <div class="calendar">
                    <div class="calendar-header">2018年5月</div>
                    <div class="calendar-day">日</div><div class="calendar-day">一</div>
                    <div class="calendar-day">二</div><div class="calendar-day">三</div>
                    <div class="calendar-day">四</div><div class="calendar-day">五</div>
                    <div class="calendar-day">六</div>
                    
                    <div class="calendar-day"></div><div class="calendar-day"></div>
                    <div class="calendar-day">1</div><div class="calendar-day">2</div>
                    <div class="calendar-day">3</div><div class="calendar-day">4</div>
                    <div class="calendar-day">5</div>
                    
                    <div class="calendar-day">6</div><div class="calendar-day">7</div>
                    <div class="calendar-day">8</div><div class="calendar-day">9</div>
                    <div class="calendar-day">10</div><div class="calendar-day">11</div>
                    <div class="calendar-day">12</div>
                    
                    <div class="calendar-day">13</div><div class="calendar-day">14</div>
                    <div class="calendar-day">15</div><div class="calendar-day">16</div>
                    <div class="calendar-day">17</div><div class="calendar-day">18</div>
                    <div class="calendar-day">19</div>
                    
                    <div class="calendar-day">20</div><div class="calendar-day">21</div>
                    <div class="calendar-day">22</div><div class="calendar-day marked">23</div>
                    <div class="calendar-day">24</div><div class="calendar-day">25</div>
                    <div class="calendar-day">26</div>
                    
                    <div class="calendar-day">27</div><div class="calendar-day">28</div>
                    <div class="calendar-day">29</div><div class="calendar-day">30</div>
                    <div class="calendar-day">31</div>
                </div>
                <p><strong>线索提示：</strong>标记的日期(23)可能是密码的一部分</p>
            `
        },
        'timeline': {
            name: '项目时间线',
            description: '回声项目的重要时间节点',
            content: `
                <h3>项目时间线</h3>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-date">2018年5月23日</div>
                        <div>CTF比赛决赛日，李浩获得一等奖</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2018年5月20日</div>
                        <div>收到CTF决赛通知邮件</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2018年5月18日</div>
                        <div>公司表彰李浩的网络安全成就</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2018年5月15日</div>
                        <div>回声项目核心算法完成</div>
                    </div>
                </div>
                <p><strong>线索提示：</strong>时间线中最重要的事件日期可能是完整密码</p>
            `
        },
        'format': {
            name: '日期格式提示',
            description: '密码格式说明',
            content: `
                <h3>日期格式提示</h3>
                <p><strong>密码格式：</strong>YYMMDD（年年月月日日）</p>
                <p><strong>示例：</strong></p>
                <ul>
                    <li>2018年5月23日 → 180523</li>
                    <li>2017年12月5日 → 171205</li>
                    <li>2019年3月15日 → 190315</li>
                </ul>
                <p><strong>提示：</strong>结合CTF比赛日期使用此格式生成密码</p>
            `
        }
    },
    
    // 邮件数据
    emails: [
        {
            id: 'email1',
            sender: '网络安全协会',
            subject: 'CTF比赛决赛通知',
            date: '2018-05-20',
            content: `
                <p>尊敬的李浩先生：</p>
                <p>恭喜您成功进入全国CTF网络安全大赛决赛！您的团队在初赛中表现出色。</p>
                <p><strong>决赛详情：</strong></p>
                <ul>
                    <li><strong>日期：</strong>2018年5月23日</li>
                    <li><strong>时间：</strong>上午9:00 - 下午6:00</li>
                    <li><strong>地点：</strong>北京国际会议中心</li>
                </ul>
            `,
            unread: true
        },
        {
            id: 'email2', 
            sender: '公司人力资源',
            subject: '关于李浩的表彰决定',
            date: '2018-05-18',
            content: '鉴于李浩在网络安全领域的杰出表现...',
            unread: false
        }
    ],
    
    // 博客文章数据
    blogPosts: [
        {
            id: 'post1',
            title: '回声项目：检测网络监控的新方法',
            date: '2018-05-28',
            category: '技术研究',
            content: '最近在开发一个名为"回声"的系统...',
            hiddenContent: '回声系统的核心算法基于机器学习...'
        },
        {
            id: 'post2',
            title: 'CTF比赛中的密码学挑战解析', 
            date: '2018-05-25',
            category: '比赛记录',
            content: '刚刚参加的CTF比赛中有一个有趣的密码学挑战...',
            hiddenContent: '比赛在5月23日举行，我们团队解决了所有密码学挑战...'
        }
    ],
    
    // 获取线索内容
    getClueContent(clueId) {
        return this.clues[clueId] ? this.clues[clueId].content : '线索未找到';
    },
    
    // 获取线索信息
    getClueInfo(clueId) {
        return this.clues[clueId] || null;
    },
    
    // 获取所有线索
    getAllClues() {
        return Object.values(this.clues);
    }
};

// 导出到全局作用域
window.GameData = GameData;