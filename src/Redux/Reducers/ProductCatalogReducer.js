import * as ActionTypes from "../Actions/ActionTypes";

const initialState = { };

export default (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.GET_SUCCESS:
      return action.payload;
    case ActionTypes.GET_FAIL:
      return action.payload;
    default:
      return state;
  }
  
};
