import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <>{children}</>;
};

export default AuthRoute;
