const defaultState = {
  activitiesUndertaken: []
};

const activities = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_ACTIVITIES_UNDERTAKEN':
      return {
        activitiesUndertaken: action.activitiesUndertaken
      };

    default:
      return state;
  }
};

export default activities;
