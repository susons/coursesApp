import * as types from '../actions/actionTypes';

export default function authorReducer(state = [], action) {
  switch(action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}

//course reducer goes to index.js as courses renaming because export default