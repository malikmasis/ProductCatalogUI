import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import "./Nav.css";


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileError: null,
      selectedFile: null
    }
  }


  render() {
    const message = this.props.message.message;
    return (
      <div className="navvv">
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}

        <Form>
          <br />
          <Link
            className="button"
            variant="outlined"
            to="/ProductCatalogImport"
          >
            Import Produc Catalog
                </Link>

          <Link
            className="button"
            variant="contained"
            to="/ProductCatalogItem"
          >
            New Production Catalog
                </Link>

          <Link
            className="button"
            variant="contained"
            to="/ProductCatalogList"
          >
            Production Catalog List
                </Link>
          <br />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ProductCatalog: state.ProductCatalogReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(Nav);
