import React from 'react';

export default ({username, password, updateUsername, updatePassword, submitForm, error}) => (
  <div className="login-form">
    <form className="auth-form">
      <h3 className="heading">Login</h3>
      <div className="input-wrapper">
        <div className="form-control">
          <label>Username:</label>
          <input
            placeholder="Enter Username" type="text"
            name="username" value={username} onChange={e => updateUsername(e.target.value)}/>
        </div>

        <div className="form-control">
          <label>Password:</label>
          <input
            placeholder="Enter Password" type="password"
            name="password" value={password} onChange={e => updatePassword(e.target.value)}/>
        </div>
      </div>

      <div className="last-row">
        <div className="error-box" style={{visibility: error ? "initial" : "hidden"}}>
          <span className="error">{error}</span>
        </div>

        <div className="form-control button-holder">
          <button onClick={submitForm}>Enter</button>
        </div>
      </div>
    </form>
  </div>
);
