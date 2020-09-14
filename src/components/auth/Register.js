import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import { validateSignUp } from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = validateSignUp(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const { username, email, password } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });
      this.props.history.push("/welcome");
      console.log(signUpResponse);
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <div className="login-wrapper auth">
        {/* <div className="login-wrapper"> */}
                <div className="login-box-outer">
                    <div className="login-box white-radius-box">
                        <h5 className="box-heading text-center">Sign Up</h5>
                        <FormErrors formerrors={this.state.errors} />
                          <form onSubmit={this.handleSubmit}>
                        <div className="login-fields">
                            <div className="from-field">
                                <TextField type="text"
                                label="Full Name"
                                fullWidth={true} 
                                className="input" 
                                id="username"
                                aria-describedby="userNameHelp"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                                />
                            </div>
                            <div className="from-field">
                                <TextField type="text"
                                label="Email" fullWidth={true}
                                className="input" 
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                />
                            </div>
                            <div className="from-field">
                                <TextField type="password"
                                label="Password"
                                fullWidth={true} 
                                className="input" 
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                />
                            </div>
                            <div className="from-field">
                                <TextField type="password"
                                label="Confirm password"
                                fullWidth={true} 
                                className="input" 
                                id="confirmpassword"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                />
                            </div>

                        </div>
                        <div>
                            <button className="btn btn-primary">Sign Up</button>
                        </div>

                        <p className="already-member">Forgot password?
                                <Link to="/forgotpassword">Forgot password?</Link>
                        </p>

                        <p className="already-member">Not a member?
                                <Link to="/LogIn">Login</Link>
                        </p>
                        </form>
                    </div>
                </div>
            {/* </div> */}




        {/* <div className="container">
          <h1>Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input" 
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Register
                </button>
              </p>
            </div>
          </form>
        </div> */}
      </div>
    );
  }
}

export default Register;