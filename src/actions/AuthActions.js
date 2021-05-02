import AsyncStorage from '@react-native-community/async-storage';

const axios = require('axios');
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_PERSONAL_COURSES_START,
  GET_PERSONAL_COURSES_SUCCESS,
  GET_PERSONAL_COURSES_FAILED,
  SIGN_OUT_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  RESET_GROUP,
  BASE_URL,
  LOCAL_AUTH_ID,
  USER,
} from './types';

import {Alert} from 'react-native';
import {post, get, patch} from '../helpers/APIService';

const respondLoginAction = async (response, dispatch) => {
  if (response.status < 400) {
    response.data.user.role = response.data.role ? response.data.role : null;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.user,
    });

    USER.token = response.data.token;

    // await Keychain.setGenericPassword(LOCAL_AUTH_ID, response.data.token);
    // const credentials = Keychain.getGenericPassword();

    await AsyncStorage.setItem(LOCAL_AUTH_ID, response.data.token);
  } else {
    Alert.alert('WARNING', `${response.response.data.message}!`);
    dispatch({type: LOGIN_FAILED});
  }
};

export const signUp = params => {
  return dispatch => {
    if (params.email != '' && params.password != '' && params.username != '') {
      if (validateEmail(params.email)) {
        dispatch({type: LOGIN_START});

        AsyncStorage.removeItem(LOCAL_AUTH_ID);

        post(BASE_URL.concat('/signup'), respondLoginAction, dispatch, params);
      } else {
        Alert.alert('WARNING', 'Please enter a valid email address');
      }
    } else {
      Alert.alert('WARNING', 'Please fill out all fields');
    }
  };
};

export const login = params => {
  return dispatch => {
    if (params.email != '' && params.password != '') {
      if (validateEmail(params.email)) {
        dispatch({
          type: LOGIN_START,
        });

        axios
          .request({
            method: 'POST',
            url: BASE_URL.concat('/signin'),
            responseType: 'json',
            data: params,
          })
          .then(response => {
            respondLoginAction(response, dispatch);
          })
          .catch(e => {
            respondLoginAction(e, dispatch);
          });
      } else {
        Alert.alert('WARNING', 'Please enter a valid email address');
      }
    } else {
      Alert.alert('WARNING', 'Please fill out the all fields');
    }
  };
};

const respondUpdateUser = (response, dispatch) => {
  if (response.status < 400) {
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: response.data, //there is no image field in user model yet, needs to be recorded somewhere in firebase, s3 etc
    });

    Alert.alert('updated', 'Your profile image is updated!');
  } else {
    Alert.alert('WARNING', "User coudn't get updated!");
    dispatch({type: UPDATE_PROFILE_FAILED});
  }
};

export const updateUserProfile = params => {
  return dispatch => {
    dispatch({type: UPDATE_PROFILE_START});

    let userId = params.id;
    patch(
      BASE_URL.concat(`/user/${userId}`),
      respondUpdateUser,
      dispatch,
      params,
    );
  };
};

const respondGetPersonalCourses = (response, dispatch) => {
  if (response.status < 400) {
    console.log('courses', response.data.data);
    dispatch({
      type: GET_PERSONAL_COURSES_SUCCESS,
      payload: response.data.data, //there is no image field in user model yet, needs to be recorded somewhere in firebase, s3 etc
    });
  } else {
    dispatch({type: GET_PERSONAL_COURSES_FAILED});
  }
};

export const getPersonalCourses = userId => {
  return dispatch => {
    dispatch({type: GET_PERSONAL_COURSES_START});
    get(
      BASE_URL.concat(`/usercourse/user/${userId}`),
      respondGetPersonalCourses,
      dispatch,
    );
  };
};

const getUser = (response, dispatch) => {
  if (response.status < 400) {
    response.data.user.role = response.data.role ? response.data.role : null;
    dispatch({type: LOGIN_SUCCESS, payload: response.data.user});
  } else {
    dispatch({type: LOGIN_FAILED});
  }
};

export const isUser = () => {
  //protect router
  return dispatch => {
    dispatch({type: LOGIN_START});
    get(BASE_URL, getUser, dispatch);
  };
};

export const signOut = () => {
  return dispatch => {
    // Keychain.resetGenericPassword();
    AsyncStorage.removeItem(LOCAL_AUTH_ID);
    USER.token = null;

    dispatch({type: SIGN_OUT_SUCCESS});
    // dispatch({type: RESET_USERS});
    dispatch({type: RESET_GROUP});
  };
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
