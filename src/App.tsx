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
  // ...可放幾個範例專案...
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState('explore');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ...互動與彈窗邏輯（略，稍後補全）...

  return (
    <div className="creative-hub">
      <NavBar
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onSearch={() => {}}
        onProfileEdit={() => {}}
      />
      <div className="creative-main-layout">
        <SideBar
          onCategorySelect={setSelectedCategory}
          onSkillSelect={() => {}}
        />
        <div className="creative-content-area">
          {currentPage === 'explore' && (
            <Feed
              projects={projects}
              currentUser={currentUser}
              selectedCategory={selectedCategory}
              onCreateProject={() => {}}
              onLike={() => {}}
              onBookmark={() => {}}
              onAddReaction={() => {}}
            />
          )}
          {currentPage === 'profile' && (
            <ProfilePage
              user={currentUser}
              posts={projects.filter(p => p.authorId === currentUser.id)}
              onAddPost={() => {}}
              onLike={() => {}}
              onAddComment={() => {}}
            />
          )}
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