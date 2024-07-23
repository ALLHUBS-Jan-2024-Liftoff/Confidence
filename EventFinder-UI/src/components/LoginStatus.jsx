import React from 'react';
import { useAuth } from '../auth/AuthContext';

const LoginStatus = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? <p>Logged in as {user.username}</p> : <p>Not logged in</p>}
    </div>
  );
};

export default LoginStatus;