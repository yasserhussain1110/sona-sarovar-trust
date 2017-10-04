import {updateSingleObjectInArray} from '../lib/helpers/functions';

const defaultState = {
  activitiesUndertaken: []
};

const activities = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_ACTIVITIES_UNDERTAKEN':
      return {
        activitiesUndertaken: action.activitiesUndertaken
      };
    case 'ADDED_ACTIVITY_UNDERTAKEN':
      return {
        activitiesUndertaken: [
          ...state.activitiesUndertaken,
          action.activityUndertaken
        ]
      };
    case 'DELETED_ACTIVITY_UNDERTAKEN':
      return {
        activitiesUndertaken: [
          ...state.activitiesUndertaken.slice(0, action.activityIndex),
          ...state.activitiesUndertaken.slice(action.activityIndex + 1)
        ]
      };
    case 'UPDATED_ACTIVITY_NAME_AND_DESCRIPTION':
      return {
        activitiesUndertaken: updateSingleObjectInArray(
          state.activitiesUndertaken, action.index,
          activity => {
            activity.name = action.name;
            activity.description = action.description;
          })
      };
    case 'ADDED_PIC_TO_ACTIVITY':
      return {
        activitiesUndertaken: updateSingleObjectInArray(state.activitiesUndertaken, action.index,
          activity => {
            activity.pics = updateSingleObjectInArray(activity.pics, activity.pics.length,
              picElement => Object.assign(picElement, action.pic));
          })
      };
    case 'DELETED_PIC_FROM_ACTIVITY':
      return {
        activitiesUndertaken: updateSingleObjectInArray(state.activitiesUndertaken,
          action.activityIndex, activity => {
            activity.pics = activity.pics.filter(pic => pic !== action.pic);
          })
      };
    case 'UPDATED_ACTIVITY_PIC':
      const selectedActivity = state.activitiesUndertaken[action.activityIndex];
      const picIndex = selectedActivity.pics.findIndex(pic => pic._id === action.picId);
      return {
        activitiesUndertaken: updateSingleObjectInArray(state.activitiesUndertaken,
          action.activityIndex,
          activity => {
            activity.pics = updateSingleObjectInArray(activity.pics, picIndex, pic => {
              pic.url = action.url;
            });
          })
      };
    default:
      return state;
  }
};

export default activities;
