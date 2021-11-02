/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthService from '../../services/authService';
import { AuthContext } from '../../providers/authProvider';
import { User } from 'oidc-client';
import { UserLayout } from '../../containers/UserLayout';

const SpinWrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const StyledSpin = styled.div`
  width: 100px;
  background: red;
`;

export const authenticated = (
  WrappedComponent: React.ComponentType,
): React.FC => {
  return () => {
    const authService: AuthService = useContext(AuthContext);
    const [user, setUser] = useState<User>();

    const [isLoading, setLoading] = useState<boolean>(false);
    const handleLogout = () => {
      setLoading(true);
      authService.logout();
    };

    useEffect(() => {
      authService.getUser().then((user) => {
        if (user === null) {
          window.location.replace('/');
        } else {
          setUser(user);
        }
        return user;
      });
    }, [user?.id_token]);

    if (!user) {
      return (
        <SpinWrapper>
          <StyledSpin />
        </SpinWrapper>
      );
    }
    const username = user.profile.name;

    const handleUsernameClick = () => {
      const parseJwt = (token: string) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      };

      console.log('user', user);
      user && console.log('id_token details', parseJwt(user.id_token));
      user && console.log('access_token details', parseJwt(user.access_token));
    };

    return (
      <UserLayout
        WrappedComponent={WrappedComponent}
        username={username || 'null-user'}
        handleUsernameClick={handleUsernameClick}
        handleLogoutClick={handleLogout}
        isLoading={isLoading}
      />
    );
  };
};
