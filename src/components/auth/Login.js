import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = () => {
    axios({
      method: 'post',
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login',
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:4000/getuser',
    }).then((res) => console.log(res));
  };

  return (
    <>
      <h3>Log In</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-block" onClick={login}>
        Login
      </button>

      <Link to="/registration">Don't have an account?</Link>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
      </div>
    </>
  );
}

export default Login;
