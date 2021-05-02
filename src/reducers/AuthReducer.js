import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGN_OUT_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  REMOVE_USER_START,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED,
  GET_PERSONAL_COURSES_START,
  GET_PERSONAL_COURSES_SUCCESS,
  GET_PERSONAL_COURSES_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
      };

    case UPDATE_PROFILE_START:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
      };

    case REMOVE_USER_START:
      return {
        ...state,
        loadingUser: true,
      };

    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        user: null,
      };

    case REMOVE_USER_FAILED:
      return {
        ...state,
        loadingUser: false,
      };
    case GET_PERSONAL_COURSES_START:
      return {
        ...state,
        loadingUser: true,
      };

    case GET_PERSONAL_COURSES_SUCCESS:
      let updatedUser = {...state.user};
      updatedUser.courses = action.payload; //suppose to get these courses in login request
      return {
        ...state,
        loadingUser: false,
        user: updatedUser,
      };

    case GET_PERSONAL_COURSES_FAILED:
      return {
        ...state,
        loadingUser: false,
      };
    default:
      return state;
  }
};
export const getPersonalCourseCount = state => {
  if (state.user.courses) {
    return state.user.courses.length;
  } else {
    return 0;
  }
};
