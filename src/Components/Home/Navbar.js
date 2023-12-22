import React from "react";



import {  chakra,  Box,  Flex,  useColorModeValue,  VisuallyHidden,  HStack, Button,  useDisclosure,
  VStack,  IconButton,  CloseButton,  InputGroup,  InputLeftElement, Input,  Avatar,} from "@chakra-ui/react";
import {  AiOutlineMenu,  AiFillHome,  AiOutlineInbox,  AiOutlineSearch,  AiFillBell,} from "react-icons/ai";
import { BsPhone, BsBriefcaseFill} from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import MinhaImagem from "../../Images/image.png"
import Logo from "../../Images/logo.png"


const Choc = () => {
  const bg = useColorModeValue("gray.800", "gray.200");
  const mobileNav = useDisclosure();
  
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        

        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
            
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu color="white" />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                  Dashboard
                </Button>

                <Button
                  w="full"
                  variant="solid"
                  colorScheme="ghost"
                  leftIcon={<AiFillHome color="white" />}
                >                  teste
                </Button>
                <Button
                  w="full"
                  variant="solid"
                  colorScheme="brand"
                  leftIcon={<AiOutlineInbox color="white" />}
                  
                >                  teste
                </Button>
                
              </VStack>
            </Box>


            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <chakra.img src={Logo} alt="Logo" boxSize="60px" objectFit="cover"_hover={{ transform: 'scale(1.05)',transition: 'transform 0.3s ease'}}/>

              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
                <Button variant="ghost" leftIcon={<BsBriefcaseFill/>}
                size="sm" color="white" _hover={{ bg: 'green.700',transform: 'scale(1.05)',
                transition: 'transform 0.3s ease' }} 
                onClick={() => {
                  window.location.href = './Login';
                }}
                > Administrador
                </Button>
             
              <Button
                variant="ghost" leftIcon={<BsPhone/>}size="sm" color='white'  
                _hover={{ bg: 'green.700',transform: 'scale(1.05)',
                transition: 'transform 0.3s ease'}} 
                onClick={() => {
                  window.open('https://www.manduri.sp.gov.br/fale-conosco/', '_black');
                }}

              > Contato
              </Button>

              <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<GrAddCircle />}
                size="sm" color='gray.800' bg= 'green.200' _hover={{ bg: 'green.600',transform: 'scale(1.05)',
                transition: 'transform 0.3s ease' }} 
                onClick={() => {
                  window.location.href = './Chamado';
                }}
              >Novo chamado
              </Button>

            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch color="white" />
              </InputLeftElement>
              <Input type="tel" placeholder="Pesquisar..." color="white" />
            </InputGroup>

            <chakra.a
              p={3}
              color="gray.200"
              _dark={{ color: "inherit" }}
              rounded="sm"
              
              _hover={{ color: "green.600", transform: "translateY(-2px) scale(1.05)",
              _dark: { color: "gray.600" } }
            }

            >
              <AiFillBell style={{ fontSize: "21px" }} />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            <Avatar
              size="sm"
              name="Prefeitura"
              src={MinhaImagem}
              style={{ height: '40px', width: '40px' }} 
            />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
export default Choc;