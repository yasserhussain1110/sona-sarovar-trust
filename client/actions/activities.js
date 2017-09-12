export const receivedActivitiesUndertaken = activitiesUndertaken => (
  {
    type: "RECEIVED_ACTIVITIES_UNDERTAKEN",
    activitiesUndertaken
  }
);

export const addedActivityUndertaken = activityUndertaken => ({
  type: "ADDED_ACTIVITY_UNDERTAKEN",
  activityUndertaken
});

export const deletedActivityUndertaken = activityIndex => ({
  type: "DELETED_ACTIVITY_UNDERTAKEN",
  activityIndex
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

export const deletedPicFromActivity = (pic, activityIndex) => ({
  type: "DELETED_PIC_FROM_ACTIVITY",
  pic,
  activityIndex
});

export const updatedActivityPic = (activityIndex, picId, url) => ({
  type: "UPDATED_ACTIVITY_PIC",
  activityIndex,
  picId,
  url
});
