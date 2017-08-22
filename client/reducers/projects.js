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
    case 'UPDATED_PROJECT_NAME_AND_DESCRIPTION':
      return {
        projectsDone: [
          ...state.projectsDone.slice(0, action.index),
          {
            ...state.projectsDone[action.index],
            name: action.name,
            description: action.description
          },
          ...state.projectsDone.slice(action.index + 1)
        ]
      };
    case 'ADDED_PIC_TO_PROJECT':
      return {
        projectsDone: [
          ...state.projectsDone.slice(0, action.index),
          {
            ...state.projectsDone[action.index],
            pics: [
              ...state.projectsDone[action.index].pics,
              action.pic
            ]
          },
          ...state.projectsDone.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
};

export default projects;
