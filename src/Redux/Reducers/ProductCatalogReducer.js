import * as ActionTypes from "../Actions/ActionTypes";

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TEST_PACKAGE_SUCCESS:
      return action.payload;
    case ActionTypes.GET_TEST_PACKAGE_FAIL:
      return action.payload;
    case ActionTypes.TEST_PACKAGE_INSERT_SUCCESS:
      return action.payload;
    case ActionTypes.TEST_PACKAGE_INSERT_FAIL:
      return action.payload;
    default:
      return state;
  }
};
