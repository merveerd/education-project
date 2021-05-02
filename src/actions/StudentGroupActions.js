import {
  GROUP_GET_START,
  GROUP_ADD_SUCCESS,
  GROUP_ADD_FAILED,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILED,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
  BASE_URL,
} from './types';

import {Alert} from 'react-native';
import {post, get, patch} from '../helpers/APIService';
import * as RootNavigation from '../RootNavigation';
//Needs to be all checked, they are all here for reference
const respondCreateStudentGroup = (response, dispatch) => {
  if (response.status < 400) {
    Alert.alert('Done!', "You've created a class");
    let newGroup = {...response.data};
    dispatch({
      type: GROUP_ADD_SUCCESS,
      payload: newGroup,
    });
  } else {
    dispatch({
      type: GROUP_ADD_FAILED,
    });
  }
};
export const createStudentGroup = params => {
  return dispatch => {
    dispatch({type: GROUP_GET_START});
    post(
      BASE_URL.concat('/group'),
      respondCreateStudentGroup,
      dispatch,
      params,
    );
  };
};

const respondGetStudentGroup = (response, dispatch) => {
  if (response.status < 400) {
    dispatch({
      type: GROUP_GET_SUCCESS,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GROUP_GET_FAILED,
    });
  }
};
export const getStudentGroup = groupId => {
  return dispatch => {
    dispatch({type: GROUP_GET_START});
    get(BASE_URL.concat(`/group/${groupId}`), respondGetStudentGroup, dispatch);
  };
};
const respondUpdateStudentGroup = (response, dispatch) => {
  if (response.status < 400) {
    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: response.data,
    });

    Alert.alert(
      'Done!',
      "You've added the student to the class!",
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
      type: GROUP_UPDATE_FAILED,
    });
  }
};

export const updateStudentGroup = groupId => {
  return dispatch => {
    dispatch({type: GROUP_GET_START});
    patch(
      BASE_URL.concat(`/group/${groupId}`),
      respondUpdateStudentGroup,
      dispatch,
      param,
    );
  };
};
