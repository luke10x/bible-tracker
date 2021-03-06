import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../auth/providers/authProvider';
import AuthService from '../auth/services/authService';
import logo from '../logo.svg';

const Wrapper = styled.div`
  text-align: center;
`;
const Logo = styled.img`
  width: 50%;
  margin: 10px auto;
`;
const Content = styled.div`
  display: inline-block;
  max-width: 300px;
  padding: 20px;
`;

export const Public: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const ctx: AuthService = useContext(AuthContext);

  const handleLoginButton = () => {
    setLoading(true);
    console.log('Public Component: redirecting to login');
    ctx.login();
  };

  return (
    <Wrapper>
      <Logo src={logo} alt="logo" />
      <Content>
        <p>Personal Bible Study Tracker</p>
        {!isLoading && (
          <button onClick={handleLoginButton}>Go to Login screen</button>
        )}
      </Content>
    </Wrapper>
  );
};
