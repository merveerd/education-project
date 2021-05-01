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

const respondCreateStudentGroup = (response, status, dispatch) => {
  if (status) {
    Alert.alert('Good!', 'You have started something!');
    let newGroup = {...response.data};
    dispatch({
      type: GROUP_ADD_SUCCESS,
      payload: newGroup,
    });
  } else {
    console.log('Student group has not been added: ', err);
    dispatch({
      type: GROUP_ADD_FAILED,
    });
  }
};
export const createStudentGroup = params => {
  return dispatch => {
    dispatch({type: GROUP_GET_START});
    //add in
    post(
      BASE_URL.concat('/group'),
      respondCreateStudentGroup,
      dispatch,
      params,
    );
  };
};

const respondGetStudentGroup = (response, status, dispatch) => {
  if (status) {
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
export const getStudentGroup = param => {
  return dispatch => {
    dispatch({type: GROUP_GET_START});
    //param should contain groupIds of the user in array format
    get(BASE_URL.concat(`/group`), respondGetStudentGroup, dispatch, param);
  };
};
const respondUpdateStudentGroup = (response, status, dispatch) => {
  if (status) {
    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: response.data,
    });

    Alert.alert(
      'Good!',
      'You added your Student to the Group!',
      [
        {
          text: 'Nice',
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
    console.log('Error on updateStudentGroup: ', response);
  }
};

export const updateStudentGroup = param => {
  //param should contain Studentgroup id
  return dispatch => {
    dispatch({type: GROUP_GET_START});
    patch(
      BASE_URL.concat(`/group/${param.id}`),
      respondUpdateStudentGroup,
      dispatch,
      param,
    );
  };
};
