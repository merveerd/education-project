const axios = require('axios');
import AsyncStorage from '@react-native-community/async-storage';
//import * as Keychain from "react-native-keychain";
import {LOCAL_AUTH_ID} from '../actions/types';

export const get = async (requestMethod, callbackFn, dispatch) => {
  // const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  return axios
    .request({
      method: 'GET',
      url: requestMethod,
      responseType: 'json',
      headers: {
        authorization: 'Bearer '.concat(token1),
      },
    })
    .then(response => {
      callbackFn(response, dispatch);
    })
    .catch(e => {
      console.log('eeee EEEE', e);
      console.log(e.response.data.message);
      callbackFn(e, dispatch);
    });
};

export const post = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
  additionalParams,
) => {
  // const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);

  return axios
    .request({
      method: 'POST',
      url: requestMethod,
      responseType: 'json',
      data: requestParams,
      headers: {
        authorization: 'Bearer '.concat(token1),
      },
    })
    .then(response => {
      return callbackFn(response, dispatch, additionalParams); //return always newly added data
    })
    .catch(e => {
      console.log(e.response.data.message);
      callbackFn(e, dispatch, additionalParams);
    });
};

export const patch = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
) => {
  //const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  return axios
    .request({
      method: 'PATCH',
      url: requestMethod,
      responseType: 'json',
      data: requestParams,
      headers: {
        authorization: 'Bearer '.concat(token1),
      },
    })
    .then(response => {
      callbackFn(response, dispatch);
    })
    .catch(e => {
      console.log(e.response.data.message);
      callbackFn(e, dispatch);
    });
};

export const deleteOne = async (
  requestMethod,
  callbackFn,
  dispatch,
  requestParams,
) => {
  //const credentials = await Keychain.getGenericPassword();
  let token1 = await AsyncStorage.getItem(LOCAL_AUTH_ID);
  return axios
    .delete(requestMethod, {
      headers: {
        authorization: 'Bearer '.concat(token1),
      },
      data: requestParams,
    })
    .then(response => {
      callbackFn(response, dispatch);
    })
    .catch(e => {
      console.log(e.response.data.message);
      callbackFn(e, dispatch);
    });
};
