import React from 'react';
import ProjectEditForm from './ProjectEditForm';
import UpdatePicModal from '../../../../lib/components/UpdatePicModal';
import DeletePicModal from '../../../../lib/components/DeletePicModal';
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
        picUrl={selectedPic.url}
        requestUrl={`/api/project/pic/${selectedPic._id}`}
        closeModal={closeModal}
        authToken={authToken}
        onSuccess={updatedProjectPic}
        onFailure={updateProjectPicFailed}
      />
    );
  } else if (deletingPic) {
    return (
      <DeletePicModal
        picUrl={selectedPic.url}
        requestUrl={`/api/project/pic/${selectedPic._id}`}
        closeModal={closeModal}
        authToken={authToken}
        onSuccess={deletedProjectPic}
        onFailure={deleteProjectPicFailed}
      />
    );
  } else {
    return null;
  }
};

export default ProjectEditPanelView;
