import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogGetItemService {
  
  getItemProductCatalogs(id) {
    return axios
      .get(`${rootUrl.BaseApiUrl}${rootUrl.ProductCatalogGetItemPath}\\${id}`)
      .then((res) => {
        debugger;
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogGetItemService();
