const defaultState = {
  loggedIn: false,
  authToken: null
};

const userAuth = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        loggedIn: true,
        authToken: action.authToken
      };

    case 'LOGGED_OUT':
      return {
        loggedIn: false,
        authToken: null
      };

    default:
      return state;
  }
};

export default userAuth;
