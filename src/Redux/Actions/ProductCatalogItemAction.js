import ProductCatalogService from "../../Services/ProductCatalogService";
import * as ActionTypes from "./ActionTypes";

export const saveProductCatalog = (productInfo) => (dispatch) => {
  return ProductCatalogService.saveProductCatalog(productInfo).then(
    (data) => {
      try {
        
        dispatch({
          type: ActionTypes.GET_SUCCESS,
          payload: JSON.stringify(data)
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
        type: ActionTypes.GET_FAIL,
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
