import axios from "axios";
import * as rootUrl from "./RootService";
import SetAuthToken from "../Helpers/SetAuthToken";
import { JwtDecoder } from "../Helpers/JWTHelper";

class AuthService {
  login(userData) {
    return axios
      .post(rootUrl.BaseApiUrl + rootUrl.AuthenticationPath, userData)
      .then((res) => {
        const token = res.data;
        SetAuthToken(token);
        localStorage.setItem("token", token);
        return JwtDecoder(token);
      });
  }

  logout() {
    localStorage.removeItem("token");
    this.context.router.history.push("/Login");
  }
}

export default new AuthService();
