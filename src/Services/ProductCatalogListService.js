import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogListService {

  getAllProductCatalogs() {
    return axios
      .get(rootUrl.BaseApiUrl + rootUrl.ProductCatalogListPath)
      .then((res) => {
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogListService();
