import React from 'react';
import ProjectEditForm from './ProjectEditForm';
import UpdatePicModal from './UpdatePicModal';
import DeletePicModal from './DeletePicModal';
import StatusPanel from '../../../../lib/components/StatusPanel';

const ProjectEditPanelView = ({
                                name, description, pics, nameError,
                                descriptionError, updateStateField, updateProject,
                                statusBoxToAdd, updatingPic, deletingPic, selectedPic,
                                updatePic, deletePic, closeModal, authToken,
                                updatedProjectPic, updateProjectPicFailed,
                                deletedProjectPic, deleteProjectPicFailed
                              }) => (
  <div className="project-edit-panel">
    <h2>Edit Project</h2>
    <ProjectEditForm
      name={name}
      description={description}
      pics={pics}
      nameError={nameError}
      descriptionError={descriptionError}
      updateStateField={updateStateField}
      updateProject={updateProject}
      updatePic={updatePic}
      deletePic={deletePic}
    />
    <StatusPanel statusBoxToAdd={statusBoxToAdd}/>
    {
      getModalContent(
        updatingPic, deletingPic, selectedPic, closeModal, authToken,
        updatedProjectPic, updateProjectPicFailed, deletedProjectPic,
        deleteProjectPicFailed)
    }
  </div>
);

const getModalContent = (updatingPic, deletingPic, selectedPic, closeModal, authToken,
                         updatedProjectPic, updateProjectPicFailed, deletedProjectPic,
                         deleteProjectPicFailed) => {
  if (updatingPic) {
    return (
      <UpdatePicModal
        selectedPic={selectedPic}
        closeModal={closeModal}
        authToken={authToken}
        updatedProjectPic={updatedProjectPic}
        updateProjectPicFailed={updateProjectPicFailed}
      />
    );
  } else if (deletingPic) {
    return (
      <DeletePicModal
        selectedPic={selectedPic}
        closeModal={closeModal}
        authToken={authToken}
        deletedProjectPic={deletedProjectPic}
        deleteProjectPicFailed={deleteProjectPicFailed}
      />
    );
  } else {
    return null;
  }
};

export default ProjectEditPanelView;
