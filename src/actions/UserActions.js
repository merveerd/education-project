import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  BASE_URL,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from './types';

import {get, patch, deleteOne} from '../helpers/APIService';

export const respondGetUsers = (response, dispatch) => {
  if (response.status < 300) {
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GET_USERS_FAILED,
    });
  }
};

export const getUsers = () => {
  //only admin
  return dispatch => {
    dispatch({
      type: GET_USERS_START,
    });
    get(BASE_URL.concat('/user'), respondGetUsers, dispatch);
  };
};

export const respondDeleteUser = (response, dispatch) => {
  if (response.status < 300) {
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: response.data,
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
  if (response.status < 300) {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
  } else {
    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};

export const updateUser = id => {
  //only admin
  return dispatch => {
    dispatch({
      type: UPDATE_USER_START,
    });
    patch(BASE_URL.concat(`/user/${id}`), respondUpdateUser, dispatch);
  };
};
