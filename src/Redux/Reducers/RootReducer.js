import { combineReducers } from "redux";
import LoaderStateReducer from "./LoaderStateReducer";
import AuthReducers from "./AuthReducer";
import MessageReducer from "./MessageReducer";
import ProductCatalogReducer from "./ProductCatalogReducer";

export default combineReducers({
  LoaderStateReducer,
  AuthReducers,
  MessageReducer,
  ProductCatalogReducer
});
