export const logIn = authToken => {
  return {
    type: 'LOGGED_IN',
    authToken
  }
};

export const logOff = () => {
  return {
    type: 'LOGGED_OFF'
  }
};
