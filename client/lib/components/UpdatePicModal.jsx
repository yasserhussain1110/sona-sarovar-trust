import React from 'react';
import Modal from './Modal';
import PicForm from './PicForm';
import PropTypes from 'prop-types';

const UpdatePicModal = ({picUrl, requestUrl, closeModal, authToken, onSuccess, onFailure}) => (
  <Modal show={true}>
    <div className="update-pic-form">
      <div className="message">
        <span>Modifying Pic</span>
        <img src={picUrl}/>
      </div>
      <PicForm
        close={closeModal}
        authToken={authToken}
        mode="update"
        url={requestUrl}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  </Modal>
);

UpdatePicModal.proptypes = {
  picUrl: PropTypes.string.isRequired,
  requestUrl: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

export default UpdatePicModal;
