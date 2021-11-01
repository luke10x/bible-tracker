/* eslint-disable react/display-name */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';
import AuthService from '../../services/authService';
import { AuthContext } from '../../providers/authProvider';
import { User } from 'oidc-client';

const Logo = styled.img`
  width: 100px;
  flex-grow: 0;
`;
const Userinfo = styled.div`
  flex-grow: 10;
  justify-content: flex-end;

  display: flex;
  align-items: baseline;
  p {
    padding: 0 20px;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
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
      <Wrapper>
        <div style={{ flexShrink: 0 }}>
          <Header>
            <Logo src={logo} alt="logo" />
            <Userinfo>
              <p>
                Hello <strong onClick={handleUsernameClick}>{username}</strong>
              </p>
              {!isLoading && <button onClick={handleLogout}> Logout </button>}
            </Userinfo>
          </Header>
        </div>
        <div style={{ flex: '1 0 auto' }}>
          <WrappedComponent />
        </div>
      </Wrapper>
    );
  };
};
