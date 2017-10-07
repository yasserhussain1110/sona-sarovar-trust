import React from 'react';
import PropTypes from 'prop-types';

const getClassNamesFromProps = (success, adding) =>
  `status-box ${success ?
    'success-status-box' :
    'failure-status-box'} ${adding ?
    'adding' :
    'removing'}`;

const StatusBox = ({uuid, success, adding, children, removeStatusBox}) => (
  <div className={getClassNamesFromProps(success, adding)}>
    {children}
    <div className="dismiss">
      <button onClick={() => removeStatusBox(uuid)} className="dismiss-button">×</button>
    </div>
  </div>
);

StatusBox.defaultProps = {
  uuid: '',
  adding: false,
  removeStatusBox: null
};

StatusBox.propTypes = {
  uuid: PropTypes.string,
  adding: PropTypes.bool,
  removeStatusBox: PropTypes.func,
  success: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default StatusBox;
