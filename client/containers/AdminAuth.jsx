import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../actions';
import {Redirect} from 'react-router-dom';
import LoginForm from '../components/AdminAuth/LoginForm';
import axios from 'axios';

class AdminAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    let {username, password} = this.state;
    if (!username || !password) return;
    axios.post('/api/login', {username, password})
      .then(response => {
        let authToken = response.headers['x-auth'];
        localStorage.setItem('auth-token', authToken);
        this.props.logIn(authToken);
      })
      .catch(error => {
        console.log(error);
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
        submitForm={this.submitForm}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminAuth);
