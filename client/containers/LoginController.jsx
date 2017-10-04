import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../actions';
import {Redirect} from 'react-router-dom';
import LoginForm from '../components/LoginController/LoginForm';
import axios from 'axios';
import handleCommonErrors from '../lib/handlers/commonErrorsHandler';

class LoginController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    };

    this.submitForm = this.submitForm.bind(this);
  }

  validateInputAndUpdateError() {
    let {username, password} = this.state;
    if (!username) {
      this.setState({error: 'Username cannot be empty'});
    } else if (!password) {
      this.setState({error: 'Password cannot be empty'});
    } else {
      return true;
    }

    return false;
  }

  submitForm(e) {
    e.preventDefault();
    let {username, password} = this.state;

    if (!this.validateInputAndUpdateError()) return;

    if (!username || !password) return;
    axios.post('/api/admin/login', {username, password})
      .then(response => {
        let authToken = response.headers['x-auth'];
        localStorage.setItem('auth-token', authToken);
        this.props.logIn(authToken);
      })
      .catch(error => {
        handleCommonErrors(error);
        console.log(error);
        this.setState({error: 'Username or Password Invalid', username: '', password: ''});
      });
  }

  render() {
    if (this.props.userAuth.loggedIn) {
      return <Redirect to="/admin" push/>
    }

    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        updateUsername={username => this.setState({username})}
        updatePassword={password => this.setState({password})}
        submitForm={this.submitForm}
        error={this.state.error}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuth: state.userAuth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: authToken => {
      dispatch(logIn(authToken))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginController);
