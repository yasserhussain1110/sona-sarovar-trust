const defaultState = {
  projectsDone: []
};

const projects = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_PROJECTS_DONE':
      return {
        projectsDone: action.projectsDone
      };

    default:
      return state;
  }
};

export default projects;
