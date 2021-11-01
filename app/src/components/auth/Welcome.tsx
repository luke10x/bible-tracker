import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Constants } from '../../helpers/Constants';
import { AuthContext } from '../../providers/authProvider';
import AuthService from '../../services/authService';

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
    authService.signinRedirectCallback().then((_user) => {
      window.location.replace(Constants.afterWelcomeRoute);
    });
  }, [authService]);

  return <Wrapper>Welcome and redirecting...</Wrapper>;
};
