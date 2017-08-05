export const receivedCenterPics = centerPics => (
  {
    type: "RECEIVED_CENTER_PICS",
    centerPics
  }
);

export const receivedCenterPicCaptions = captions => (
  {
    type: "RECEIVED_CENTER_PIC_CAPTIONS",
    captions
  }
);

export const receivedMainTexts = (mainTextPara1, mainTextPara2) => (
  {
    type: "RECEIVED_MAIN_TEXTS",
    mainTextPara1,
    mainTextPara2
  }
);
