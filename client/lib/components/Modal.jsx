import React from 'react';
import PropTypes from 'prop-types';

const Modal = props => {
  return (
    <div style={{display: props.show ? 'initial' : 'none'}} className="modal">
      <div className="modal-mask">
        <div style={props.forceWidth ? {width: props.forceWidth} : {}} className="modal-container">
          {props.children}
        </div>
      </div>
    </div>
  );
};

// Possible usage example of modal

/*
<Modal show={false}>
  <div className="form">
    <form>
      <div className="form-control">
        <label>File</label>
        <input type="file" />
      </div>
      <div className="form-control">
        <label>Enter Val</label>
        <input type="text" />
      </div>
      <div className="form-control">
        <label>Button</label>
        <input type="submit" />
      </div>
    </form>
  </div>
</Modal>
*/

Modal.defaultProps = {
  children: null,
  forceWidth: null
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.element,
  forceWidth: PropTypes.string
};

export default Modal;
