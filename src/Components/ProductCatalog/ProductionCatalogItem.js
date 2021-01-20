import React, { Component } from "react";
import { HideLoader, ShowLoader } from "../../Redux/Actions/LoaderAction";
import { ProductCatalogItem } from "../../Redux/Actions/ProductCatalogItemAction";
import { succes } from "../../Helpers/NotifierHelper";
import { connect } from "react-redux";
import { Button, TextField, FormControl, FormGroup } from "@material-ui/core";
import { Form } from "reactstrap";


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

    this.props.dispatch(ProductCatalogItem(data))
      .then(() => {
        let resultt = this.props.ProductCatalogItem;
        this.setState({ resultStr: resultt });
        succes("You can download the result file");
      })
      .catch(() => {
        this.setState({ message: "Network Problem" });
      })
      .finally(() => {
        this.props.dispatch(HideLoader());
      });
  };

  goImportProductCatalog = () => {
    let link = document.createElement("a");
    link.download = `${this.state.selectedFile.name}.csv`;

    var json = JSON.parse(this.state.resultStr);

    let blob = new Blob([json], { type: "text/csv" });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  render() {
    const message = this.props.message.message;
    let disable = true;
    if (this.state.resultStr === null) {
      disable = false;
    };
    return (
      <div className="loginFormInputContainer">
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <center>
          <h2>Import Duty Rate Page</h2>
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
                  Import Duty Rate
                </Button>

                <Button
                  disabled={!disable}
                  variant="contained"
                  className="loginButton"
                  onClick={this.goImportProductCatalog}
                >
                  Download
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
  ProductCatalogImport: state.ProductCatalogImportReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(ProductCatalogImport);
