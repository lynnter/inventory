import React from 'react';
import { Button } from '../components/StyleForm';
import { useAuth } from './auth/auth';

function Dashboard(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <div>Dashboard Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Dashboard;
