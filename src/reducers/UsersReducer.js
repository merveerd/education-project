import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER_COUNT_START,
  GET_USER_COUNT_SUCCESS,
  GET_USER_COUNT_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from '../actions/types';

//Only Admin
const INITIAL_STATE = {
  loading: false,
  users: [],
  userCount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_START:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
        loading: false,
      };

    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
      };

    case GET_USER_COUNT_START:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_COUNT_SUCCESS:
      return {
        ...state,
        userCount: action.payload,
        loading: false,
      };

    case GET_USER_COUNT_FAILED:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
      const updatedUser = action.payload;
      let updatedUsers = state.users.slice();
      const updateIndex = state.users.findIndex(
        student => student.id === action.payload.id,
      );
      (updateIndex === 0 || updateIndex) &&
        updatedUsers.splice(updateIndex, 1, updatedUser);
      return {
        //Find index and update it
        ...state,
        users: updatedUsers,
        loading: false,
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
      };

    case DELETE_USER_START:
      return {
        ...state,
        loadingUser: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        users: [...action.payload],
      };

    case DELETE_USER_FAILED:
      return {
        ...state,
        loadingUser: false,
      };

    default:
      return state;
  }
};
