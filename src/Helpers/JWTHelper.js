export const JwtDecoder = (token) => {
  if (!token) return null;
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const checkLoginState = () => {
  var token = localStorage.getItem("token");
  if (token) {
    var decodeToken = JwtDecoder(token);

    //Checking token exp. date
    if (decodeToken.exp < new Date().getTime() / 1000) {
      localStorage.removeItem("token")
      return false;
    } else {
      return true;
    }
  }
};
