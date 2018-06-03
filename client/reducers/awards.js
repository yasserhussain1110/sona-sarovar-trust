export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVED_AWARDS':
      return action.awards;
    case 'ADDED_AWARD':
      return [
        ...state,
        action.award
      ];
    case 'DELETED_AWARD':
      return state.filter(award => award._id !== action.awardId);
    default:
      return state;
  }
};
