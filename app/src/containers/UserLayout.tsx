/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

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
  max-width: 960px;
  margin: 0 auto;
  padding: 10px;
`;

const Header = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export interface UserLayoutProps {
  WrappedComponent: React.ComponentType;
  username: string;
  handleUsernameClick: () => void;
  handleLogoutClick: () => void;
  isLoading: boolean;
}

export const UserLayout: React.FC<UserLayoutProps> = (
  props: UserLayoutProps,
) => {
  const {
    WrappedComponent,
    username,
    handleLogoutClick,
    handleUsernameClick,
    isLoading,
  } = props;
  return (
    <Wrapper>
      <div style={{ flexShrink: 0 }}>
        <Header>
          <Logo src={logo} alt="logo" />
          <Userinfo>
            <p>
              Hello <strong onClick={handleUsernameClick}>{username}</strong>
            </p>
            {!isLoading && (
              <button onClick={handleLogoutClick}> Logout </button>
            )}
          </Userinfo>
        </Header>
      </div>
      <div style={{ flex: '1 0 auto' }}>
        <WrappedComponent />
      </div>
    </Wrapper>
  );
};
