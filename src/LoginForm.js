import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
// set some data whether or not log in is successful
import UserStore from './stores/UserStore';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false,
    };
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
    this.setState({ username: '', password: '', buttonDisabled: false });
  }

  //called when submit button is clicked
  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({ buttonDisabled: true });

    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        /* sending this to the API created and checking if in database
       and create session and log in user */
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      // access result
      let result = await res.json();
      //if success then set to true in componentDidMount
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if (result && result.success === false);
      this.resetForm();
      alert(result.msg);
    } catch (error) {
      console.log(error);
      this.resetForm();
    }
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
