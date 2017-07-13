import React from 'react';

export default ({username, password, updateUsername, updatePassword, submitForm}) => (
  <div className="login-form">
    <form className="auth-form">
      <div className="form-control">
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={e => updateUsername(e.target.value)}/>
      </div>

      <div className="form-control">
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={e => updatePassword(e.target.value)}/>
      </div>

      <div className="form-control">
        <button onClick={submitForm}>Submit</button>
      </div>
    </form>
  </div>
);
