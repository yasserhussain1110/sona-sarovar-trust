const defaultState = {
  centerPics: [],
  captions: [],
  brandLogoUrl: ""
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_HOME_PAGE_CONTENT':
      return {
        ...state,
        ...action.homePage
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
    case 'UPDATED_BRAND_LOGO_URL':
      return {
        ...state,
        brandLogoUrl: action.brandLogoUrl
      };
    default:
      return state;
  }
};

export default home;
