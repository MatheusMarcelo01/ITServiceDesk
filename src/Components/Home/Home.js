import React from "react";
import backgroundImg from '../../Images/backgr.jpg';
import {  chakra,  Box,  useColorModeValue,  Flex,  Heading,  Button,  Stack,} from "@chakra-ui/react";

const Choc = () => {
  const bg = useColorModeValue("gray.800", "gray.800");

  return (
    <chakra.header>
      <chakra.nav bg={bg} shadow="base">
        
      </chakra.nav>

      <Box
      
        w="full"
        h="container.sm"
        bgPos="center"
        bgSize="cover"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          bg="blackAlpha.700"
        >
          
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              fontSize={["2xl", "3xl"]}
              fontWeight="semibold"
              color="white"
              textTransform="uppercase"
            >
              Abra agora o seu  {" "} 
              <chakra.span color="green.600" textDecor="underline">
              chamado  
              </chakra.span>{" "}
              de T.I
            </Heading>
            
            <Button
                    colorScheme="brand"
                    textTransform="uppercase"
                    w="fit-content"
                    bg="green.600" 
                    _hover={{ bg: 'green.800', transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease'}} 

                    onClick={() => {
                      window.location.href = './Chamado';
                    }}
                    >
                    Nova solicitação
            </Button>
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
};

export default Choc;