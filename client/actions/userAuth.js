export const logIn = authToken => (
  {
    type: 'LOGGED_IN',
    authToken
  }
);

export const logOut = () => (
  {
    type: 'LOGGED_OUT'
  }
);
