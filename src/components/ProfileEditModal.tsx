import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import './ProfileEditModal.css';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName,
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        skills: userProfile.skills || [],
        photoURL: userProfile.photoURL || '',
        coverURL: userProfile.coverURL || ''
      });
    }
  }, [userProfile]);

  if (!isOpen || !userProfile) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData({
      ...formData,
      skills
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(formData);
      setSuccess('个人资料更新成功！');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error('更新失败:', error);
      setError('更新失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="profile-edit-modal-backdrop" onClick={handleBackdropClick}>
      <div className="profile-edit-modal">
        <div className="profile-edit-header">
          <h2>编辑个人资料</h2>
          <button className="profile-edit-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {error && <div className="profile-edit-error">{error}</div>}
        {success && <div className="profile-edit-success">{success}</div>}

        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-section">
            <h3>基本信息</h3>
            
            <div className="form-group">
              <label htmlFor="displayName">用户名</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName || ''}
                onChange={handleChange}
                required
                placeholder="请输入您的用户名"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">个人简介</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                placeholder="介绍一下您自己..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">所在地区</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="例如：台北, 台湾"
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">技能标签</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills?.join(', ') || ''}
                onChange={handleSkillsChange}
                placeholder="请用逗号分隔，例如：UI设计, React, 摄影"
              />
              <small className="form-help">请用逗号分隔不同的技能</small>
            </div>
          </div>

          <div className="form-section">
            <h3>头像和封面</h3>
            
            <div className="form-group">
              <label htmlFor="photoURL">头像 URL</label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL || ''}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="coverURL">封面 URL</label>
              <input
                type="url"
                id="coverURL"
                name="coverURL"
                value={formData.coverURL || ''}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
          </div>

          <div className="profile-edit-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? '保存中...' : '保存更改'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal; 