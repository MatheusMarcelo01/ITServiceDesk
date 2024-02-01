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
import axios from "axios";

function generateSequentialId() {
  const existingIds = [];
  const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  return newId;
}

export default function App() {

  return (
    <Flex bg="gray.900" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={["90%", 600]} h={["90%", 600]}>
        <Formik
          initialValues={{
            nome: "",
            departamento: "",
            sobre: "",
          }}
          onSubmit={(values, { resetForm }) => { 
            values.id = generateSequentialId();


            
            // Enviar os dados para o servidor usando axios
            axios.post("http://localhost:3001/chamados", values)
              .then(response => {
                console.log("Chamado criado com sucesso:", response.data);
                window.alert("Chamado criado com sucesso!");
                resetForm();

                // Você pode redirecionar o usuário ou realizar outras ações após o sucesso
              })
              .catch(error => {
                console.error("Erro ao criar chamado:", error);
              });
          }}
        >
          {({ handleSubmit }) => (
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
                  <Field
                    as={Select}
                    id="departamento"
                    name="departamento"
                    placeholder="Selecione o Departamento"
                  >
                    <option>Saúde</option>
                    <option>Educação, Cultura e Esporte</option>
                    <option>Assistência Social</option>
                    <option>Gestão</option>
                    <option>Outro</option>
                  </Field>
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
