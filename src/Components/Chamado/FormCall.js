import { Formik, Field } from "formik";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function App() {
  return (
    <Flex bg="gray.900" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={["90%", 600]}  h={["90%", 600]}>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="flex-start">
                <FormControl isRequired>
                  <FormLabel>Nome do solicitante:</FormLabel>
                  <Field
                    as={Input}
                    id="nome"
                    name="nome"
                    type="text"
                    variant="filled"
                    borderColor="gray.600"
                    placeholder="Seu nome"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Departamento</FormLabel>
                  <Select placeholder="Selecione o Departamento">
                    <option>Saúde</option>
                    <option>Educação, Cultura e Esporte</option>
                    <option>Assistência Social</option>
                    <option>Gestão</option>
                    <option>Outro</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Sobre o problema:</FormLabel>
                  <Field
                    as="textarea"
                    placeholder="Escreva um pouco sobre o problema que está enfrentando"
                    id="sobre"
                    name="sobre"
                    type="text"
                    variant="filled"
                    borderColor="gray.600"
                    style={{
                      width: "100%",
                      height: "200px",
                      padding: "10px",
                    }}
                  />
                </FormControl>

                <Button type="submit" colorScheme="green" width="full">
                  Enviar
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}