import React, { Component } from "react";
import { HideLoader, ShowLoader } from "../../Redux/Actions/LoaderAction";
import { getProductCatalog } from "../../Redux/Actions/ProductCatalogItemAction";
import { connect } from "react-redux";
import { Button, TextField, FormControl, FormGroup, TextareaAutosize, FormLabel } from "@material-ui/core";
import { Form } from "reactstrap";

class ProductCatalogItem extends Component {
  state = { originCountryError: null, destinationCountryError: null };

  validation = () => {
    let result = false;
    this.setState({ originCountryError: null, destinationCountryError: null });

    if (!this.state.originCountry) {
      this.setState({ originCountryError: "Origin Name is required" });
      result = true;
    }
    if (!this.state.destinationCountry) {
      this.setState({ destinationCountryError: "Destination Name is required" });
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
      OriginCountry: this.state.originCountry,
      DestinationCountry: this.state.destinationCountry,
      FullDescription: this.state.fullDescription
    };

    this.props.dispatch(getProductCatalog(productCatalogInfo))
      .then(() => {
        let getProductCatalog = JSON.parse(this.props.ProductCatalogItem);
        if (getProductCatalog.error === undefined || getProductCatalog.error === null) {
          this.setState({ resultStr: getProductCatalog.value });
        }
        else {
          this.setState({ resultStr: getProductCatalog.rawApiResponse });
        }
      })
      .catch(() => {
        this.setState({ resultStr: getProductCatalog.rawApiResponse });
        this.setState({ message: "Network Problem" });
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
                  name="originCountry"
                  className="input"
                  id="originCountry"
                  label="Origin Country"
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.originCountryError}</div>
              </FormGroup>

              <br />
              <FormGroup>
                <TextField
                  name="destinationCountry"
                  className="input"
                  id="destinationCountry"
                  label="Destination Country"
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.destinationCountryError}</div>
              </FormGroup>

              <br />
              <FormGroup>
                <TextField
                  name="fullDescription"
                  className="input"
                  id="fullDescription"
                  label="Full Description"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <br />
              <FormGroup>
                <FormLabel > Result
              </FormLabel>
                <TextareaAutosize
                  disabled={true}
                  className="input"
                  rowsMax={6}
                  rowsMin={4}
                  aria-label="maximum height"
                  defaultValue={this.state.resultStr}
                />
              </FormGroup>

              <br />
              <div className="divButton">
                <Button
                  variant="contained"
                  color="primary"
                  className="loginButton"
                  onClick={this.handleSubmit}
                >
                  Get Catalog Product
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
  ProductCatalogItem: state.ProductCatalogItemReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(ProductCatalogItem);
