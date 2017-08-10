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
    case 'ADDED_CENTER_PIC':
      return {
        ...state,
        centerPics: [...state.centerPics, action.centerPic]
      };
    case 'DELETED_CENTER_PIC': {
      return {
        ...state,
        centerPics: [
          ...state.centerPics.slice(0, action.centerPicIndex),
          ...state.centerPics.slice(action.centerPicIndex + 1)
        ]
      };
    }
    case 'UPDATED_CENTER_PIC':
      return {
        ...state,
        centerPics: [
          ...state.centerPics.slice(0, action.centerPicIndex),
          {
            ...state.centerPics[action.centerPicIndex],
            url: action.centerPicUrl
          },
          ...state.centerPics.slice(action.centerPicIndex + 1)
        ]
      };
    case 'RECEIVED_CENTER_PIC_CAPTIONS':
      return {
        ...state,
        captions: action.captions
      };
    case 'UPDATED_CENTER_PIC_CAPTION':
      return {
        ...state,
        captions: [
          ...state.captions.slice(0, action.captionIndex),
          {
            ...state.captions[action.captionIndex],
            text: action.captionText
          },
          ...state.captions.slice(action.captionIndex + 1)
        ]
      };
    case 'DELETED_CENTER_PIC_CAPTION':
      return {
        ...state,
        captions: [
          ...state.captions.slice(0, action.captionIndex),
          ...state.captions.slice(action.captionIndex + 1)
        ]
      };
    case 'ADDED_CENTER_PIC_CAPTION':
      return {
        ...state,
        captions: [...state.captions, action.caption]
      };
    case 'RECEIVED_MAIN_TEXTS':
      return {
        ...state,
        mainTextPara1: action.mainTextPara1,
        mainTextPara2: action.mainTextPara2
      };
    case 'UPDATED_MAIN_TEXT_PARA1':
      return {
        ...state,
        mainTextPara1: action.mainTextPara1
      };
    case 'UPDATED_MAIN_TEXT_PARA2':
      return {
        ...state,
        mainTextPara2: action.mainTextPara2
      };
    default:
      return state;
  }
};

export default home;
