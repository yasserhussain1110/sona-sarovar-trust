export const receivedActivitiesUndertaken = activitiesUndertaken => (
  {
    type: "RECEIVED_ACTIVITIES_UNDERTAKEN",
    activitiesUndertaken
  }
);

export const addedActivityUnderTaken = activityUndertaken => ({
  type: "ADDED_ACTIVITY_UNDERTAKEN",
  activityUndertaken
});

export const updatedActivityNameAndDescription = (name, description, index) => ({
  type: "UPDATED_ACTIVITY_NAME_AND_DESCRIPTION",
  name,
  description,
  index
});

export const addedPicToActivity = (pic, index) => ({
  type: "ADDED_PIC_TO_ACTIVITY",
  pic,
  index
});

export const updatedActivityPic = (activityIndex, picId, url) => ({
  type: "UPDATED_ACTIVITY_PIC",
  activityIndex,
  picId,
  url
});
