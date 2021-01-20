import AuthService from "../../Services/AuthService";
import * as ActionTypes from "../Actions/ActionTypes";

export const login = (userInfo) => (dispatch) => {
  return AuthService.login(userInfo).then(
    (data) => {
      try {
        if (!data) throw new Error("Username or password invalid");

        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: { user: JSON.stringify(data) },
        });

        return Promise.resolve();
        
      } catch (error) {
        dispatch({
          type: ActionTypes.SET_MESSAGE,
          payload: error.message,
        });
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ActionTypes.LOGIN_FAIL,
      });

      dispatch({
        type: ActionTypes.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
