const defaultState = {
  teamMembers: []
};

const about = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_TEAM_MEMBERS':
      return Object.assign({}, state, {
        teamMembers: action.teamMembers
      });

    default:
      return state;
  }
};

export default about;
