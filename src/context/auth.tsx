import type { User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import React, { createContext, useContext, useMemo, useState } from 'react';

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = SignInProps;

type AuthContext = {
  isLoading: boolean;
  user: User | null;
  signIn: (props: SignInProps) => Promise<void>;
  signUp: (props: SignUpProps) => Promise<void>;
  signOut: () => void;
};

const authContext = createContext<AuthContext>({
  isLoading: false,
  user: null,
  signIn: async () => {
    throw new Error('signIn must be used within an AuthProvider');
  },
  signUp: async () => {
    throw new Error('signUp must be used within an AuthProvider');
  },
  signOut: () => {
    throw new Error('signOut must be used within an AuthProvider');
  },
});

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

type AuthProviderProps = {
  children?: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useMemo(() => {
    return createClient(
      'https://ryhzrxnapzuqqjsconsi.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aHpyeG5hcHp1cXFqc2NvbnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY2Mjc5NzQsImV4cCI6MTk3MjIwMzk3NH0.xQAB_Pcng4tLo28gMxiciyjx1pP1SyUGsBAhb5GqZ4s',
    );
  }, []);
  const [user, setUser] = useState<User | null>(supabase.auth.session()?.user || null);

  async function signIn({ email, password }: SignInProps) {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    setUser(user);
    setIsLoading(false);
  }

  async function signUp({ email, password }: SignUpProps) {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }
    setUser(user);
    setIsLoading(false);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }
  return (
    <authContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </authContext.Provider>
  );
}
