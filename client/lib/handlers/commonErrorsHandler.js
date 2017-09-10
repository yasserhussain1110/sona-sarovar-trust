import {logOut as logOutAction} from '../../actions';

let dispatch = () => (console.log("Used initial dispatch function"));

const logOut = () => {
  localStorage.removeItem("auth-token");
  dispatch(logOutAction());
};

const handleCommonErrors = e => {
  if (e.response.status === 401) {
    logOut();
  }
};

const initializeHandler = storeDispatch => {
  dispatch = storeDispatch;
};

export {initializeHandler, logOut};
export default handleCommonErrors;
