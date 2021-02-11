import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// to get our token from context
// import { useAuth } from './components/auth/auth';

function PrivateRoute({ isAuth, component: Component, ...rest }) {
  // const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
