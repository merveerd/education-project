import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ActiveCourseReducer from './ActiveCourseReducer';
import UsersReducer from './UsersReducer';
import StudentGroupReducer from './StudentGroupReducer';

export default combineReducers({
  authResponse: AuthReducer,
  activeCourseResponse: ActiveCourseReducer,
  usersResponse: UsersReducer,
  studentGroupResponse: StudentGroupReducer,
});
