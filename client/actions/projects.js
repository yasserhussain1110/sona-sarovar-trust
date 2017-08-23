export const receivedProjectsDone = projectsDone => ({
  type: "RECEIVED_PROJECTS_DONE",
  projectsDone
});

export const addedProjectDone = projectDone => ({
  type: "ADDED_PROJECT_DONE",
  projectDone
});

export const updatedProjectNameAndDescription = (name, description, index) => ({
  type: "UPDATED_PROJECT_NAME_AND_DESCRIPTION",
  name,
  description,
  index
});

export const addedPicToProject = (pic, index) => ({
  type: "ADDED_PIC_TO_PROJECT",
  pic,
  index
});

export const updatedProjectPic = (projectIndex, picId, url) => ({
  type: "UPDATED_PROJECT_PIC",
  projectIndex,
  picId,
  url
});
