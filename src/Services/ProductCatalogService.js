import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogService {

  saveProductCatalog(userData) {
    return axios
      .post(rootUrl.BaseApiUrl + rootUrl.ProductCatalogSavePath, userData)
      .then((res) => {
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogService();
