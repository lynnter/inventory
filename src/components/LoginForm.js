import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
// set some data whether or not log in is successful

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
  }
  //restrict text size to 12
  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({ [property]: val });
  }

  resetForm() {
    this.setState({ email: '', password: '', buttonDisabled: false });
  }

  render() {
    return (
      <div className="loginForm">
        Log In
        <InputField
          type="text"
          placeholder="Username"
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
        />
        <SubmitButton
          text={'Login'}
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
      </div>
    );
  }
}

export default LoginForm;
