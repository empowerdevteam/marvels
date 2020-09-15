import React, { Component } from "react";
import logo from "../../assets/images/dropzne.png";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import Footer from "../Footer";
import { withRouter, Link } from "react-router-dom";
document.body.classList.add("bodyStyle");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: null,
      loading:false
    };
  }

  loginClick = async (event) => {
    event.preventDefault();
    const { centralStore } = this.props;
 
    centralStore.showLoader()
    console.log("Error Message===>", this.state.errorMessage);
    if (!this.state.errorMessage) {
      await Auth.signIn(this.state.username, this.state.password)
        .then((userResponse) => {
          this.props.auth.setAuthStatus(true);
          this.props.auth.setUser(userResponse);
          centralStore.hideLoader()

          this.props.history.push("/home");
        })

        .catch((error) => {
         
          console.log(error.message);
          if(this.state.username && this.state.password===""){
            this.setState({errorMessage:"Password Cannot be Empty"})
            return
          }else{
          this.setState({ errorMessage: error.message });
          }
          centralStore.hideLoader()
        });
    }
    console.log(this.props.auth);
  };

  checkIsUserLoggedIn = () => {
    return (
      this.props &&
      this.props.auth &&
      this.props.auth.isAuthenticated &&
      this.props.auth.user
    );
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errorMessage: null,
    });
  };

  handleUserAuthorize = async (element) => {
    let cognitoUser = this.props.auth;
    if (this.props.auth.user) {
      cognitoUser = this.props.auth.user;
    }
    if (this.props.auth.user && this.props.auth.user.attributes) {
      cognitoUser = this.props.auth.user.attributes;
    }
    if (
      this.props.auth.user &&
      this.props.auth.user.signInUserSession.idToken.payload
    ) {
      cognitoUser = this.props.auth.user.signInUserSession.idToken.payload;
    }
    let userid_exist = false;
    if (cognitoUser["custom:userid"]) {
      userid_exist = cognitoUser["custom:userid"];
    }

    if (userid_exist) {
      console.log("exitLogin is True");
      this.props.history.push("/home");
    } else {
      let userid = uuidv4();
      console.log("userid", userid);
      let user = this.props.auth.user;
      const attributes = {
        "custom:userid": userid,
      };

      await Auth.updateUserAttributes(user, attributes);
      const users = await Auth.currentAuthenticatedUser({ bypassCache: true });
      this.props.auth.setUser(users);

      {
        let cognitoUser = this.props.auth;
        console.log("cognitoUser", cognitoUser);
        if (this.props.auth.user) {
          cognitoUser = this.props.auth.user;
        } else if (this.props.auth.user && this.props.auth.user.attributes) {
          cognitoUser = this.props.auth.user.attributes;
        }
        if (
          this.props.auth.user &&
          this.props.auth.user.signInUserSession.idToken.payload
        ) {
          cognitoUser = this.props.auth.user.signInUserSession.idToken.payload;
        }
        const parameters = {
          "custom:userid": userid,
        };
        console.log("parameters", parameters);
      }
    }
  };

  componentDidMount = () => {
    if (this.checkIsUserLoggedIn()) {
      this.handleUserAuthorize();
    } else {
      console.log("False");
    }
  };

  render() {
    return (
      <>
      
      <div className="login-wrapper">
         
        <div className="login-box-outer">
          <a href="/" className="login-logo">
            <img src={logo} alt="" className="img-fluid" />
          </a>
          <div className="login-box white-radius-box">
            <h5 className="box-heading text-center">Log In</h5>
            {
            this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage} </div>:null
  }
            <div className="login-fields">
              <div className="form-field">
                <TextField
                  label="Email"
                  fullWidth={true}
                  type="username"
                  id="username"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
              </div>
              <div className="form-field">
                <TextField
                  label="Password"
                  fullWidth={true}
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />{" "}
              </div>
              <div className="form-field text-center">
             
                <Link to="/ForgotPassword" className="link-forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={this.loginClick}>
                Log In
              </button>
            </div>
            <p className="already-member">
              Not a member?
              <Link to="/Signup">Sign Up</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
      </>
    );
  }
}
export default withRouter(Login);