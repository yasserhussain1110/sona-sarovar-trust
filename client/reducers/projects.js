import {updateSingleObjectInArray} from '../lib/helpers/functions';

const defaultState = {
  projectsDone: []
};

const projects = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_PROJECTS_DONE':
      return {
        projectsDone: action.projectsDone
      };
    case 'ADDED_PROJECT_DONE':
      return {
        projectsDone: [
          ...state.projectsDone,
          action.projectDone
        ]
      };
    case 'DELETED_PROJECT_DONE':
      return {
        projectsDone: [
          ...state.projectsDone.slice(0, action.projectIndex),
          ...state.projectsDone.slice(action.projectIndex + 1)
        ]
      };
    case 'UPDATED_PROJECT_NAME_AND_DESCRIPTION':
      return {
        projectsDone: updateSingleObjectInArray(
          state.projectsDone,
          action.projectIndex,
          project => {
            project.name = action.name;
            project.description = action.description;
          })
      };
    case 'ADDED_PIC_TO_PROJECT':
      return {
        projectsDone: updateSingleObjectInArray(state.projectsDone, action.projectIndex, project => {
          project.pics = updateSingleObjectInArray(project.pics, project.pics.length,
            picElement => Object.assign(picElement, action.pic));
        })
      };
    case 'DELETED_PIC_FROM_PROJECT':
      return {
        projectsDone: updateSingleObjectInArray(state.projectsDone, action.projectIndex, project => {
          project.pics = project.pics.filter(pic => pic !== action.pic);
        })
      };
    case 'UPDATED_PROJECT_PIC': {
      const selectedProject = state.projectsDone[action.projectIndex];
      const picIndex = selectedProject.pics.findIndex(pic => pic._id === action.picId);
      return {
        projectsDone: updateSingleObjectInArray(state.projectsDone, action.projectIndex,
          project => {
            project.pics = updateSingleObjectInArray(project.pics, picIndex, pic => {
              pic.url = action.url;
            });
          })
      };
    }
    default:
      return state;
  }
};

export default projects;
