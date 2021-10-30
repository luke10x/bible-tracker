import React from 'react';
import AuthService from '../services/authService';

const authService = new AuthService();
export const AuthContext = React.createContext<AuthService>(authService);

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider: React.FC = (props: any) => {
  return (
    <AuthContext.Provider value={authService}>
      {props.children}
    </AuthContext.Provider>
  );
};
