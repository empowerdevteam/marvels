import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';


class Message extends Component {

  checkIsUserLoggedIn = () => {
    return this.props && this.props.auth && this.props.auth.isAuthenticated && this.props.auth.user;
  }

    handleUserAuthorize = async (element) => {
        let cognitoUser = this.props.auth;
        console.log("cognitoUser",cognitoUser);
        if (this.props.auth.user){
          cognitoUser = this.props.auth.user;
        }
        if (this.props.auth.user && this.props.auth.user.attributes) {
          cognitoUser = this.props.auth.user.attributes;
        }
        if (this.props.auth.user && this.props.auth.user.signInUserSession.idToken.payload) {
            cognitoUser = this.props.auth.user.signInUserSession.idToken.payload;
        }
        let userid_exist = false;
        if (cognitoUser['custom:userid']){
          userid_exist = cognitoUser['custom:userid'];
        }
        
        if (userid_exist){
          // console.log("exitLogin is True")
          this.props.history.push("/Message");
        }else{
        let userid = uuidv4()
        console.log("userid",userid)
        let user = this.props.auth.user;
        const attributes = {
          'custom:userid': userid
        };
    
        await Auth.updateUserAttributes(user, attributes)
        const users = await Auth.currentAuthenticatedUser({ bypassCache: true });
        this.props.auth.setUser(users);
    
         {
          let cognitoUser = this.props.auth;
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
            'custom:userid': userid
          }
        }
      }
    }

componentDidMount() {
  const isUserLoggedIn = this.checkIsUserLoggedIn();
  if (isUserLoggedIn) {
     this.handleUserAuthorize();
  }
}  


    handleLogOut = async event => {
      event.preventDefault();
      try {
          localStorage.removeItem('userProfile');
          Auth.signOut();
          this.props.auth.setAuthStatus(false);
          this.props.auth.setUser(null);
          this.props.history.push("/");
      } catch (error) {
          console.log(error.message);
      }
  }
      
render() {
        return (
          <div><h1>Welcome!</h1>
          {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
          <p>You have successfully signed in.</p>
          {this.props.auth.isAuthenticated && (
                  <button onClick = {this.handleLogOut} className="button is-light">
                     Logout
                   </button>
                  )}
          
          </div>
    );
   }
 } 

 export default Message;