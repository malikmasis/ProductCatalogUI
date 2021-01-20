import axios from "axios";
import * as rootUrl from "./RootService";

class ProductCatalogService {
  getProductCatalog(userData) {
    let fullDescription = '';
    if (userData.FullDescription !== undefined) {
      fullDescription = userData.FullDescription;
    }
    return axios
      .get(rootUrl.TestPaqApiUrl + rootUrl.ProductCatalogItemPath
        + `?OriginCountry=${userData.OriginCountry}&DestinationCountry=${userData.DestinationCountry}&FullDescription=${fullDescription}`)
      .then((res) => {
        const token = res.data;
        return token;
      });
  }

}

export default new ProductCatalogService();
