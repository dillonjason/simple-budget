'use client';

import { firebaseApp } from '@/firebase/config';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';

const auth = getAuth(firebaseApp);

type IAuthContext = {
  user: User | undefined;
};

const AuthContext = React.createContext<IAuthContext>({ user: undefined });

export function useAuthContext() {
  return React.useContext(AuthContext);
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = React.useState<User | undefined>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('setting up auth listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('setting user', user);
      setUser(user ?? undefined);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
}
