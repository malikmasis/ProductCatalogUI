import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";

import { HideLoader, ShowLoader } from "../../Redux/Actions/LoaderAction";
import { getAllProductCatalogs } from "../../Redux/Actions/ProductCatalogListAction";
import ProductCatalogDeleteService from "../../Services/ProductCatalogDeleteService";
import { succes, error } from "../../Helpers/NotifierHelper";

class ProductCatalogList extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    this.props.dispatch(getAllProductCatalogs())
      .then(() => {
        let productCatalogs = JSON.parse(this.props.ProductCatalogList);
        if (productCatalogs !== null || productCatalogs === undefined) {
          this.setState({ categories: productCatalogs });
        }
        else {
          this.setState({ resultStr: this.props.message });
          error("Cannot Get", this.props.message);
        }
      })
      .catch(() => {
        this.setState({ resultStr: this.props.message });
        this.setState({ message: "Network Problem" });
        error("Network Problem", this.props.message);
      })
      .finally(() => {
        this.props.dispatch(HideLoader());
      });
  }

  getItem = (category) => {
    console.log("selam", category.id);
  }

  remove = id => {
    console.log("selam", id);
    var he = ProductCatalogDeleteService.removeProductCatalog(id).then((data) => {
      if (data.id > 0) {
        let productCatalogs = this.state.categories.filter(c => c.id !== id);
        this.setState({ categories: productCatalogs });
        succes(`The product named ${data.name} has been deleted.`);
      }
      else {
        error("Unhandled Error", data);
      }
    })
      .catch(() => {
        error("Network Problem", this.props.message);
      });
  }

  render() {
    const message = this.props.message.message;
    return (
      <div className="loginFormInputContainer" >
        { message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        < center >
          <h2>Product Catalog List Page</h2>
          <hr />
        </center >

        <Table striped>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Category Code</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.code}</td>
                <td>{category.price}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.remove(category.id)}
                  >
                    Remove
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div >
    );
  }

}

const mapStateToProps = (state) => ({
  ProductCatalogList: state.ProductCatalogReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(ProductCatalogList);
