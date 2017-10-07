export const receivedProjectsDone = projectsDone => ({
  type: 'RECEIVED_PROJECTS_DONE',
  projectsDone
});

export const addedProjectDone = projectDone => ({
  type: 'ADDED_PROJECT_DONE',
  projectDone
});

export const deletedProjectDone = projectIndex => ({
  type: 'DELETED_PROJECT_DONE',
  projectIndex
});

export const updatedProjectNameAndDescription = (name, description, projectIndex) => ({
  type: 'UPDATED_PROJECT_NAME_AND_DESCRIPTION',
  name,
  description,
  projectIndex
});

export const addedPicToProject = (pic, projectIndex) => ({
  type: 'ADDED_PIC_TO_PROJECT',
  pic,
  projectIndex
});

export const deletedPicFromProject = (pic, projectIndex) => ({
  type: 'DELETED_PIC_FROM_PROJECT',
  pic,
  projectIndex
});

export const updatedProjectPic = (projectIndex, picId, url) => ({
  type: 'UPDATED_PROJECT_PIC',
  projectIndex,
  picId,
  url
});
