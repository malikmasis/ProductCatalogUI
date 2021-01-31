import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Button, TextField, FormControl, FormGroup } from "@material-ui/core";

import { HideLoader, ShowLoader } from "../../Redux/Actions/LoaderAction";
import { saveUpdateProductCatalog } from "../../Redux/Actions/ProductCatalogItemAction";
import ProductCatalogGetItemService from "../../Services/ProductCatalogGetItemService";
import NotifierHelper from "../../Helpers/NotifierHelper";


class ProductCatalogItem extends Component {
  state = { codeError: null, nameError: null, priceError: null, product: null };

  componentDidMount() {
    let id = this.props.match.params.categoryId;
    if (id !== undefined) {
      this.getProduct(id);
    }
  }

  getProduct = id => {
    ProductCatalogGetItemService.getItemProductCatalogs(id)
      .then((data) => {
        if (data.id > 0) {
          this.setState({ product: data });
          this.setState({ "code": data.code });
          this.setState({ "name": data.name });
          this.setState({ "price": data.price });
        }
        else {
          NotifierHelper.error("Unhandled Error:" + data);
        }
      })
      .catch(() => {
        NotifierHelper.error("Network Problem: " + this.props.message);
      });
  }

  validation = () => {
    let result = false;
    this.setState({ codeError: null, nameError: null, priceError: null });

    if (!this.state.code) {
      this.setState({ codeError: "Code is required" });
      result = true;
    }
    if (!this.state.name) {
      this.setState({ nameError: "Name is required" });
      result = true;
    }
    if (!this.state.price) {
      this.setState({ priceError: "Price is required" });
      result = true;
    }

    return result;
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validation()) return;

    this.props.dispatch(ShowLoader());
    let productCatalogInfo = {
      code: this.state.code,
      name: this.state.name,
      price: +this.state.price,
      photo: this.state.photo
    };

    this.props.dispatch(saveUpdateProductCatalog(productCatalogInfo, this.props.match.params.categoryId))
      .then(() => {
        let saveUpdateProductCatalog = JSON.parse(this.props.ProductCatalogItem);
        if (saveUpdateProductCatalog.id > 0) {
          NotifierHelper.success("Recorded successfully");
        }
        else {
          NotifierHelper.error("Cannot save: " + this.props.message);
        }
      })
      .catch(() => {
        this.setState({ message: "Network Problem: " + this.props.message });
        NotifierHelper.error("Network Problem" );
      })
      .finally(() => {
        this.props.dispatch(HideLoader());
      });
  };

  render() {
    const message = this.props.message.message;
    return (
      <div className="loginFormInputContainer">
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <center>
          <h2>Product Catalog Page</h2>
          <hr />
        </center>
        <Form>
          <div className="divclass">
            <FormControl>
              <FormGroup>
                <TextField
                  name="code"
                  className="input"
                  id="code"
                  label="Code"
                  value={this.state.code}
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.codeError}</div>
              </FormGroup>

              <br />
              <FormGroup>
                <TextField
                  name="name"
                  className="input"
                  id="name"
                  label="Name"
                  value={this.state.name}
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.nameError}</div>
              </FormGroup>

              <br />
              <FormGroup>
                <TextField
                  name="price"
                  className="input"
                  id="price"
                  label="Price"
                  value={this.state.price}
                  variant="outlined"
                  type="number"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.priceError}</div>
              </FormGroup>

              <br />
              <div className="divButton">
                <Button
                  variant="contained"
                  color="primary"
                  className="loginButton"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button>
              </div>
              <br />
            </FormControl>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ProductCatalogItem: state.ProductCatalogReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(ProductCatalogItem);
