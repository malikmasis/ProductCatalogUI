import ProductCatalogService from "../../Services/ProductCatalogService";
import * as ActionTypes from "./ActionTypes";

export const getProductCatalog = (userInfo) => (dispatch) => {
  return ProductCatalogService.getProductCatalog(userInfo).then(
    (data) => {
      try {
        
        dispatch({
          type: ActionTypes.GET_TEST_PACKAGE_SUCCESS,
          payload: JSON.stringify(data),
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
        type: ActionTypes.GET_TEST_PACKAGE_FAIL,
        payLoad: null,
      });

      dispatch({
        type: ActionTypes.SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
