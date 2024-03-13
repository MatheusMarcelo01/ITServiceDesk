import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function App() {
  return (
    
    
    <Flex bg="gray.900" align="center" justify="center" h="100vh">
   
      <Box bg="white" p={8} rounded="xl" w={["90%", 300]} h={["90%", 400]} >
        
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    borderColor="gray.600"

                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    borderColor="gray.600"

                    validate={(value) => {
                      let error;

                      if (value.length < 6) {
                        error = "Sua senha precisa ter no mínimo 6 caracteres";
                      }

                      return error;
                    }}

                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
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