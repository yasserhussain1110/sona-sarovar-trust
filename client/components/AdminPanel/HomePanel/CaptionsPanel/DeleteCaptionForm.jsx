import React from 'react';
import axios from 'axios';

const DeleteCaptionForm = ({caption, authToken, onSuccess, close}) => (
  <div className="delete-caption-form">
    <span>Are you sure you want to delete this caption?</span>
    <span className="caption-text">{caption.text}</span>
    <div className="button-holder">
      <button onClick={e => deleteCaption(caption._id, onSuccess, authToken)}>Yes</button>
      <button onClick={close}>No</button>
    </div>
  </div>
);

const deleteCaption = (_id, onSuccess, authToken) => {
  axios.delete(`/api/home-page/caption/${_id}`, {headers: {'x-auth': authToken}})
    .then(res => {
      onSuccess();
    })
    .catch(err => {
      console.log(err);
    });
};

export default DeleteCaptionForm;