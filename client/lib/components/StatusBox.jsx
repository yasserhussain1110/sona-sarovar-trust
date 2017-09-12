import React from 'react';

const getClassNamesFromProps = (success, adding) =>
  `status-box ${success ?
    "success-status-box" :
    "failure-status-box"} ${adding ?
    "adding" :
    "removing"}`;

const StatusBox = ({uuid, success, adding, children, removeStatusBox}) => (
  <div className={getClassNamesFromProps(success, adding)}>
    {children}
    <div className="dismiss">
      <span onClick={() => removeStatusBox(uuid)} className="dismiss-button">×</span>
    </div>
  </div>
);

export default StatusBox;
