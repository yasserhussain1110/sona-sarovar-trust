import React from 'react';
import Modal from './Modal';
import axios from 'axios';
import handleCommonErrors from '../handlers/commonErrorsHandler';

const DeletePicModal = ({selectedPic, closeModal, authToken, onSuccess, onFailure}) => (
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
              onSuccess, onFailure
            )}
            className="yes">Yes
          </button>
          <button onClick={closeModal} className="no">No</button>
        </div>
      </div>
    </div>
  </Modal>
);

const deletePic = (selectedPicId, authToken, onSuccess, onFailure) => {
  axios.delete(`/api/project/pic/${selectedPicId}`, {
    headers: {'x-auth': authToken}
  }).then(() => {
    onSuccess();
  }).catch(err => {
    handleCommonErrors(err);
    onFailure();
    console.log(err);
  })
};

export default DeletePicModal;
