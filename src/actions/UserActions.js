import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER_COUNT_START,
  GET_USER_COUNT_SUCCESS,
  GET_USER_COUNT_FAILED,
  BASE_URL,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from './types';

import {get, patch, deleteOne} from '../helpers/APIService';

export const respondGetUserssByLocation = (response, dispatch) => {
  if (response.status < 400) {
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: GET_USERS_FAILED,
    });
  }
};

export const getUsersByLocation = city => {
  //only admin
  return dispatch => {
    dispatch({
      type: GET_USERS_START,
    });
    get(
      BASE_URL.concat(`/user/location/${city}`),
      respondGetUserssByLocation,
      dispatch,
    );
  };
};

export const respondGetUserCount = (response, dispatch) => {
  if (response.status < 400) {
    dispatch({
      type: GET_USER_COUNT_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: GET_USER_COUNT_FAILED,
    });
  }
};

export const getUserCount = () => {
  //only admin
  return dispatch => {
    dispatch({
      type: GET_USER_COUNT_START,
    });
    get(BASE_URL.concat('/user/count'), respondGetUserCount, dispatch);
  };
};

export const respondDeleteUser = (response, dispatch) => {
  if (response.status < 400) {
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: DELETE_USER_FAILED,
    });
  }
};

export const deleteUser = id => {
  //only admin
  return dispatch => {
    dispatch({
      type: DELETE_USER_START,
    });
    deleteOne(BASE_URL.concat(`/user/${id}`), respondDeleteUser, dispatch);
  };
};

export const respondUpdateUser = (response, dispatch) => {
  //Needs to be checked if it is working correctly
  if (response.status < 400) {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};

export const updateUser = id => {
  //only admin for privileges etc
  return dispatch => {
    dispatch({
      type: UPDATE_USER_START,
    });
    patch(BASE_URL.concat(`/user/${id}`), respondUpdateUser, dispatch);
  };
};
