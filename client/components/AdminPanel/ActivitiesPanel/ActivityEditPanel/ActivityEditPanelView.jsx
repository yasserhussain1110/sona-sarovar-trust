import React from 'react';
import PropTypes from 'prop-types';
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
    <StatusPanel statusBoxToAdd={statusBoxToAdd} />
    {
      getModalContent(
        updatingPic, deletingPic, selectedPic, closeModal, authToken,
        updatedActivityPic, updateActivityPicFailed, deletedActivityPic,
        deleteActivityPicFailed)
    }
  </div>
);

const getModalContent = (
  updatingPic, deletingPic, selectedPic, closeModal, authToken,
  updatedActivityPic, updateActivityPicFailed, deletedActivityPic,
  deleteActivityPicFailed
) => {
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

ActivityEditPanelView.defaultProps = {
  statusBoxToAdd: null,
  selectedPic: null
};

ActivityEditPanelView.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pics: PropTypes.arrayOf(PropTypes.object).isRequired,
  nameError: PropTypes.string.isRequired,
  descriptionError: PropTypes.string.isRequired,
  updateStateField: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  updatingPic: PropTypes.bool.isRequired,
  deletingPic: PropTypes.bool.isRequired,
  updatePic: PropTypes.func.isRequired,
  deletePic: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  updatedActivityPic: PropTypes.func.isRequired,
  updateActivityPicFailed: PropTypes.func.isRequired,
  deletedActivityPic: PropTypes.func.isRequired,
  deleteActivityPicFailed: PropTypes.func.isRequired,
  statusBoxToAdd: PropTypes.element,
  selectedPic: PropTypes.object
};

export default ActivityEditPanelView;
