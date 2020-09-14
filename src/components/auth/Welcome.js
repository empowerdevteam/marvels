import React from 'react';


export default function Welcome() {
  return (
    <section className="section auth">
      <div className="container">
        <h1>Welcome!</h1>
        <p>You have successfully registered to the new account.</p>
        <p>We've sent you an email. Please check on the confirmation link to verify your account and Login</p>
        <a href="/" className="button is-light">
                     Home
                   </a>
      </div>
    </section>
  )
}