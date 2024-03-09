import React from 'react';
import { ChakraProvider,  Box, extendTheme,} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';





import Homepage from './Components/Home/Homepage'
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Chamado from './Components/Chamado/NovoChamado'
import Historico from './Components/Historico/Historico'



const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });


function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
          <Box> 
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/chamado" element={<Chamado/>} />

             </Routes>
            
          </Box>
      </ChakraProvider>

    </Router>
    

   
  );
}

export default App;
