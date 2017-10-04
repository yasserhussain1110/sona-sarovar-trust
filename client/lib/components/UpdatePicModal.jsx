import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import PicForm from './PicForm';

const UpdatePicModal = ({picUrl, requestUrl, closeModal, authToken, onSuccess, onFailure}) => (
  <Modal show>
    <div className="update-pic-form">
      <div className="message">
        <span>Modifying Pic</span>
        <img alt="" src={picUrl} />
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

UpdatePicModal.propTypes = {
  picUrl: PropTypes.string.isRequired,
  requestUrl: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

export default UpdatePicModal;
