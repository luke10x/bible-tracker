import React from 'react';
import { AuthConsumer } from '../../providers/authProvider';
import AuthService from '../../services/authService';

export const SilentRenew: React.FC = () => (
  <AuthConsumer>
    {(ctx: AuthService) => {
      ctx.signinSilentCallback();
      return <span>loading silent renew...</span>;
    }}
  </AuthConsumer>
);
