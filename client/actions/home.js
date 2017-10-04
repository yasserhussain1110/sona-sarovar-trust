export const receivedHomePageContent = homePage => (
  {
    type: 'RECEIVED_HOME_PAGE_CONTENT',
    homePage
  }
);

export const updatedBrandLogoUrl = brandLogoUrl => (
  {
    type: 'UPDATED_BRAND_LOGO_URL',
    brandLogoUrl
  }
);

export const updatedCenterPic = (centerPicIndex, centerPicUrl) => (
  {
    type: 'UPDATED_CENTER_PIC',
    centerPicIndex,
    centerPicUrl
  }
);

export const addedCenterPic = centerPic => (
  {
    type: 'ADDED_CENTER_PIC',
    centerPic
  }
);

export const deletedCenterPic = centerPicIndex => (
  {
    type: 'DELETED_CENTER_PIC',
    centerPicIndex
  }
);

export const updatedCenterPicCaption = (captionIndex, captionText) => (
  {
    type: 'UPDATED_CENTER_PIC_CAPTION',
    captionText,
    captionIndex
  }
);

export const addedCenterPicCaption = caption => (
  {
    type: 'ADDED_CENTER_PIC_CAPTION',
    caption
  }
);

export const deletedCenterPicCaption = captionIndex => (
  {
    type: 'DELETED_CENTER_PIC_CAPTION',
    captionIndex
  }
);

export const updatedMainTextPara1 = mainTextPara1 => (
  {
    type: 'UPDATED_MAIN_TEXT_PARA1',
    mainTextPara1
  }
);

export const updatedMainTextPara2 = mainTextPara2 => (
  {
    type: 'UPDATED_MAIN_TEXT_PARA2',
    mainTextPara2
  }
);
