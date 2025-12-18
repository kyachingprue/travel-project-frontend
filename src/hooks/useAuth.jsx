import React, { use } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
  const context = use(AuthContext);
  return context;
};

export default useAuth;