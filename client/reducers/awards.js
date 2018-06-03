export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVED_AWARDS':
      return action.awards;
    default:
      return state;
  }
};
