import {createSelector} from 'reselect';
import {
  GET_ACTIVE_COURSES_START,
  GET_ACTIVE_COURSES_SUCCESS,
  GET_ACTIVE_COURSES_FAILED,
} from '../actions/types';
//ONLY ADMIN
const INITIAL_STATE = {
  activeCourses: [],
  loadingActiveCourses: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVE_COURSES_START:
      return {
        ...state,
        loadingActiveCourses: true,
      };

    case GET_ACTIVE_COURSES_SUCCESS:
      return {
        ...state,
        activeCourses: [...action.payload],
        loadingActiveCourses: false,
      };
    case GET_ACTIVE_COURSES_FAILED:
      return {
        ...state,
        loadingActiveCourses: false,
      };

    default:
      return state;
  }
};

//selectors

const getActiveCourses = state => state.activeCourses;

//this counts can be directly kept somewhere in database too instead of this calculations. They are only to see what choices are users make

export const typeRatios = createSelector([getActiveCourses], activeCourses => {
  let listening = 0,
    speaking = 0,
    reading = 0,
    writing = 0;

  activeCourses.forEach(item => {
    switch (item['courses.type']) {
      case 'listening':
        listening++;
        break;
      case 'speaking':
        speaking++;
        break;

      case 'reading':
        reading++;
        break;
      case 'writing':
        writing++;
        break;
    }
  });

  return {
    listening:
      Number(((listening / activeCourses.length) * 100).toFixed(0)) || 0,
    speaking: Number(((speaking / activeCourses.length) * 100).toFixed(0)) || 0,
    reading: Number(((reading / activeCourses.length) * 100).toFixed(0)) || 0,
    writing: Number(((writing / activeCourses.length) * 100).toFixed(0)) || 0,
  };
});

export const contentRatios = createSelector(
  [getActiveCourses],
  activeCourses => {
    let word = 0,
      grammar = 0;
    console.log('cont', activeCourses);
    activeCourses.forEach(item => {
      switch (item['courses.content']) {
        case 'word':
          word++;
          break;
        case 'grammar':
          grammar++;
          break;
      }
    });

    return {
      word,
      grammar,
    };
  },
);

export const levelCount = createSelector([getActiveCourses], activeCourses => {
  let levels = {
    A1: 1, //would be zero in normal case, only to show stack bar more clearly I added 1 as a default value for each level.
    A2: 1,
    B1: 1,
    B2: 1,
    C1: 1,
    C2: 1,
  };
  console.log(activeCourses);
  activeCourses.forEach(item => {
    console.log('for');
    levels[item['courses.level'].toUpperCase()] =
      levels[item['courses.level'].toUpperCase()] + 1 || 0;
  });

  return levels;
});
