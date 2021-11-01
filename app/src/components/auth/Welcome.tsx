import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../providers/authProvider';
import AuthService from '../../services/authService';

const Wrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const StyledSpin = styled.div`
  width: 100px;
  background: red;
`;

export const Welcome: React.FC = () => {
  if (window.location.hash) {
    console.log(`hash${window.location.hash}`);
  }

  const authService: AuthService = useContext(AuthContext);

  useEffect(() => {
    authService.signinRedirectCallback().then((user) => {
      window.location.replace('/tasks');
    });
  }, [authService]);

  return (
    <Wrapper>
      <StyledSpin />
      Will redirect you soon...
    </Wrapper>
  );
};
