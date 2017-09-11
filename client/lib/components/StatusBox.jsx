import React from 'react';

const StatusBox = ({uuid, success, children, removeStatusBox}) => (
  <div className={`status-box ${success ? "success-status-box" : "failure-status-box"}`}>
    {children}
    <div className="dismiss">
      <span onClick={()=>removeStatusBox(uuid)} className="dismiss-button">×</span>
    </div>
  </div>
);

export default StatusBox;
