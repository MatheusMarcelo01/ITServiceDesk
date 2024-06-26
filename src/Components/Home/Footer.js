
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import Logo from "../../Images/logo.png"; 

const CompanyFooter = () => {
  return (
    <Box bg="gray.800" _dark={{ bg: "gray.600" }}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        w="full"
        justify="space-between"
        p={10}
      >
        <Flex justify="center">
          
          <Image
            src= {Logo}
            alt="Logo"
            rounded="lg"
            _hover={{ transform: 'scale(1.05)',transition: 'transform 0.3s ease'}}
            width={{ base: "60px", lg: "60px" }}
            height={{ base: "60px", lg: "60px" }}
            my={{ base: 2, lg: 0 }}
            
          
          />
         
        </Flex>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{ base: "12px", md: "16px" }}
          color="white"
          _dark={{ color: "white" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Flex justify="start" direction="column">
          <Link href="../Login" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Painel de Administração</Link>
          <Link href="../Login" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Consultar chamados</Link>


          </Flex>
          <Flex justify="start" direction="column">
            
          <Link href="../Chamado" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Abrir novo chamado</Link>
          <Link href="../Chamado" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Ajuda com os chamados</Link>

          </Flex>
        </HStack>
        <HStack
          alignItems="start"
          flex={1}
          justify="space-around"
          fontSize={{ base: "12px", md: "16px" }}
          color="white"
          _dark={{ color: "white" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Flex justify="start" direction="column">
          <Link href="https://www.manduri.sp.gov.br/" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Site Prefeitura Municipal</Link>
          <Link href="https://www.manduri.sp.gov.br/webmail/" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>E-mail</Link>

          </Flex>
          <Flex justify="start" direction="column">
            <Link href="https://www.manduri.sp.gov.br/fale-conosco/" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Contato</Link>
            <Link href="https://www.google.com/maps/place/23%C2%B000'12.5%22S+49%C2%B019'08.3%22W/@-23.003464,-49.3189715,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-23.003464!4d-49.3189715?entry=ttu" isExternal _hover={{ color: "green.600", transform: "translateX(5px)", _dark: { color: "gray.600" } }}>Localização</Link>



          </Flex>
        </HStack>
      </Stack>
      <Divider
        w="95%"
        mx="auto"
        color="gray.200"
        _dark={{ color: "#F9FAFB" }}
        h="3.5px"
      />



      <VStack py={3}>
        <HStack justify="center">
          <Link href="https://www.facebook.com/prefeituramunicipaldemanduri/?locale=pt_BR" isExternal>
            <Icon
              color="white"
              _dark={{ color: "white" }}
              h="20px"
              w="20px"
              as={FaFacebookF}
              _hover={{ color: "green.600", _dark: { color: "gray.600" } }}
              
            /> 
          </Link>
          <Link href="https://www.manduri.sp.gov.br/" isExternal>
            <Icon
              color="white"
              _dark={{ color: "white" }}
              h="20px"
              w="20px"
              as={CgWebsite}
              _hover={{ color: "green.600", _dark: { color: "gray.600" } }}
            />
          </Link>
        
        </HStack>
        <Text textAlign="center" fontSize="smaller" color="white" _hover={{ color: "green.600", _dark: { color: "gray.600" } }}>
            Desenvolvido por <a href="https://github.com/MatheusMarcelo01/ITServiceDesk">Matheus Marcelo</a>&copy; Todos os direitos reservados.
        </Text>

      </VStack>
    </Box>
  );
};

export default CompanyFooter;