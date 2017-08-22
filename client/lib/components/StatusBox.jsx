import React from 'react';

const StatusBox = props => (
  <div className={`status-box ${props.success ? "success-status-box" : "failure-status-box"}`}>
    {props.children}
  </div>
);

export default StatusBox;
