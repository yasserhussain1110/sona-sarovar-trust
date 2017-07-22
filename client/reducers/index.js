import {combineReducers} from 'redux';
import about from './about';
import home from './home';
import projects from './projects';
import userAuth from './userAuth';

const reducers = combineReducers({
  about,
  home,
  projects,
  userAuth
});

export default reducers;
