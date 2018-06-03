import {combineReducers} from 'redux';
import home from './home';
import aboutUs from './aboutUs';
import team from './team';
import projects from './projects';
import activities from './activities';
import userAuth from './userAuth';
import testimonials from './testimonials';
import awards from './awards';

const reducers = combineReducers({
  home,
  aboutUs,
  team,
  projects,
  activities,
  userAuth,
  testimonials,
  awards
});

export default reducers;
