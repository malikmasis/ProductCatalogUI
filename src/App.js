import { Switch } from "react-router-dom";
import PrivateRoute from "./Helpers/PrivateRoute";
import PublicRoute from "./Helpers/PublicRoute";
import Login from "./Components/Login/Login";
import ProductCatalogImport from "./Components/ProductCatalog/ProductCatalogImport";
import ProductCatalogItem from "./Components/ProductCatalog/ProductCatalogItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Switch>
        <PublicRoute exact path="/ProductCatalogImport" component={ProductCatalogImport} />
        <PublicRoute exact path="/ProductCatalogItem" component={ProductCatalogItem} />
        <PublicRoute exact path={["/", "/login"]} component={Login} />
      </Switch>
    </div>
  );
}

export default App;
