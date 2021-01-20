import { SET_MESSAGE, CLEAR_MESSAGE } from "../Actions/ActionTypes";

const initialState = { };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { message: action.payload };

    case CLEAR_MESSAGE:
      return { message: null };

    default:
      return state;
  }
}
