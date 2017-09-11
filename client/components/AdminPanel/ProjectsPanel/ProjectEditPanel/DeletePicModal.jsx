import React from 'react';
import Modal from '../../../../lib/components/Modal';
import axios from 'axios';
import handleCommonErrors from '../../../../lib/handlers/commonErrorsHandler';

const DeletePicModal = ({selectedPic, closeModal, authToken, deletedProjectPic, deleteProjectPicFailed}) => (
  <Modal show={true}>
    <div className="delete-pic-form">
      <div className="message">
        <span>Deleting Pic</span>
        <img src={selectedPic.url}/>
      </div>

      <div className="action">
        <span>Are you sure you want to delete this pic?</span>
        <div className="button-holder">
          <button
            onClick={() => deletePic(
              selectedPic._id, authToken,
              deletedProjectPic, deleteProjectPicFailed
            )}
            className="yes">Yes
          </button>
          <button onClick={closeModal} className="no">No</button>
        </div>
      </div>
    </div>
  </Modal>
);

const deletePic = (selectedPicId, authToken, deletedProjectPic, deleteProjectPicFailed) => {
  axios.delete(`/api/project/pic/${selectedPicId}`, {
    headers: {'x-auth': authToken}
  }).then(() => {
    deletedProjectPic();
  }).catch(err => {
    handleCommonErrors(err);
    deleteProjectPicFailed();
    console.log(err);
  })
};

export default DeletePicModal;
