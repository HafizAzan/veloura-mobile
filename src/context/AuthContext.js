import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/client';

const USER_KEY = '@veloura_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(USER_KEY);
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const saveUser = useCallback(async (u) => {
    if (u) {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
      setUser(u);
    } else {
      await AsyncStorage.removeItem(USER_KEY);
      setUser(null);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const data = await api('auth/login', { method: 'POST', body: { email: email.trim().toLowerCase(), password } });
    if (data.needsConfirmation && data.email) {
      return { needsConfirmation: true, email: data.email };
    }
    if (data.user) {
      await saveUser(data.user);
      return { user: data.user };
    }
    throw new Error(data.error || 'Login failed');
  }, [saveUser]);

  const signup = useCallback(async ({ name, email, password }) => {
    const data = await api('auth/signup', {
      method: 'POST',
      body: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: 'user',
      },
    });
    if (data.user) {
      if (data.needsConfirmation) {
        return { needsConfirmation: true, email: data.user.email };
      }
      await saveUser(data.user);
      return { user: data.user };
    }
    throw new Error(data.error || 'Signup failed');
  }, [saveUser]);

  const verifyOtp = useCallback(async ({ email, token }) => {
    const code = String(token).replace(/\s/g, '');
    const data = await api('auth/verify-otp', {
      method: 'POST',
      body: { email: email.trim().toLowerCase(), token: code },
    });
    if (data.user) {
      await saveUser(data.user);
      return { user: data.user };
    }
    throw new Error(data.error || 'Verification failed');
  }, [saveUser]);

  const resendConfirmation = useCallback(async (email) => {
    await api('auth/resend-confirmation', {
      method: 'POST',
      body: { email: email.trim().toLowerCase() },
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await api('auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    await saveUser(null);
  }, [saveUser]);

  const value = {
    user,
    loading,
    login,
    signup,
    verifyOtp,
    resendConfirmation,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
