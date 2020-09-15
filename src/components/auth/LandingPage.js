import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import {logo} from "../../assets/images/dropzne.png";

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
                    <a href="index.html" class="login-logo">
                      <img src={logo} alt=" " />
                        </a>
                        <h5 class="box-heading text-center">MUSIC MON</h5>
                        <div class="text-center tell-to-fans"></div>                
                     

                  <div className="d-flex align-items-center justify-content-between social-login">
                  <button className="btn btn-outline btn-facebook" variant="outline-dark" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} onSubmit={this.handleSubmit}>
                    <i className="fab fa-facebook-f fa-lg mr-2"></i>
                      Continue
                  </button>

                  <button className="btn btn-outline btn-google" variant="outline-dark" onClick={() => Auth.federatedSignIn({provider: 'Google'})} onSubmit={this.handleSubmit}>
                    <i className="fab fa-google fa-lg mr-2"></i>
                      Continue
                  </button>
                </div>
                
                <div>
                  <a href="/Register" class="btn btn-outline w-100">SIGN UP</a>
                </div>
                <p className="already-member">Already a member?
                                <Link to="/LogIn">Log In</Link>
                        </p>


                      {/* <div>
                          <button className="btn btn-primary" onClick={this.handleFacebookSignUp}>Facebook</button>
                          
                      </div>

                      <div>
                          <button className="btn btn-primary" onClick={this.handleGoogleSignUp}>Google</button>
                      </div> */}

                    
                        
                    
                  </div>


              </div>
          </div>
          </div>


        //       <div>
        //         <div className="d-flex align-items-center justify-content-between social-login">
        //           <button onClick={this.handleFacebookSignUp}>
        //             Facebook
        //           </button>

        //           <button onClick={this.handleGoogleSignUp}>
        //               Google
        //           </button>
        //         </div>

        //         <div>
        //           <a href="Register" className="btn btn-outline w-100">
        //             SIGN UP
        //           </a>
        //         </div>
        //           <a href="LogIn" className="ml-1">
        //             Log In
        //           </a>
        // </div>
  
    );
  }
}

export default Landingpage;