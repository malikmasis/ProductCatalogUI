import * as actionTypes from "../Actions/ActionTypes";

let initialState = {
  loading: false,
};

export default function LoaderStateReducer(state = initialState, action) {

  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return { ...state, loading: true };
    case actionTypes.HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }

}
