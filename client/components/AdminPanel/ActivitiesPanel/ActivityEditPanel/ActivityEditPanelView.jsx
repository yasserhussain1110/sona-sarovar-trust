import React from 'react';
import ActivityEditForm from './ActivityEditForm';
import UpdatePicModal from '../../../../lib/components/UpdatePicModal';
import DeletePicModal from '../../../../lib/components/DeletePicModal';
import StatusPanel from '../../../../lib/components/StatusPanel';

const ActivityEditPanelView = ({
                                name, description, pics, nameError,
                                descriptionError, updateStateField, updateActivity,
                                statusBoxToAdd, updatingPic, deletingPic, selectedPic,
                                updatePic, deletePic, closeModal, authToken,
                                updatedActivityPic, updateActivityPicFailed,
                                deletedActivityPic, deleteActivityPicFailed
                              }) => (
  <div className="project-edit-panel">
    <h2>Edit Activity</h2>
    <ActivityEditForm
      name={name}
      description={description}
      pics={pics}
      nameError={nameError}
      descriptionError={descriptionError}
      updateStateField={updateStateField}
      updateActivity={updateActivity}
      updatePic={updatePic}
      deletePic={deletePic}
    />
    <StatusPanel statusBoxToAdd={statusBoxToAdd}/>
    {
      getModalContent(
        updatingPic, deletingPic, selectedPic, closeModal, authToken,
        updatedActivityPic, updateActivityPicFailed, deletedActivityPic,
        deleteActivityPicFailed)
    }
  </div>
);

const getModalContent = (updatingPic, deletingPic, selectedPic, closeModal, authToken,
                         updatedActivityPic, updateActivityPicFailed, deletedActivityPic,
                         deleteActivityPicFailed) => {
  if (updatingPic) {
    return (
      <UpdatePicModal
        picUrl={selectedPic.url}
        requestUrl={`/api/activity/pic/${selectedPic._id}`}
        selectedPic={selectedPic}
        closeModal={closeModal}
        authToken={authToken}
        onSuccess={updatedActivityPic}
        onFailure={updateActivityPicFailed}
      />
    );
  } else if (deletingPic) {
    return (
      <DeletePicModal
        picUrl={selectedPic.url}
        requestUrl={`/api/activity/pic/${selectedPic._id}`}
        closeModal={closeModal}
        authToken={authToken}
        onSuccess={deletedActivityPic}
        onFailure={deleteActivityPicFailed}
      />
    );
  } else {
    return null;
  }
};

export default ActivityEditPanelView;
