import React from 'react';
import Footer from '../Home/Footer';
import FormLogin from '../Login/FormLogin'
import NavbarLogin from '../Login/NavbarLogin'



function Login() {
    return (
      <div>
        <NavbarLogin/>
        <FormLogin/>
        <Footer />
      </div>
    );
  }
  
  export default Login;