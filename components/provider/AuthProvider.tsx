import { userLogin } from '@lib/api/user';

import useAuthStore from '@/stores/auth';

import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

interface AuthProviderProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isLoggedIn,
}) => {
  if (isLoggedIn) {
    const { data: userInfo } = useQuery<any>(['user'], () => userLogin());

    const { user, loginUser, logoutUser } = useAuthStore();
    useEffect(() => {
      loginUser(userInfo);
    }, [userInfo]);
  }

  return <>{children}</>;
};

export default AuthProvider;
