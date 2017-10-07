import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({username, password, updateUsername, updatePassword, submitForm, error}) => (
  <div className="login-form">
    <form className="auth-form">
      <h3 className="heading">Login</h3>
      <div className="input-wrapper">
        <div className="form-control">
          <label htmlFor="login-username">Username:</label>
          <input
            placeholder="Enter Username"
            id="login-username"
            type="text"
            name="username"
            value={username}
            onChange={e => updateUsername(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="login-password">Password:</label>
          <input
            placeholder="Enter Password"
            id="login-password"
            type="password"
            name="password"
            value={password}
            onChange={e => updatePassword(e.target.value)}
          />
        </div>
      </div>

      <div className="last-row">
        <div className="error-box" style={{visibility: error ? 'initial' : 'hidden'}}>
          <span className="error">{error}</span>
        </div>

        <div className="form-control button-holder">
          <button onClick={submitForm}>Enter</button>
        </div>
      </div>
    </form>
  </div>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default LoginForm;
