import React from 'react';
import { observer } from 'mobx-react';
import './App.css';
import UserStore from './stores/UserStore';
// import LoginForm from './LoginForm';
import LandingPage from './LandingPage';
import { Dashboard } from './Dashboard';
// import InputField from './InputField';
// import SubmitButton from './SubmitButton';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
class App extends React.Component {
  //api call here to check session
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (error) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="App">
          <div className="container">Loading.. Please Wait... </div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            <div className="container">Welcome {UserStore.username}</div>
          </div>
        );
      }

      return (
        <div className="App">
          <div className="container">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </div>
      );
    }
  }
}

// listen for changes in Components
export default observer(App);
