import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import { validateForm }  from "../utility/FormValidation";
import { Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";

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
      <div className="login-wrapper">
      <div className="login-box-outer">
        <a href="index.html" className="login-logo">
          {/* <img src={logo} alt="" className="img-fluid" /> */}
        </a>
        <div className="login-box white-radius-box">
          <h5 className="box-heading text-center">
            Forgot
            <br />
            Password
          </h5>
          <div className="login-fields">
            <div className="form-field">
              <TextField type="text" label="Full Name" fullWidth={true} />
            </div>
          </div>
          <div>
            <button className="btn btn-primary">Submit</button>
          </div>
          <p className="already-member">
            <Link to="/Login">Back</Link>
          </p>
        </div>
      </div>
    </div>



      // <section className="section auth">
      //   <div className="container">
      //     <h1>Forgot your password?</h1>
      //     <p>
      //       Please enter the email address associated with your account and we'll
      //       email you a password reset link.
      //     </p>
      //     <FormErrors formerrors={this.state.errors} />

      //     <form onSubmit={this.forgotPasswordHandler}>
      //       <div className="field">
      //         <p className="control has-icons-left has-icons-right">
      //           <input
      //             type="email"
      //             className="input"
      //             id="email"
      //             aria-describedby="emailHelp"
      //             placeholder="Enter email"
      //             value={this.state.email}
      //             onChange={this.onInputChange}
      //           />
      //           <span className="icon is-small is-left">
      //             <i className="fas fa-envelope"></i>
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
      //             Submit
      //           </button>
      //         </p>
      //       </div>
      //     </form>
      //   </div>
      // </section>
    );
  }
}

export default ForgotPassword;