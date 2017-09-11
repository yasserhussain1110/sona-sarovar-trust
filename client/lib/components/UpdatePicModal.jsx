import React from 'react';
import Modal from './Modal';
import PicForm from './PicForm';

const UpdatePicModal = ({selectedPic, closeModal, authToken, onSuccess, onFailure}) => (
  <Modal show={true}>
    <div className="update-pic-form">
      <div className="message">
        <span>Modifying Pic</span>
        <img src={selectedPic.url}/>
      </div>
      <PicForm
        close={closeModal}
        authToken={authToken}
        mode="update"
        url={`/api/project/pic/${selectedPic._id}`}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  </Modal>
);

export default UpdatePicModal;
