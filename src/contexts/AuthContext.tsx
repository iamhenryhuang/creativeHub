import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { AuthUser, UserRegistrationData, UserLoginData, UserProfile } from '../types';

interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (data: UserRegistrationData) => Promise<void>;
  login: (data: UserLoginData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 注册新用户
  const signup = async (data: UserRegistrationData) => {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // 更新用户显示名称
    await updateProfile(user, {
      displayName: data.displayName
    });

    // 在 Firestore 中创建用户资料
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: data.displayName,
      photoURL: user.photoURL || '',
      coverURL: '',
      bio: '',
      skills: [],
      location: '',
      joinedDate: new Date().toISOString(),
      followers: 0,
      following: 0,
      projects: 0,
      isOnline: true,
      lastSeen: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  // 用户登录
  const login = async (data: UserLoginData) => {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  };

  // 用户登出
  const logout = async () => {
    if (currentUser) {
      // 更新用户在线状态
      await updateDoc(doc(db, 'users', currentUser.uid), {
        isOnline: false,
        lastSeen: new Date().toISOString()
      });
    }
    await signOut(auth);
  };

  // 重置密码
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Google 登录
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    // 检查用户是否已存在
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // 创建新用户资料
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || '用户',
        photoURL: user.photoURL || '',
        coverURL: '',
        bio: '',
        skills: [],
        location: '',
        joinedDate: new Date().toISOString(),
        followers: 0,
        following: 0,
        projects: 0,
        isOnline: true,
        lastSeen: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  };

  // 更新用户资料
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    
    await updateDoc(doc(db, 'users', currentUser.uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    // 更新本地状态
    setUserProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  // 获取用户资料
  const fetchUserProfile = async (uid: string) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as UserProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        };
        setCurrentUser(authUser);
        
        // 获取用户资料
        await fetchUserProfile(user.uid);
        
        // 更新用户在线状态
        await updateDoc(doc(db, 'users', user.uid), {
          isOnline: true,
          lastSeen: new Date().toISOString()
        });
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 