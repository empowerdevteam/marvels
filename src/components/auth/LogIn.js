import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import { validateLogin } from "../utility/FormValidation";
import Amplify,{ Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import logo from "../../assets/images/dropzne.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/style.css";


class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };



  checkIsUserLoggedIn = () => {
    return (
      this.props &&
      this.props.auth &&
      this.props.auth.isAuthenticated &&
      this.props.auth.user
    );
  };
  

  handleUserAuthorize = async (element) => {
    let cognitoUser = this.props.auth;
    if (this.props.auth.user){
      cognitoUser = this.props.auth.user;
    }
    if (this.props.auth.user && this.props.auth.user.attributes) {
      cognitoUser = this.props.auth.user.attributes;
    }
    if (this.props.auth.user && this.props.auth.user.signInUserSession.idToken.payload) {
        cognitoUser = this.props.auth.user.signInUserSession.idToken.payload;
    }
    let physicianid_exist = false;
    if (cognitoUser['custom:physicianid']){
      physicianid_exist = cognitoUser['custom:physicianid'];
    }
    
    if (physicianid_exist){
      console.log("exitLogin is True")
      this.props.history.push("/Message");
    }else{
    let physicianid = uuidv4()
    console.log("physicianid",physicianid)
    let user = this.props.auth.user;
    const attributes = {
      'custom:physicianid': physicianid
    };

    await Auth.updateUserAttributes(user, attributes)
    const users = await Auth.currentAuthenticatedUser({ bypassCache: true });
    this.props.auth.setUser(users);

     {
      let cognitoUser = this.props.auth;
      console.log("cognitoUser",cognitoUser);
      if (this.props.auth.user){
        cognitoUser = this.props.auth.user;
      }else
     if (this.props.auth.user && this.props.auth.user.attributes) {
        cognitoUser = this.props.auth.user.attributes;
      }
      if (this.props.auth.user && this.props.auth.user.signInUserSession.idToken.payload) {
          cognitoUser = this.props.auth.user.signInUserSession.idToken.payload;
      }
      const parameters = {
        'custom:physicianid': physicianid
      }
      console.log("parameters",parameters);
    }
  }
}

callAwsLogin = async (event) =>{
       // AWS Cognito integration here
    try{
      const user = await Auth.signIn(this.state.username,this.state.password);
      console.log(user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
     this.props.history.push("/Message");
      this.handleUserAuthorize();

    }catch(error){
      let err=null;
      !error.message?err={"message": error}:err=error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito : error
        }
      })

    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.clearErrorState();
    const error = validateLogin();
    if (error === "") {
      await this.callAwsLogin();
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (

      <div className="wrapper">
      <div className="login d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 d-flex justify-content-center flex-column align-items-sm-center">
        <a href="/" className="login-logo">
                      <img src={logo} alt="" />
                    </a>
          <div className="white-radius-box box">
          
              <h5 className="box-heading-login text-center">Log In</h5>
                      <FormErrors formerrors={this.state.errors} />
                        <form onSubmit={this.handleSubmit}>
                      <div className="login-fields">
                          <div className="from-field">
                              <TextField type="text"
                              label="Enter username or email"
                              fullWidth={true} 
                              className="input" 
                              id="username"
                              aria-describedby="usernameHelp"
                              value={this.state.username}
                              onChange={this.onInputChange}
                              />
                          </div>
                         
                          <div className="from-field">
                              <TextField type="password"
                              label="Password"
                              fullWidth={true} 
                              className="input" 
                              id="password"
                              value={this.state.password}
                              onChange={this.onInputChange}
                              />
                          </div>

                      </div>
                      <div className="form-group text-center mt-4 mb-0">
                              <a href="/ForgotPassword" class="link-forgot-password">Forgot Password?</a>
                      </div>
                      <div class="mt-5 field">
                          <button className="btn btn-purple w-100 control">Login</button>
                      </div>

      

                        
                      </form>
                      <p className="already-member text-center mt-4 mb-0">Not a member?
                        <Link to="/Register">Sign Up</Link>
                        </p>
                  </div>
              </div>
          </div>
          </div>



      // <section className="section auth">
      //   <div className="container">
      //     <h1>Log in</h1>
      //     <FormErrors formerrors={this.state.errors} />

      //     <form onSubmit={this.handleSubmit}>
      //       <div className="field">
      //         <p className="control">
      //           <input 
      //             className="input" 
      //             type="text"
      //             id="username"
      //             aria-describedby="usernameHelp"
      //             placeholder="Enter username or email"
      //             value={this.state.username}
      //             onChange={this.onInputChange}
      //           />
      //         </p>
      //       </div>
      //       <div className="field">
      //         <p className="control has-icons-left">
      //           <input 
      //             className="input" 
      //             type="password"
      //             id="password"
      //             placeholder="Password"
      //             value={this.state.password}
      //             onChange={this.onInputChange}
      //           />
      //           <span className="icon is-small is-left">
      //             <i className="fas fa-lock"></i>
      //           </span>
      //         </p>
      //       </div>
      //       <div className="field">
      //         <p className="control">
      //           <a href="/forgotpassword">Forgot password?</a>
      //         </p>
      //       </div>
      //       <div className="field">
      //         <p className="control">
      //           <button className="button is-success">
      //             Login
      //           </button>
      //         </p>
      //       </div>
      //     </form>
      //   </div>
      // </section>
    );
  }
}

export default LogIn;