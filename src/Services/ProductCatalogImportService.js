import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogImportService {
  importProductCatalog(file) {
    return axios
      .post(rootUrl.TestPaqApiUrl + rootUrl.ProductCatalogImportPath, file)
      .then((res) => {
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogImportService();
