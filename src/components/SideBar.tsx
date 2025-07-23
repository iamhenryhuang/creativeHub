import React, { useState } from 'react';
import './SideBar.css';

interface ExploreBarProps {
  onCategorySelect?: (category: string) => void;
  onSkillSelect?: (skill: string) => void;
  selectedCategory?: string;
}

const categories = [
  { id: 'design', name: '設計創作', icon: '🎨', color: '#f59e0b' },
  { id: 'tech', name: '科技創新', icon: '💻', color: '#3b82f6' },
  { id: 'business', name: '商業創意', icon: '💼', color: '#10b981' },
  { id: 'art', name: '藝術表演', icon: '🎭', color: '#8b5cf6' },
  { id: 'music', name: '音樂創作', icon: '🎵', color: '#ef4444' },
  { id: 'writing', name: '文字創作', icon: '✍️', color: '#f97316' },
];

const popularSkills = [
  'UI/UX 設計', 'React', 'Python', '平面設計', 'Adobe Photoshop',
  '市場分析', '內容創作', '數據分析', '影片剪輯', '品牌設計'
];

const trendingTags = [
  '#永續設計', '#人工智慧', '#數位轉型', '#創業思維', '#使用者體驗',
  '#開源專案', '#設計系統', '#敏捷開發', '#創意寫作', '#社會創新'
];

const ExploreBar: React.FC<ExploreBarProps> = ({ 
  onCategorySelect, 
  onSkillSelect, 
  selectedCategory 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['categories', 'skills'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <aside className="creative-explore-bar">
      {/* 用戶快速操作 */}
      <div className="creative-user-section">
        <div className="creative-user-avatar">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="用戶" />
          <div className="creative-status-indicator"></div>
        </div>
        <div className="creative-user-info">
          <h4>創作者</h4>
          <p>探索無限可能</p>
        </div>
      </div>

      {/* 快速動作 */}
      <div className="creative-quick-actions">
        <button className="creative-action-item primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>新建專案</span>
        </button>
        <button className="creative-action-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>尋找協作</span>
        </button>
      </div>

      {/* 創意分類 */}
      <div className="creative-section">
        <button 
          className="creative-section-header"
          onClick={() => toggleSection('categories')}
        >
          <h3>創意分類</h3>
          <svg 
            className={expandedSections.has('categories') ? 'expanded' : ''} 
            width="20" height="20" viewBox="0 0 20 20" fill="none"
          >
            <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {expandedSections.has('categories') && (
          <div className="creative-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`creative-category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategorySelect?.(category.id)}
                style={{ '--category-color': category.color } as React.CSSProperties}
              >
                <span className="creative-category-icon">{category.icon}</span>
                <span className="creative-category-name">{category.name}</span>
                <div className="creative-category-indicator"></div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 熱門技能 */}
      <div className="creative-section">
        <button 
          className="creative-section-header"
          onClick={() => toggleSection('skills')}
        >
          <h3>熱門技能</h3>
          <svg 
            className={expandedSections.has('skills') ? 'expanded' : ''} 
            width="20" height="20" viewBox="0 0 20 20" fill="none"
          >
            <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {expandedSections.has('skills') && (
          <div className="creative-skills">
            {popularSkills.map((skill, index) => (
              <button
                key={index}
                className="creative-skill-tag"
                onClick={() => onSkillSelect?.(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 趨勢標籤 */}
      <div className="creative-section">
        <button 
          className="creative-section-header"
          onClick={() => toggleSection('trending')}
        >
          <h3>趨勢標籤</h3>
          <svg 
            className={expandedSections.has('trending') ? 'expanded' : ''} 
            width="20" height="20" viewBox="0 0 20 20" fill="none"
          >
            <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {expandedSections.has('trending') && (
          <div className="creative-trends">
            {trendingTags.map((tag, index) => (
              <span key={index} className="creative-trend-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 活動統計 */}
      <div className="creative-section">
        <h3>本週活動</h3>
        <div className="creative-stats">
          <div className="creative-stat-item">
            <div className="creative-stat-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.74L8 12.77L4.09 14.74L5 9.74L1 6L5.91 5.26L8 1Z" fill="#667eea"/>
              </svg>
            </div>
            <div>
              <div className="creative-stat-number">127</div>
              <div className="creative-stat-label">新專案</div>
            </div>
          </div>
          <div className="creative-stat-item">
            <div className="creative-stat-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#10b981" strokeWidth="2"/>
                <path d="M8 4V8L11 11" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="creative-stat-number">89</div>
              <div className="creative-stat-label">協作邀請</div>
            </div>
          </div>
          <div className="creative-stat-item">
            <div className="creative-stat-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8L8 15L15 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="creative-stat-number">56</div>
              <div className="creative-stat-label">完成項目</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ExploreBar; 