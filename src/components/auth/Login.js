import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import logoImg from '../img/logo.jpg';
import { Card } from '../StyleForm';

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.email,
      password: this.password,
    };

    axios
      .post('http://localhost:3000/api/login', data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };

  render() {
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

        <form onSubmit={this.handleSubmit}>
          <h3>Log In</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={(e) => this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => this.handleChange}
            />
          </div>

          <button className="btn btn-primary btn-block">Login</button>
        </form>
      </Card>
    );
  }
}
