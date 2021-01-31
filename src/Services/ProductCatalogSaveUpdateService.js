import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogSaveUpdateService {

  saveUpdateProductCatalog(product, id) {
    if (id === undefined) {
      return axios
        .post(rootUrl.BaseApiUrl + rootUrl.ProductCatalogSavePath, product)
        .then((res) => {
          return res.data;
        });
    }
    else {
      debugger
      return axios
        .put(rootUrl.BaseApiUrl + rootUrl.ProductCatalogUpdatePath + '/' + id, product)
        .then((res) => {
          return res.data;
        });
    }
  }

}

export default new ProductCatalogSaveUpdateService();
