import React, { useState } from 'react';
import { User, Project } from '../types';
import ProjectCard from './PostCard';
import './Feed.css';

interface ProjectWallProps {
  projects: Project[];
  currentUser: User;
  selectedCategory: string;
  onCreateProject: (projectData: { title: string; description: string; category: 'design' | 'tech' | 'business' | 'art' | 'music' | 'writing' | 'other'; tags?: string[] }) => void;
  onLike: (projectId: number) => void;
  onBookmark: (projectId: number) => void;
  onAddReaction: (projectId: number, content: string) => void;
}

const ProjectWall: React.FC<ProjectWallProps> = ({ 
  projects, 
  currentUser, 
  selectedCategory, 
  onCreateProject, 
  onLike, 
  onBookmark, 
  onAddReaction 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'design' as const
  });

  const handleCreateProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      onCreateProject({ title: newProject.title.trim(), description: newProject.description.trim(), category: newProject.category });
      setNewProject({ title: '', description: '', category: 'design' });
      setShowCreateForm(false);
    }
  };

  const categories = [
    { id: 'design', name: '設計創作', icon: '🎨' },
    { id: 'tech', name: '科技創新', icon: '💻' },
    { id: 'business', name: '商業創意', icon: '💼' },
    { id: 'art', name: '藝術表演', icon: '🎭' },
    { id: 'music', name: '音樂創作', icon: '🎵' },
    { id: 'writing', name: '文字創作', icon: '✍️' },
    { id: 'other', name: '其他', icon: '🌟' }
  ];

  return (
    <main className="creative-project-wall">
      {/* 專案創建區 */}
      <div className="creative-create-section">
        <div className="creative-create-header">
          <div className="creative-user-avatar">
            <img src={currentUser.avatar} alt={currentUser.name} />
          </div>
          <button 
            className="creative-create-trigger"
            onClick={() => setShowCreateForm(true)}
          >
            <span>分享你的創意專案...</span>
          </button>
        </div>

        {showCreateForm && (
          <div className="creative-create-form">
            <div className="creative-form-header">
              <h3>創建新專案</h3>
              <button 
                className="creative-close-btn"
                onClick={() => setShowCreateForm(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="creative-form-body">
              <input
                type="text"
                placeholder="專案名稱"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="creative-title-input"
              />
              
              <textarea
                placeholder="描述你的創意想法、目標、需要的協作..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="creative-description-input"
                rows={4}
              />
              
              <div className="creative-category-selector">
                <label>選擇分類</label>
                <div className="creative-category-grid">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`creative-category-option ${newProject.category === cat.id ? 'selected' : ''}`}
                      onClick={() => setNewProject({ ...newProject, category: cat.id as any })}
                    >
                      <span className="creative-category-icon">{cat.icon}</span>
                      <span className="creative-category-name">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="creative-form-footer">
              <button 
                className="creative-cancel-btn"
                onClick={() => setShowCreateForm(false)}
              >
                取消
              </button>
              <button 
                className="creative-submit-btn"
                onClick={handleCreateProject}
                disabled={!newProject.title.trim() || !newProject.description.trim()}
              >
                發布專案
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 篩選與排序 */}
      <div className="creative-filter-bar">
        <div className="creative-filter-left">
          <button className="creative-filter-btn active">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.74L8 12.77L4.09 14.74L5 9.74L1 6L5.91 5.26L8 1Z" fill="currentColor"/>
            </svg>
            最新
          </button>
          <button className="creative-filter-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L2 7V15H6V11H10V15H14V7L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            熱門
          </button>
          <button className="creative-filter-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            進行中
          </button>
        </div>
        <div className="creative-filter-right">
          <button className="creative-view-toggle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 專案列表 */}
      <div className="creative-projects-grid">
        {projects.length === 0 ? (
          <div className="creative-empty-state">
            <div className="creative-empty-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M32 20V44M20 32H44" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>還沒有專案</h3>
            <p>成為第一個分享創意的人！創建你的專案，尋找志同道合的協作者。</p>
            <button 
              className="creative-empty-action"
              onClick={() => setShowCreateForm(true)}
            >
              創建首個專案
            </button>
          </div>
        ) : (
          projects.map(project => (
            <ProjectCard
              key={project.id}
              {...project}
              onLike={() => onLike(project.id)}
              onBookmark={() => onBookmark(project.id)}
              onAddReaction={(content) => onAddReaction(project.id, content)}
            />
          ))
        )}
      </div>

      {/* 載入更多 */}
      {projects.length > 0 && (
        <div className="creative-load-more">
          <button className="creative-load-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            探索更多專案
          </button>
        </div>
      )}
    </main>
  );
};

export default ProjectWall; 