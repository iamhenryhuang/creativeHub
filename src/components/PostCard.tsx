import React, { useState } from 'react';
import { Project } from '../types';
import './PostCard.css';

interface ProjectCardProps extends Project {
  onLike: () => void;
  onBookmark: () => void;
  onAddReaction: (content: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title,
  description,
  author,
  avatar,
  category,
  tags,
  thumbnail,
  status,
  progress,
  createdAt,
  updatedAt,
  likes,
  liked,
  bookmarked,
  views,
  collaborators,
  reactions,
  budget,
  deadline,
  onLike,
  onBookmark,
  onAddReaction
}) => {
  const [showReactionForm, setShowReactionForm] = useState(false);
  const [reactionContent, setReactionContent] = useState('');

  const handleAddReaction = () => {
    if (reactionContent.trim()) {
      onAddReaction(reactionContent.trim());
      setReactionContent('');
      setShowReactionForm(false);
    }
  };

  const getCategoryConfig = (cat: string) => {
    const configs = {
      design: { name: '設計創作', icon: '🎨', color: '#f59e0b' },
      tech: { name: '科技創新', icon: '💻', color: '#3b82f6' },
      business: { name: '商業創意', icon: '💼', color: '#10b981' },
      art: { name: '藝術表演', icon: '🎭', color: '#8b5cf6' },
      music: { name: '音樂創作', icon: '🎵', color: '#ef4444' },
      writing: { name: '文字創作', icon: '✍️', color: '#f97316' },
      other: { name: '其他', icon: '🌟', color: '#6b7280' }
    };
    return configs[cat as keyof typeof configs] || configs.other;
  };

  const getStatusConfig = (stat: string) => {
    const configs = {
      planning: { name: '規劃中', color: '#f59e0b', bg: '#fef3c7' },
      'in-progress': { name: '進行中', color: '#3b82f6', bg: '#dbeafe' },
      completed: { name: '已完成', color: '#10b981', bg: '#d1fae5' },
      'on-hold': { name: '暫停', color: '#6b7280', bg: '#f3f4f6' }
    };
    return configs[stat as keyof typeof configs] || configs.planning;
  };

  const categoryConfig = getCategoryConfig(category);
  const statusConfig = getStatusConfig(status);

  return (
    <div className="creative-project-card">
      {/* 專案縮圖 */}
      {thumbnail && (
        <div className="creative-project-thumbnail">
          <img src={thumbnail} alt={title} />
          <div className="creative-project-overlay">
            <button className="creative-overlay-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
                <path d="M12 1L22 5V9L12 13L2 9V5L12 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 專案資訊 */}
      <div className="creative-project-content">
        {/* 頭部資訊 */}
        <div className="creative-project-header">
          <div className="creative-author-info">
            <img src={avatar} alt={author} className="creative-author-avatar" />
            <div className="creative-author-details">
              <h4 className="creative-author-name">{author}</h4>
              <span className="creative-project-time">{updatedAt}</span>
            </div>
          </div>
          
          <div className="creative-project-meta">
            <div 
              className="creative-category-badge"
              style={{ '--category-color': categoryConfig.color } as React.CSSProperties}
            >
              <span className="creative-category-icon">{categoryConfig.icon}</span>
              <span className="creative-category-text">{categoryConfig.name}</span>
            </div>
            
            <div 
              className="creative-status-badge"
              style={{ 
                '--status-color': statusConfig.color,
                '--status-bg': statusConfig.bg 
              } as React.CSSProperties}
            >
              {statusConfig.name}
            </div>
          </div>
        </div>

        {/* 專案標題與描述 */}
        <div className="creative-project-main">
          <h3 className="creative-project-title">{title}</h3>
          <p className="creative-project-description">{description}</p>
          
          {/* 標籤 */}
          {tags && tags.length > 0 && (
            <div className="creative-project-tags">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="creative-tag">
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="creative-tag-more">+{tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* 進度條 */}
        {status === 'in-progress' && (
          <div className="creative-progress-section">
            <div className="creative-progress-header">
              <span className="creative-progress-label">專案進度</span>
              <span className="creative-progress-percent">{progress}%</span>
            </div>
            <div className="creative-progress-bar">
              <div 
                className="creative-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 專案詳情 */}
        <div className="creative-project-details">
          {budget && (
            <div className="creative-detail-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5V8L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>預算: {budget.currency} {budget.min.toLocaleString()}-{budget.max.toLocaleString()}</span>
            </div>
          )}
          
          {deadline && (
            <div className="creative-detail-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 1V3M10 1V3M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>截止: {deadline}</span>
            </div>
          )}
          
          <div className="creative-detail-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 6C2 4.89543 2.89543 4 4 4H12C13.1046 4 14 4.89543 14 6V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V6Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>{views} 次瀏覽</span>
          </div>
        </div>

        {/* 協作者 */}
        {collaborators && collaborators.length > 0 && (
          <div className="creative-collaborators">
            <span className="creative-collab-label">協作者:</span>
            <div className="creative-collab-avatars">
              {collaborators.slice(0, 3).map((collab, index) => (
                <div key={index} className="creative-collab-avatar">
                  {collab.charAt(0).toUpperCase()}
                </div>
              ))}
              {collaborators.length > 3 && (
                <div className="creative-collab-more">
                  +{collaborators.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 互動按鈕 */}
        <div className="creative-project-actions">
          <button 
            className={`creative-action-btn ${liked ? 'liked' : ''}`}
            onClick={onLike}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 18C10 18 3 12 3 7.5C3 5.01472 5.01472 3 7.5 3C8.65 3 9.7 3.5 10 4C10.3 3.5 11.35 3 12.5 3C14.9853 3 17 5.01472 17 7.5C17 12 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" fill={liked ? 'currentColor' : 'none'}/>
            </svg>
            <span>{likes}</span>
          </button>

          <button 
            className={`creative-action-btn ${bookmarked ? 'bookmarked' : ''}`}
            onClick={onBookmark}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 3C5 2.44772 5.44772 2 6 2H14C14.5523 2 15 2.44772 15 3V18L10 15L5 18V3Z" stroke="currentColor" strokeWidth="1.5" fill={bookmarked ? 'currentColor' : 'none'}/>
            </svg>
            <span>收藏</span>
          </button>

          <button 
            className="creative-action-btn"
            onClick={() => setShowReactionForm(!showReactionForm)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18 10C18 14.4183 14.4183 18 10 18C8.61929 18 7.32746 17.6313 6.20729 16.9866L2 18L3.01342 13.7927C2.36866 12.6725 2 11.3807 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>回應</span>
          </button>

          <button className="creative-action-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 11L18 8L15 5M18 8H8M10 18C10 18 2 14 2 8C2 6.89543 2.89543 6 4 6H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>分享</span>
          </button>
        </div>

        {/* 回應區 */}
        {reactions && reactions.length > 0 && (
          <div className="creative-reactions">
            {reactions.slice(0, 2).map((reaction) => (
              <div key={reaction.id} className="creative-reaction-item">
                <img src={reaction.avatar} alt={reaction.author} />
                <div className="creative-reaction-bubble">
                  <span className="creative-reaction-author">{reaction.author}</span>
                  <p className="creative-reaction-content">{reaction.content}</p>
                  <span className="creative-reaction-time">{reaction.createdAt}</span>
                </div>
              </div>
            ))}
            {reactions.length > 2 && (
              <button className="creative-show-more-reactions">
                查看全部 {reactions.length} 則回應
              </button>
            )}
          </div>
        )}

        {/* 回應表單 */}
        {showReactionForm && (
          <div className="creative-reaction-form">
            <textarea
              placeholder="分享你的想法、建議或協作意願..."
              value={reactionContent}
              onChange={(e) => setReactionContent(e.target.value)}
              rows={3}
            />
            <div className="creative-reaction-form-actions">
              <button 
                className="creative-cancel-reaction"
                onClick={() => setShowReactionForm(false)}
              >
                取消
              </button>
              <button 
                className="creative-submit-reaction"
                onClick={handleAddReaction}
                disabled={!reactionContent.trim()}
              >
                發送回應
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 