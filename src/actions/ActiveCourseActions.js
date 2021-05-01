import {
  GET_ACTIVE_COURSES_START,
  GET_ACTIVE_COURSES_SUCCESS,
  GET_ACTIVE_COURSES_FAILED,
  BASE_URL,
} from './types';

import {get} from '../helpers/APIService';

export const respondGetUserCourses = (response, dispatch) => {
  if (response.status < 300) {
  
    dispatch({
      type: GET_ACTIVE_COURSES_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: GET_ACTIVE_COURSES_FAILED,
    });
  }
};

export const getUserCoursesByType = () => {
  //only admin
  return dispatch => {
    dispatch({
      type: GET_ACTIVE_COURSES_START,
    });

    get(BASE_URL.concat('/usercourse/'), respondGetUserCourses, dispatch);
  };
};
