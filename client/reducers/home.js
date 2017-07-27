const defaultState = {
  centerPics: [],
  captions: [],
  mainTexts: []
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_CENTER_PICS':
      return {
        centerPics: action.centerPics
      };
    case 'RECEIVED_CENTER_PIC_CAPTIONS':
      return {
        captions: action.captions
      };
    case 'RECEIVED_MAIN_TEXTS':
      return {
        mainTexts: action.mainTexts
      };
    default:
      return state;
  }
};

export default home;
