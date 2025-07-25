import React, { useState } from 'react';
import './NavBar.css';
import { User } from '../types';

interface NavBarProps {
  currentUser: User;
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearch: (query: string) => void;
  onProfileEdit: (updates: { name?: string; avatar?: string; bio?: string; cover?: string }) => void;
}

const NavBar: React.FC<NavBarProps> = ({ 
  currentUser, 
  currentPage, 
  onPageChange, 
  onSearch, 
  onProfileEdit 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [editingName, setEditingName] = useState(currentUser.name);
  const [editingAvatar, setEditingAvatar] = useState(currentUser.avatar);
  const [editingBio, setEditingBio] = useState(currentUser.bio);
  const [editingCover, setEditingCover] = useState(currentUser.cover);



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleProfileSave = () => {
    onProfileEdit({
      name: editingName !== currentUser.name ? editingName : undefined,
      avatar: editingAvatar !== currentUser.avatar ? editingAvatar : undefined,
      bio: editingBio !== currentUser.bio ? editingBio : undefined,
      cover: editingCover !== currentUser.cover ? editingCover : undefined
    });
    setShowProfileEdit(false);
    setShowUserMenu(false);
  };

  const closeAllPopups = () => {
    setShowNotifications(false);
    setShowUserMenu(false);
    setShowProfileEdit(false);
  };

  const handlePageChange = (page: string) => {
    closeAllPopups();
    onPageChange(page);
  };



  const mockNotifications = [
    { id: 1, message: "新的協作邀請", time: "2分鐘前" },
    { id: 2, message: "專案獲得新讚", time: "1小時前" },
    { id: 3, message: "挑戰即將截止", time: "3小時前" }
  ];

  return (
    <nav className="creative-navbar">
      <div className="creative-navbar-container">
        {/* 品牌 Logo */}
        <div className="creative-brand">
          <div className="creative-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="url(#gradient)" />
              <path d="M12 10L20 16L12 22V10Z" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="creative-brand-text">CreativeHub</span>
        </div>

        {/* 搜尋功能 */}
        <div className="creative-search">
          <form className="creative-search-form" onSubmit={handleSearch}>
            <div className="creative-search-input-wrapper">
              <svg className="creative-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                className="creative-search-input"
                type="text"
                placeholder="搜尋專案、創作者、技能..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="button"
                className="creative-search-btn"
                onClick={handleSearchClick}
              >
                搜尋
              </button>
            </div>
          </form>
        </div>

        {/* 主導航連結 */}
        <div className="creative-nav-links">
          <button 
            className={`creative-nav-link ${currentPage === 'explore' ? 'active' : ''}`}
            onClick={() => handlePageChange('explore')}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>探索</span>
          </button>

          <button 
            className={`creative-nav-link ${currentPage === 'projects' ? 'active' : ''}`}
            onClick={() => handlePageChange('projects')}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="7.5,4.21 12,6.81 16.5,4.21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="21,12 16.5,14.6 16.5,19.79" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="12,22.08 12,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>我的專案</span>
          </button>

          <button 
            className={`creative-nav-link ${currentPage === 'collaborators' ? 'active' : ''}`}
            onClick={() => handlePageChange('collaborators')}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>協作者</span>
          </button>

          <button 
            className={`creative-nav-link ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => handlePageChange('profile')}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor" />
              <path d="M10 12C4.47715 12 0 16.4772 0 22H20C20 16.4772 15.5228 12 10 12Z" fill="currentColor" />
            </svg>
            <span>我的檔案</span>
          </button>
        </div>

        {/* 右側操作區 */}
        <div className="creative-navbar-actions">
          {/* 通知 */}
          <div className="creative-notification-wrapper">
            <button 
              className={`creative-action-btn ${showNotifications ? 'active' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.73 20C11.5542 20.3031 11.3018 20.5547 10.9982 20.7295C10.6946 20.9044 10.3504 20.9965 10 20.9965C9.64961 20.9965 9.30539 20.9044 9.00181 20.7295C8.69823 20.5547 8.44581 20.3031 8.27 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="creative-notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="creative-notifications-dropdown">
                <h3>通知</h3>
                {mockNotifications.map(notification => (
                  <div key={notification.id} className="creative-notification-item">
                    <span>{notification.message}</span>
                    <span className="creative-notification-time">{notification.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 創建按鈕 */}
          <button 
            className="creative-create-btn"
            onClick={() => handlePageChange('create')}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>創建</span>
          </button>

          {/* 用戶頭像和菜單 */}
          <div className="creative-user-wrapper">
            <button 
              className={`creative-user-btn ${showUserMenu ? 'active' : ''}`}
              onClick={() => setShowUserMenu(!showUserMenu)}
              type="button"
            >
              <img src={currentUser.avatar} alt={currentUser.name} />
            </button>

            {showUserMenu && (
              <div className="creative-user-dropdown">
                <div className="creative-user-info">
                  <img src={currentUser.avatar} alt={currentUser.name} />
                  <div>
                    <div className="creative-user-name">{currentUser.name}</div>
                    <div className="creative-user-username">@{currentUser.username}</div>
                  </div>
                </div>
                <button 
                  className="creative-dropdown-item"
                  onClick={() => setShowProfileEdit(true)}
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  編輯個人檔案
                </button>
                <button 
                  className="creative-dropdown-item"
                  onClick={() => handlePageChange('profile')}
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  查看個人檔案
                </button>
                <hr className="creative-dropdown-divider" />
                <button className="creative-dropdown-item" type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  登出
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 個人檔案編輯模態框 */}
      {showProfileEdit && (
        <div className="creative-modal-overlay" onClick={() => setShowProfileEdit(false)}>
          <div className="creative-modal creative-modal-profile" onClick={(e) => e.stopPropagation()}>
            <h2>編輯個人檔案</h2>
            <div className="creative-edit-form">
              <div className="creative-form-group">
                <label>姓名</label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  placeholder="輸入您的姓名"
                  style={{width:'100%'}}
                />
              </div>
              <div className="creative-form-group">
                <label>簡介</label>
                <textarea
                  value={editingBio}
                  onChange={(e) => setEditingBio(e.target.value)}
                  placeholder="輸入您的個人簡介"
                  rows={3}
                  style={{width:'100%'}}
                />
              </div>
              <div className="creative-form-group">
                <label>頭像網址</label>
                <input
                  type="url"
                  value={editingAvatar}
                  onChange={(e) => setEditingAvatar(e.target.value)}
                  placeholder="輸入頭像圖片網址"
                  style={{width:'100%'}}
                />

              </div>
              <div className="creative-avatar-preview">
                <img src={editingAvatar} alt="頭像預覽" style={{width:64,height:64,borderRadius:'50%',objectFit:'cover',border:'2px solid #e2e8f0'}} />
              </div>
              <div className="creative-form-group">
                <label>背景圖片網址</label>
                <input
                  type="url"
                  value={editingCover}
                  onChange={(e) => setEditingCover(e.target.value)}
                  placeholder="輸入背景圖片網址"
                  style={{width:'100%'}}
                />

              </div>
              <div className="creative-avatar-preview">
                <img src={editingCover} alt="背景圖片預覽" style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'12px',border:'2px solid #e2e8f0'}} />
              </div>
            </div>
            <div className="creative-modal-actions">
              <button 
                className="creative-btn-secondary"
                onClick={() => setShowProfileEdit(false)}
                type="button"
              >
                取消
              </button>
              <button 
                className="creative-btn-primary"
                onClick={handleProfileSave}
                type="button"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar; 