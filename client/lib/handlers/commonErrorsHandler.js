import {logOut} from '../../actions';

let dispatch = () => (console.log("Used initial dispatch function"));

const handleCommonErrors = e => {
  if (e.response.status === 401) {
    localStorage.removeItem("auth-token");
    dispatch(logOut());
  }
};

const initializeHandler = storeDispatch => {
  dispatch = storeDispatch;
};

export {initializeHandler};
export default handleCommonErrors;
