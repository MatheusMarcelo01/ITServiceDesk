import React from 'react';
import Footer from '../Home/Footer';
import FormCall from '../Chamado/FormCall'
import NavbarChamado from '../Chamado/NavbarChamado'



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