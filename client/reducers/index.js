import {combineReducers} from 'redux';
import about from './about';
import home from './home';
import projects from './projects';
import activities from './activities';
import userAuth from './userAuth';

const reducers = combineReducers({
  about,
  home,
  projects,
  activities,
  userAuth
});

export default reducers;
