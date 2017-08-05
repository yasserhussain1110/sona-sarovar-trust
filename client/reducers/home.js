const defaultState = {
  centerPics: [],
  captions: [],
  mainTextPara1: "",
  mainTextPara2: ""
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_CENTER_PICS':
      return {
        ...state,
        centerPics: action.centerPics
      };
    case 'RECEIVED_CENTER_PIC_CAPTIONS':
      return {
        ...state,
        captions: action.captions
      };
    case 'RECEIVED_MAIN_TEXTS':
      return {
        ...state,
        mainTextPara1: action.mainTextPara1,
        mainTextPara2: action.mainTextPara2
      };
    default:
      return state;
  }
};

export default home;
