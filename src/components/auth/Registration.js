import React, { Component } from 'react';

function Registration() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = () => {};
  return (
    <div>
      <h3>Register</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-block" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Registration;
