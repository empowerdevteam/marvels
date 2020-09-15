import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";

class Landingpage extends Component {
  constructor(props) {
    super(props);
    const isUserLoggedIn = this.checkIsUserLoggedIn();
    console.log("Is Logged In user",isUserLoggedIn);
    if (isUserLoggedIn) {
      this.redirectTo();
    }
    this.state = {};

  }

  redirectTo = () => {
    this.props.history.push("/Message");
  }

  checkIsUserLoggedIn = () => {
    return this.props && this.props.auth && this.props.auth.isAuthenticated && this.props.auth.user;
  }
  

  addBodyClass = () => {
    document.body.classList.add("bodyStyle");
  }

  handleGoogleSignUp = async event => {
    try {
      this.setState({ isAuthenticating: true });
      event.preventDefault();
      await Auth.federatedSignIn({provider: 'Google'})
      this.redirectTo();

    } catch (error) {
      this.setState({
        errors: {
          errMessage: error.message
        }
      });
    }
  }

  handleFacebookSignUp = async event => {
    try {
      this.setState({ isAuthenticating: true });
      event.preventDefault();
      await Auth.federatedSignIn({provider: 'Facebook'})

      this.props.history.push("/Message");

    } catch (error) {
      this.setState({
        errors: {
          errMessage: error.message
        }
      });
    }
  }

  render() {
    this.addBodyClass();
    return (
      <div className="wrapper">
      <div className="landing d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 d-flex justify-content-center align-items-sm-center">
          <div className="white-radius-box box">
            <a href="/" className="login-logo">
              <img src={landingLogo} alt="" />
            </a>
            <h5 className="box-heading text-center">HEYWATCH.ME</h5>
            <div className="text-center tell-to-fans">
              <h1>Tell your fans</h1>
              <p className="sub-heading">Get paid for your influence.</p>
            </div>
            <div className="d-flex align-items-center justify-content-between social-login">
              <button
                className="btn btn-outline btn-facebook"
                variant="outline-dark" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} onSubmit={this.handleSubmit}
              >
                <i className="fab fa-facebook-f fa-lg mr-2"></i>Continue
              </button>

              <button
                className="btn btn-outline btn-google"
                variant="outline-dark" onClick={() => Auth.federatedSignIn({provider: 'Google'})} onSubmit={this.handleSubmit}
              >
                <i className="fab fa-google fa-lg mr-2"></i>Continue
              </button>
            </div>

            <div>
              <a href="Signuppage" className="btn btn-outline w-100">
                SIGN UP
              </a>
            </div>
            <p className="already-member text-center mt-4 mb-0">
              Already a member?
              <a href="Loginpage" className="ml-1">
                Log In
              </a>
            </p>
          </div>
        </div>

        <footer className="login-footer text-center">
          <ul>
          <li><a href="#">About HeyWatch.Me</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Help</a></li>
          </ul>
        </footer>
      </div>
    </div>
  
    );
  }
}

export default Landingpage;