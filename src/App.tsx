import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Feed from './components/Feed';
import RightBar from './components/RightBar';
import ProfilePage from './components/ProfilePage';
import { User, Project } from './types';

const initialUser: User = {
  id: 1,
  name: '張創意',
  username: 'creativezhang',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  cover: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  bio: '設計師 & 創意總監 | 專注於 UI/UX 和品牌設計',
  skills: ['UI/UX 設計', '品牌設計', 'React'],
  location: '台北',
  joinedDate: '2023-01-01',
  followers: 128,
  following: 56,
  projects: 3
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: '現代簡約品牌識別設計',
    description: '為一家新興科技公司設計全套品牌識別系統，包含 Logo 設計、色彩規範、字體選擇等。',
    author: '陳設計師',
    authorId: 2,
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    category: 'design',
    tags: ['品牌設計', 'Logo', 'VI設計'],
    status: 'completed',
    progress: 100,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    likes: 234,
    liked: false,
    bookmarked: false,
    views: 1456,
    collaborators: ['設計師A', '創意總監B'],
    reactions: []
  }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState('explore');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 搜尋功能
  const handleSearch = (query: string) => {
    console.log('搜尋:', query);
    // TODO: 實作真實搜尋邏輯
    alert(`搜尋: ${query}`);
  };

  // 個人檔案編輯
  const handleProfileEdit = (updates: { name?: string; avatar?: string; bio?: string; cover?: string }) => {
    setCurrentUser(prev => ({
      ...prev,
      ...(updates.name && { name: updates.name }),
      ...(updates.avatar && { avatar: updates.avatar }),
      ...(updates.bio && { bio: updates.bio }),
      ...(updates.cover && { cover: updates.cover })
    }));
  };

  // 渲染當前頁面內容
  const renderPageContent = () => {
    switch (currentPage) {
      case 'explore':
        return (
          <Feed
            projects={projects}
            currentUser={currentUser}
            selectedCategory={selectedCategory}
            onCreateProject={() => {}}
            onLike={() => {}}
            onBookmark={() => {}}
            onAddReaction={() => {}}
          />
        );
      case 'projects':
        return (
          <div className="creative-projects-page">
            <h2>我的專案</h2>
            <div className="creative-projects-grid">
              {projects.filter(p => p.authorId === currentUser.id).map(project => (
                <div key={project.id} className="creative-project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="creative-project-meta">
                    <span>狀態: {project.status}</span>
                    <span>讚數: {project.likes}</span>
                  </div>
                </div>
              ))}
              {projects.filter(p => p.authorId === currentUser.id).length === 0 && (
                <div className="creative-empty-state">
                  <p>您還沒有創建任何專案</p>
                  <button className="creative-btn-primary">創建第一個專案</button>
                </div>
              )}
            </div>
          </div>
        );
      case 'collaborators':
        return (
          <div className="creative-collaborators-page">
            <h2>協作者</h2>
            <div className="creative-collaborators-grid">
              <div className="creative-collaborator-card">
                <img src="https://randomuser.me/api/portraits/women/25.jpg" alt="陳設計師" />
                <h3>陳設計師</h3>
                <p>UI/UX 專家</p>
                <button className="creative-btn-primary">聯繫</button>
              </div>
              <div className="creative-collaborator-card">
                <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="李開發者" />
                <h3>李開發者</h3>
                <p>前端工程師</p>
                <button className="creative-btn-primary">聯繫</button>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <ProfilePage
            user={currentUser}
            posts={projects.filter(p => p.authorId === currentUser.id)}
            onAddPost={() => {}}
            onLike={() => {}}
            onAddComment={() => {}}
          />
        );
      case 'create':
        return (
          <div className="creative-create-page">
            <h2>創建新專案</h2>
            <p>創建功能開發中...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="creative-hub">
      <NavBar
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onSearch={handleSearch}
        onProfileEdit={handleProfileEdit}
      />
      <div className="creative-main-layout">
        <SideBar
          onCategorySelect={setSelectedCategory}
          onSkillSelect={() => {}}
        />
        <div className="creative-content-area">
          {renderPageContent()}
        </div>
        <RightBar
          onJoinChallenge={() => {}}
          onFollowCreator={() => {}}
        />
      </div>
    </div>
  );
};

export default App; 