import React, { Component } from "react";
import "./Login.css";
import { HideLoader, ShowLoader } from "../../Redux/Actions/LoaderAction";
import { login } from "../../Redux/Actions/AuthAction";
import { connect } from "react-redux";
import { Button, TextField, FormControl, FormGroup } from "@material-ui/core";
import { Form } from "reactstrap";


class Login extends Component {
  state = { userNameError: null, passwordError: null };

  validation = () => {
    let result = false;
    this.setState({ userNameError: null, passwordError: null });
    
    if (!this.state.username) {
      this.setState({ userNameError: "Username is required" });
      result = true;
    }
    if (!this.state.password) {
      this.setState({ passwordError: "Password is required" });
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
    let userInfo = {
      Username: this.state.username,
      password: this.state.password,
      ApplicationKey: "SPP",
    };

    this.props
      .dispatch(login(userInfo))
      .then(() => {
        this.props.history.push("/ProductCatalogItem");
      })
      .catch(() => {
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
          <h2>TestPAQ Login</h2>
          <hr />
        </center>
        <Form>
          <div className="divclass">
            <FormControl>
              <FormGroup>
                <TextField
                  name="username"
                  className="input"
                  id="username"
                  label="Username"
                  variant="outlined"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.userNameError}</div>
              </FormGroup>

              <br />
              <FormGroup>
                <TextField
                  name="password"
                  className="input"
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={this.handleChange}
                />
                <div className="errorText">{this.state.passwordError}</div>
              </FormGroup>

              <br />
              <div className="divButton">
                <Button
                  variant="contained"
                  color="primary"
                  className="resetButton"
                >
                  Reset Password
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className="loginButton"
                  onClick={this.handleSubmit}
                >
                  Login
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
  user: state.AuthReducer,
  message: state.MessageReducer,
});

export default connect(mapStateToProps)(Login);
