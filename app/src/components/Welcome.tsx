import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Constants } from '../helpers/Constants';
import { AuthContext } from '../auth/providers/authProvider';
import AuthService from '../auth/services/authService';
import { User } from 'oidc-client';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid red;
  & > div {
    text-align: center;
    height: 100px;
  }
`;

export const Welcome: React.FC = () => {
  if (window.location.hash) {
    console.log(`hash${window.location.hash}`);
  }

  const authService: AuthService = useContext(AuthContext);

  const [user, setUser] = useState<User>();
  useEffect(() => {
    authService.signinRedirectCallback().then((user) => {
      setUser(user);
      window.location.replace(Constants.afterWelcomeRoute);
    });
    console.log('Will redirect as soon the ');
  }, [user]);

  return (
    <Wrapper>
      <div>
        Welcome and redirecting...
        {user && (
          <div>
            <p>Logged in as {user.profile.name}</p>
            <a href={Constants.afterWelcomeRoute}>
              (If it does not redirect click here)
            </a>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
