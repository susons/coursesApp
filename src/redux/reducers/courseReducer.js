import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
  switch(action.type) {
    case types.CREATE_COURSE:
      return [...state, {...action.course }];
    default:
      return state;
  }
}

//course reducer goes to index.js as courses renaming because export default