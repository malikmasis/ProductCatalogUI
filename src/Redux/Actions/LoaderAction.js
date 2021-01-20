import * as actionTypes from "./ActionTypes";

export const ShowLoader = () => (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_LOADER,
    payload: true,
  });
};

export const HideLoader = () => (dispatch) => {
  dispatch({
    type: actionTypes.HIDE_LOADER,
    payload: false,
  });
};
