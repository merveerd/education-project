import {Alert} from 'react-native';
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
import * as RootNavigation from '../RootNavigation';

export const respondGetUsersByLocation = (response, dispatch) => {
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
      respondGetUsersByLocation,
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
    });

    console.log('after dispatch');
    Alert.alert(
      'Done!',
      "You've deleted the user",
      [
        {
          text: 'Done',
          onPress: () => RootNavigation.pop(),
        },
      ],
      {
        cancelable: false,
      },
    );
  } else {
    dispatch({
      type: DELETE_USER_FAILED,
    });
  }
};

export const deleteUser = id => {
  //only admin
  console.log('delete');
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
    if (response.data && response.data.data) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data.data,
      });
      console.log('Alert öncesi');
      Alert.alert(
        'Done!',
        "You've updated the user",
        [
          {
            text: 'Done',
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  } else {
    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};

export const updateUser = ({id, updated}) => {
  //only admin for privileges etc
  return dispatch => {
    console.log(id, updated);
    dispatch({
      type: UPDATE_USER_START,
    });
    patch(BASE_URL.concat(`/user/${id}`), respondUpdateUser, dispatch, updated);
  };
};
