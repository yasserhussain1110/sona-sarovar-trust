export const logIn = authToken => {
  return {
    type: 'LOGGED_IN',
    authToken
  }
};

export const logOut = () => {
  return {
    type: 'LOGGED_OUT'
  }
};
