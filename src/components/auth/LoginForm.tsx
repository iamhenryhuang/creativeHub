import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserLoginData } from '../../types';
import './AuthForms.css';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onClose }) => {
  const { login, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState<UserLoginData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      onClose();
    } catch (error: any) {
      console.error('登录失败:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      console.error('Google 登录失败:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return '用户不存在';
      case 'auth/wrong-password':
        return '密码错误';
      case 'auth/invalid-email':
        return '邮箱格式不正确';
      case 'auth/user-disabled':
        return '用户账户已被禁用';
      case 'auth/too-many-requests':
        return '登录尝试次数过多，请稍后再试';
      default:
        return '登录失败，请稍后再试';
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-header">
        <h2>登录到创意协作平台</h2>
        <p>连接创意人才，共创美好作品</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form-content">
        <div className="form-group">
          <label htmlFor="email">邮箱地址</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="请输入您的邮箱"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="请输入您的密码"
          />
        </div>

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={loading}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>

      <div className="auth-divider">
        <span>或</span>
      </div>

      <button
        type="button"
        className="google-login-btn"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        使用 Google 登录
      </button>

      <div className="auth-switch">
        <p>
          还没有账户？
          <button
            type="button"
            className="switch-btn"
            onClick={onSwitchToRegister}
          >
            立即注册
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 