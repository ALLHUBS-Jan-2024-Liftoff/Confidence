import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const LoginStatus = () => {
  const { user } = useAuth();

  useEffect(() => {
    // This effect will run whenever the user state changes
    console.log("User state changed:", user);
  }, [user]);

  return (
    <div>
      {user ? (
        <p>Logged in as {user.username}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default LoginStatus;
