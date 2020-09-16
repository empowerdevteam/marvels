import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import { validateForm }  from "../utility/FormValidation";
import { Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import logo from "../../assets/images/dropzne.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/style.css"

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  forgotPasswordHandler = async event => {
    console.log("Forget Password Handler called")
    event.preventDefault();

  //  Form validation
    this.clearErrorState();
    const error = validateForm(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push('/forgotpasswordverification');
    }catch(error) {
      console.log(error);
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
      <div className="wrapper">
      <div className="landing d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 d-flex justify-content-center flex-column align-items-sm-center">
      <a href="/" className="login-logo">
                      <img src={logo} alt="" />
                    </a>
             
                  <div className="white-radius-box box">
                  
                  
          <div className="login-fields">
          
          
            <div className="form-field">
            <h5 className="box-heading text-center">Forgot Password</h5>
              <TextField type="text" label="Full Name" fullWidth={true} />
            </div>
          </div>
          <div class="mt-5 field">
                          <button className="btn btn-purple w-100 control">Submit</button>
                      </div>
          <p className="already-member text-center mt-4 mb-0">
            <Link to="/Login">Back</Link>
          </p>
        </div>
      </div>
    </div> 

</div>
         



    /* <section className="section auth"> 
       <div className="container">
         <h1>Forgot your password?</h1>
          <p>
           Please enter the email address associated with your account and we'll
          email you a password reset link.
         </p>
       <FormErrors formerrors={this.state.errors} />

        <form onSubmit={this.forgotPasswordHandler}>

         <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="email"
                  className="input"
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
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Submit
                </button>
              </p>
            </div>
            </form>
            </div>
            </section> 
            </div>*/
       
         
         
        
          
        
        
      
    
    );
  }
}

export default ForgotPassword;