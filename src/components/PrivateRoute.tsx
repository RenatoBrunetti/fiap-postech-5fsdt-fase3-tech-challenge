import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
