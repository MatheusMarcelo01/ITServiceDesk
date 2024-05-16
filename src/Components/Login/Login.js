import React from 'react';
import Footer from '../Home/Footer';
import FormLogin from './FormLogin'
import NavbarLogin from './NavbarLogin'



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