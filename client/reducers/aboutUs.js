const defaultState = {
  mission: '',
  vision: '',
  history: ''
};

const team = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_ABOUT_US':
      return {
        vision: action.aboutUs.vision,
        mission: action.aboutUs.mission,
        history: action.aboutUs.history
      };
    case 'UPDATED_VISION':
      return {
        ...state,
        vision: action.vision
      };
    case 'UPDATED_MISSION':
      return {
        ...state,
        mission: action.mission
      };
    case 'UPDATED_HISTORY':
      return {
        ...state,
        history: action.history
      };
    default:
      return state;
  }
};

export default team;
