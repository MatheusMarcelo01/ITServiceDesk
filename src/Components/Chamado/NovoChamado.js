import React from 'react';
import Footer from '../Home/Footer';
import FormCall from './FormCall'
import NavbarChamado from './NavbarChamado'



function NovoChamado() {
    return (
      <div>
        <NavbarChamado/>
        <FormCall/>
        <Footer />
      </div>
    );
  }
  
  export default NovoChamado;