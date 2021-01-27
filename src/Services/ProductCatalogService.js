import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogService {
  saveProductCatalog(userData) {
    return axios
      .post(rootUrl.BaseApiUrl + rootUrl.ProductCatalogItemPath, userData)
      .then((res) => {
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogService();
