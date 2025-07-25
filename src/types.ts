// === 創意協作平台 - 類型定義 ===

// Firebase Auth 相关类型
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// 用户注册数据
export interface UserRegistrationData {
  email: string;
  password: string;
  displayName: string;
}

// 用户登录数据
export interface UserLoginData {
  email: string;
  password: string;
}

// Firestore 用户资料
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  coverURL?: string;
  bio?: string;
  skills: string[];
  location?: string;
  joinedDate: string;
  followers: number;
  following: number;
  projects: number;
  isOnline: boolean;
  lastSeen: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  cover: string;
  bio: string;
  skills: string[];
  location: string;
  joinedDate: string;
  followers: number;
  following: number;
  projects: number;
}

export interface Reaction {
  id: number;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  authorId: number;
  avatar: string;
  category: 'design' | 'tech' | 'business' | 'art' | 'music' | 'writing' | 'other';
  tags: string[];
  thumbnail?: string;
  gallery?: string[];
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  views: number;
  collaborators: string[];
  reactions: Reaction[];
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  deadline?: string;
}

export interface Activity {
  id: number;
  type: 'project_created' | 'project_updated' | 'collaboration' | 'achievement' | 'milestone';
  author: string;
  authorId: number;
  avatar: string;
  title: string;
  description: string;
  timestamp: string;
  projectId?: number;
  data?: any;
}

export interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'collaboration' | 'achievement';
  from: string;
  fromAvatar: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: number;
} 