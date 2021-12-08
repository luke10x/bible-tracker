import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Constants } from '../helpers/Constants';
import { AuthContext } from '../auth/providers/authProvider';
import AuthService from '../auth/services/authService';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Welcome: React.FC = () => {
  if (window.location.hash) {
    console.log(`hash${window.location.hash}`);
  }

  const authService: AuthService = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      authService.signinRedirectCallback().then((_user) => {
        window.location.replace(Constants.afterWelcomeRoute);
      });
    }, 5000);
    console.log('Give it 5s and redirect to the dashboard');
  }, []);

  return (
    <Wrapper>
      <p>Welcome and redirecting...</p>
      <Link to="/dashboard">(Click here if it does not redirect)</Link>
    </Wrapper>
  );
};
