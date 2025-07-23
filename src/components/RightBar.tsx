import React, { useState } from 'react';
import './RightBar.css';

interface InfoPanelProps {
  onJoinChallenge: (challengeId: number) => void;
  onFollowCreator: (creatorId: number) => void;
}

const liveActivities = [
  {
    id: '1',
    type: 'project_launched',
    user: 'Alex Chen',
    avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    action: '發布了新專案',
    project: 'AI 設計助手',
    time: '5分鐘前',
    category: 'tech'
  },
  {
    id: '2',
    type: 'collaboration',
    user: 'Sarah Wang',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    action: '加入協作',
    project: '永續包裝設計',
    time: '12分鐘前',
    category: 'design'
  },
  {
    id: '3',
    type: 'milestone',
    user: 'David Lee',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    action: '完成里程碑',
    project: '音樂創作平台',
    time: '1小時前',
    category: 'music'
  }
];

const featuredCreators = [
  {
    id: '1',
    name: 'Maya Patel',
    title: 'UX/UI 設計師',
    avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
    followers: '2.3K',
    projects: 12,
    skills: ['設計系統', '使用者研究', 'Figma']
  },
  {
    id: '2',
    name: 'Jordan Kim',
    title: '全端開發者',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    followers: '1.8K',
    projects: 8,
    skills: ['React', 'Node.js', 'AI']
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    title: '品牌策略師',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    followers: '3.1K',
    projects: 15,
    skills: ['品牌策略', '市場分析', '創意指導']
  }
];

const creativeChallenges = [
  {
    id: '1',
    title: '永續未來設計挑戰',
    description: '設計能改善環境的創新產品或服務',
    participants: 234,
    prize: 'NT$ 50,000',
    deadline: '7天後截止',
    category: 'design',
    trending: true
  },
  {
    id: '2',
    title: 'AI 創意應用競賽',
    description: '運用人工智慧技術創造有趣的應用',
    participants: 189,
    prize: 'NT$ 30,000',
    deadline: '14天後截止',
    category: 'tech',
    trending: false
  }
];

const trendingTopics = [
  { tag: '#AI設計', posts: 125, growth: '+15%' },
  { tag: '#永續創新', posts: 89, growth: '+8%' },
  { tag: '#Web3創作', posts: 67, growth: '+23%' },
  { tag: '#遠端協作', posts: 156, growth: '+12%' },
  { tag: '#開源專案', posts: 203, growth: '+7%' }
];

const InfoPanel: React.FC<InfoPanelProps> = ({ onJoinChallenge, onFollowCreator }) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'creators' | 'challenges' | 'trends'>('activity');

  const getActivityIcon = (type: string) => {
    const icons = {
      project_launched: '🚀',
      collaboration: '🤝',
      milestone: '🎯',
      achievement: '🏆'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      design: '#f59e0b',
      tech: '#3b82f6',
      business: '#10b981',
      art: '#8b5cf6',
      music: '#ef4444',
      writing: '#f97316'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  };

  return (
    <aside className="creative-info-panel">
      {/* 頁籤切換 */}
      <div className="creative-panel-tabs">
        <button 
          className={`creative-tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 6L9 9L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          動態
        </button>
        
        <button 
          className={`creative-tab ${activeTab === 'creators' ? 'active' : ''}`}
          onClick={() => setActiveTab('creators')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
            <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor"/>
          </svg>
          創作者
        </button>
        
        <button 
          className={`creative-tab ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.74L8 12.77L4.09 14.74L5 9.74L1 6L5.91 5.26L8 1Z" fill="currentColor"/>
          </svg>
          挑戰
        </button>
        
        <button 
          className={`creative-tab ${activeTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 12L6 8L10 12L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="8" r="1" fill="currentColor"/>
            <circle cx="10" cy="12" r="1" fill="currentColor"/>
            <circle cx="14" cy="4" r="1" fill="currentColor"/>
          </svg>
          趨勢
        </button>
      </div>

      {/* 內容區域 */}
      <div className="creative-panel-content">
        {/* 即時動態 */}
        {activeTab === 'activity' && (
          <div className="creative-activity-section">
            <h3>即時動態</h3>
            <div className="creative-activity-list">
              {liveActivities.map(activity => (
                <div key={activity.id} className="creative-activity-item">
                  <div className="creative-activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="creative-activity-content">
                    <div className="creative-activity-header">
                      <img src={activity.avatar} alt={activity.user} />
                      <div className="creative-activity-meta">
                        <span className="creative-activity-user">{activity.user}</span>
                        <span className="creative-activity-action">{activity.action}</span>
                      </div>
                    </div>
                    <div className="creative-activity-project">
                      <span 
                        className="creative-project-dot"
                        style={{ backgroundColor: getCategoryColor(activity.category) }}
                      ></span>
                      {activity.project}
                    </div>
                    <span className="creative-activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="creative-view-all-btn">查看全部動態</button>
          </div>
        )}

        {/* 推薦創作者 */}
        {activeTab === 'creators' && (
          <div className="creative-creators-section">
            <h3>推薦創作者</h3>
            <div className="creative-creators-list">
              {featuredCreators.map(creator => (
                <div key={creator.id} className="creative-creator-card">
                  <div className="creative-creator-header">
                    <img src={creator.avatar} alt={creator.name} />
                    <div className="creative-creator-info">
                      <h4>{creator.name}</h4>
                      <p>{creator.title}</p>
                    </div>
                  </div>
                  <div className="creative-creator-stats">
                    <div className="creative-stat">
                      <span className="creative-stat-number">{creator.followers}</span>
                      <span className="creative-stat-label">追蹤者</span>
                    </div>
                    <div className="creative-stat">
                      <span className="creative-stat-number">{creator.projects}</span>
                      <span className="creative-stat-label">專案</span>
                    </div>
                  </div>
                  <div className="creative-creator-skills">
                    {creator.skills.slice(0, 2).map((skill, index) => (
                      <span key={index} className="creative-skill-chip">
                        {skill}
                      </span>
                    ))}
                    {creator.skills.length > 2 && (
                      <span className="creative-skill-more">+{creator.skills.length - 2}</span>
                    )}
                  </div>
                  <button 
                    className="creative-follow-btn"
                    onClick={() => onFollowCreator(Number(creator.id))}
                  >
                    追蹤
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 創意挑戰 */}
        {activeTab === 'challenges' && (
          <div className="creative-challenges-section">
            <h3>創意挑戰</h3>
            <div className="creative-challenges-list">
              {creativeChallenges.map(challenge => (
                <div key={challenge.id} className="creative-challenge-card">
                  {challenge.trending && (
                    <div className="creative-trending-badge">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 9L3 7L6 10L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      熱門
                    </div>
                  )}
                  <h4>{challenge.title}</h4>
                  <p>{challenge.description}</p>
                  <div className="creative-challenge-details">
                    <div className="creative-challenge-stat">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 7C9.20914 7 11 5.20914 11 3C11 0.790861 9.20914 -1 7 -1C4.79086 -1 3 0.790861 3 3C3 5.20914 4.79086 7 7 7Z" fill="currentColor"/>
                        <path d="M7 9C2.58172 9 -1 12.5817 -1 17H15C15 12.5817 11.4183 9 7 9Z" fill="currentColor"/>
                      </svg>
                      {challenge.participants} 人參與
                    </div>
                    <div className="creative-challenge-stat">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 3V7L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {challenge.deadline}
                    </div>
                  </div>
                  <div className="creative-challenge-prize">
                    獎金: {challenge.prize}
                  </div>
                  <button 
                    className="creative-join-btn"
                    onClick={() => onJoinChallenge(Number(challenge.id))}
                  >
                    參加挑戰
                  </button>
            </div>
          ))}
        </div>
      </div>
        )}

        {/* 趨勢話題 */}
        {activeTab === 'trends' && (
          <div className="creative-trends-section">
            <h3>趨勢話題</h3>
            <div className="creative-trends-list">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="creative-trend-item">
                  <div className="creative-trend-content">
                    <span className="creative-trend-tag">{topic.tag}</span>
                    <span className="creative-trend-posts">{topic.posts} 則專案</span>
                  </div>
                  <div className="creative-trend-growth">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 8L5 5L8 8L10 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{topic.growth}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 每日靈感 */}
            <div className="creative-inspiration-card">
              <div className="creative-inspiration-header">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.09 6.26L17 7L13 10.74L13.91 15.74L10 13.77L6.09 15.74L7 10.74L3 7L7.91 6.26L10 2Z" fill="#f59e0b"/>
                </svg>
                <h4>每日靈感</h4>
              </div>
              <p>"創意不是來自虛無，而是來自不同想法的碰撞與融合。"</p>
              <div className="creative-inspiration-author">
                — Steve Jobs
              </div>
            </div>
        </div>
        )}
      </div>
    </aside>
  );
};

export default InfoPanel; 