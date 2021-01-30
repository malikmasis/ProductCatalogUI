import axios from "axios";
import * as rootUrl from "./RootService";


class ProductCatalogDeleteService {
  
  removeProductCatalog = (id) => {
    return axios
      .delete(rootUrl.BaseApiUrl + rootUrl.ProductCatalogDeletePath + '/' + id)
      .then((res) => {
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogDeleteService();