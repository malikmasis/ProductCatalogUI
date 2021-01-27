import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Button, TextField, FormControl, FormGroup } from "@material-ui/core";

import { HideLoader, ShowLoader } from "../../Redux/Actions/LoaderAction";
import { importProductCatalog } from "../../Redux/Actions/ProductCatalogImportAction";
import { succes, error } from "../../Helpers/NotifierHelper";


class ProductCatalogImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileError: null,
      selectedFile: null,
      resultStr: null
    }
  }

  validation = () => {
    let result = false;
    this.setState({ fileError: null });

    if (!this.state.selectedFile) {
      this.setState({ fileError: "File is required" });
      result = true;
    }

    return result;
  };

  handleChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      resultStr: null
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validation()) return;

    const data = new FormData();
    data.append('file', this.state.selectedFile);

    this.props.dispatch(ShowLoader());

    this.props.dispatch(importProductCatalog(data))
      .then(() => {
        let resultt = this.props.ProductCatalogImport;
        this.setState({ resultStr: resultt });
        succes("You can download the result file");
      })
      .catch(() => {
        this.setState({ message: "Network Problem" });
        error("Network Problem");
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
          <h2>Import Product Catalog Page</h2>
          <hr />
        </center>
        <Form>
          <div className="divclass">
            <FormControl>
              <FormGroup>
                <TextField
                  type="file"
                  name="file"
                  className="input"
                  id="file"
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.fileError}</div>
              </FormGroup>

              <br />
              <div className="divButton">
                <Button
                  variant="contained"
                  color="primary"
                  className="loginButton"
                  onClick={this.handleSubmit}
                >
                  Import Product Catalog
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
  ProductCatalogImport: state.ProductCatalogReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(ProductCatalogImport);
