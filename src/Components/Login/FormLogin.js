import React from "react";
import { Formik, Field } from "formik";
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import users from "./users"; // Importa os dados dos usuários



export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Verifica se as credenciais correspondem a algum usuário na lista importada
    const matchedUser = users.find(user => user.username === values.user && user.password === values.password);
  
    if (matchedUser) {
      // Define o token de autenticação no localStorage
      localStorage.setItem("token", matchedUser.token);
      // Redireciona para o dashboard
      navigate("/dashboard");
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  };
  

  return (
    <Flex bg="gray.900" align="center" justify="center" h="100vh">
      <Box bg="white" p={8} rounded="xl" w={["90%", 300]} h={["90%", 400]} >
        <Formik
          initialValues={{
            user: "",
            password: "",
            rememberMe: false
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="user">Usuário</FormLabel>
                  <Field
                    as={Input}
                    id="user"
                    name="user"
                    type="user"
                    variant="filled"
                    borderColor="gray.600"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    borderColor="gray.600"
                  />
                </FormControl>
                <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  colorScheme="green"
                >
                  Lembrar senha?
                </Field>
                <Button type="submit" colorScheme="green" width="full">
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
