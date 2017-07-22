const defaultState = {
  centerPics: [],
  captions: [],
  mainTexts: []
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_CENTER_PICS':
      return Object.assign({}, state, {
        centerPics: action.centerPics
      });
    case 'RECEIVED_CENTER_PIC_CAPTIONS':
      return Object.assign({}, state, {
        captions: action.captions
      });
    case 'RECEIVED_MAIN_TEXTS':
      return Object.assign({}, state, {
        mainTexts: action.mainTexts
      });
    default:
      return state;
  }
};

export default home;
