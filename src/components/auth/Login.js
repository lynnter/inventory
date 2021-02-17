import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logoImg from '../img/logo.jpg';
import { Card } from '../StyleForm';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = () => {};

  return (
    <Card>
      {/* <Logo src={logoImg} /> */}
      {/* <Form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            onChange={(e) => {
              this.email = e.target.value;
            }}
            placeholder="email"
          />
          <Input
            type="password"
            onChange={(e) => {
              this.password = e.target.value;
            }}
            placeholder="password"
          />
          <Button onClick={this.handleSubmit}>Sign In</Button>
        </Form>
        <Link to="/registrations">Don't have an account?</Link> */}

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

      <button className="btn btn-primary btn-block" onclick={login}>
        Login
      </button>

      <div>
        <h1>Get User</h1>
        <button>Submit</button>
      </div>
    </Card>
  );
}

export default Login;
