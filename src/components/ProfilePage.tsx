import React, { useState } from 'react';
import { User, Project } from '../types';
import ProjectCard from './PostCard';
import './ProfilePage.css';

interface ProfilePageProps {
  user: User;
  posts: Project[];
  onAddPost: (content: string, image?: string) => void;
  onLike: (postId: number) => void;
  onAddComment: (postId: number, comment: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, posts, onAddPost, onLike, onAddComment }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim()) {
      onAddPost(postContent.trim());
      setPostContent('');
    }
  };

  return (
    <div className="fb-profilepage">
      <div className="fb-profile-cover" style={{ backgroundImage: `url(${user.cover})` }}>
        <div className="fb-profile-avatar-wrap">
          <img className="fb-profile-avatar" src={user.avatar} alt={user.name} />
        </div>
      </div>
      <div className="fb-profile-info">
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
      <div className="fb-profile-postbox">
        <input
          type="text"
          placeholder="發表貼文..."
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <button onClick={handlePost}>發布</button>
      </div>
      <div className="fb-profile-postlist">
        {posts.length === 0 && <div className="fb-profile-nopost">尚無貼文</div>}
        {posts.map(post => (
          <ProjectCard
            key={post.id}
            {...post}
            onLike={() => onLike(post.id)}
            onBookmark={() => {}}
            onAddReaction={(content: string) => onAddComment(post.id, content)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage; 