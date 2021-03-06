import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import post from './post';
import profile from './profile';
import worker from './worker';
import userType from './userType';

const rootReducer = combineReducers({
  auth,
  alert,
  post,
  profile,
  worker,
  userType
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>