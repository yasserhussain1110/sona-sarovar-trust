import React from 'react';
import Modal from '../../../../lib/components/Modal';
import PicForm from '../../../../lib/components/PicForm';

const UpdatePicModal = ({selectedPic, closeModal, authToken, updatedProjectPic, updateProjectPicFailed}) => (
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
        onSuccess={updatedProjectPic}
        onFailure={updateProjectPicFailed}
      />
    </div>
  </Modal>
);

export default UpdatePicModal;
