import {
  GROUP_START,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILED,
  GROUP_ADD_SUCCESS,
  GROUP_ADD_FAILED,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAILED,
  RESET_GROUP,
} from '../actions/types';

const INITIAL_STATE = {
  studentGroup: [], //if the user is student, his/her class
  loadingStudentGroup: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_START:
      return {
        ...state,
        loadingStudentGroup: true,
      };

    case GROUP_GET_SUCCESS:
      return {
        ...state,
        studentGroup: [...action.payload],
        loadingStudentGroup: false,
      };
    case GROUP_GET_FAILED:
      return {
        ...state,
        loadingStudentGroup: false,
      };

    case GROUP_ADD_SUCCESS:
      action.payload;
      return {
        ...state,
        studentGroup: [action.payload],
      };

    case GROUP_ADD_FAILED:
      return {
        ...state,
      };

    case GROUP_UPDATE_SUCCESS:
      return {
        ...state,
        studentGroup: action.payload,
        loadingStudentGroup: false,
      };

    case GROUP_UPDATE_FAILED:
      return {
        ...state,
        loadingStudentGroup: false,
      };

    case RESET_GROUP:
      return {
        ...state,
        studentGroup: null,
      };

    default:
      return state;
  }
};
