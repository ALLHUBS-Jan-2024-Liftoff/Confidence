import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // If Bootstrap's CSS is loaded after your custom styles, it can override them.
// import custom CSS here if any

const LoginStatus = () => {
  const { user } = useAuth();

  useEffect(() => {
    // This effect will run whenever the user state changes
    console.log("User state changed:", user);
  }, [user]);

  return (
    <div className="container-fluid">
      {user ? (
        <p>Logged in as {user.username}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default LoginStatus;
