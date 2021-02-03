import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';
import "./Nav.css";


class CustomNav extends Component {
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

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Catalog Product</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/ProductCatalogList">List</Nav.Link>
              <Nav.Link href="/ProductCatalogItem">New Record</Nav.Link>
              <Nav.Link href="/ProductCatalogImport">Import</Nav.Link>
              <NavDropdown title="Others" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ProductCatalog: state.ProductCatalogReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(CustomNav);
