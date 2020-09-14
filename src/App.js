import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
//import Navbar from './components/Navbar';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import Message from './components/auth/Message';
import LandingPage from './components/auth/LandingPage';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import { Auth } from 'aws-amplify';

class App extends Component {

  state={
  isAuthenticated:false,
  isAuthenticating:true,
  user:null
  }
  
  setAuthStatus=authenticated => {
  this.setState({isAuthenticated:authenticated})
  }
  
  setUser=user => {
  this.setState({
  user:user
  });
  }
  
  async componentDidMount(){
    try{
      const user = await Auth.currentAuthenticatedUser();
      console.log("user",user);
      this.setUser(user);
      const session = await Auth.currentSession();
    this.setAuthStatus(true);
    console.log(session);
  }catch(error){
    console.log(error);
  }
    this.setState({ isAuthenticating: false});
  }
  
  
  
  render() {
  
  const authProps={
  isAuthenticated:this.state.isAuthenticated,
  user:this.state.user,
  setAuthStatus:this.setAuthStatus,
  setUser:this.setUser
  
  }

  return (
  !this.state.isAuthenticating &&
  <div className="App">
  <Router>
  <Switch>
  <Route exact path="/Login" render={(props) => <LogIn {...props}auth={authProps}/>} />
  <Route exact path="/register" render={(props)=><Register {...props}auth={authProps}/>} />
  <Route exact path="/Welcome" render={(props)=><Welcome {...props}auth={authProps}/>} />
  <Route exact path="/Message" render={(props)=><Message {...props}auth={authProps}/>} />
  <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
  <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
  <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
  <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
  <Route exact path="/" render={(props)=><LandingPage {...props}auth={authProps}/>} />
  </Switch>
  </Router>
  </div>
  );
  }
  }
  
  export default App;