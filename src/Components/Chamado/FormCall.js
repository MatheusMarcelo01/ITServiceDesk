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
            
            values.data = new Date().toLocaleString(); // Adicionando a data e hora da solicitação
            // Enviar os dados para o servidor usando axios
            axios.post("http://localhost:3001/chamados", values)
              .then(response => {
                console.log("Chamado criado com sucesso:", response.data);
                window.alert("Chamado criado com sucesso!\nEntraremos em contato com seu número de ramal ou WhatsApp em breve!");
                resetForm();
                window.location.href = '/' ;


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
                  <FormLabel>Departamento do solicitante</FormLabel>
                  <Field
                    as={Select}
                    id="departamento"
                    name="departamento"
                    placeholder="Selecione o Departamento"
                  >
                    <optgroup label="Saúde">
                      <option>Policlínica</option>
                      <option>Departamento de Saúde/Vigilância</option>
                      <option>UBS Ademar Holtz</option>
                      <option>UBS Maria Inês</option>
                      <option>Farmácia</option>
                      <option>Posto São Bartolomeu</option>
                      <option>Fisioterapia</option>

                    </optgroup>
                    <optgroup label="Gestão">
                      <option>Prefeitura</option>
                      <option>Jurídico</option>
                      <option>Engenharia/Meio Ambiente</option>
                      <option>Banco do Povo/PROCON</option>
                      <option>Acessa/Correio SP São Berto</option>


                    </optgroup>
                    <optgroup label="Educação, Cultura e Esporte">
                      <option>Departamento de Educação</option>
                      <option>Departamento de Cultura e Esporte</option>
                      <option>Escola Hermelindo </option>
                      <option>Escola Zoroastro </option>
                      <option>Creche Alice </option>
                      <option>Creche Arlette </option>
                      <option>Creche José Manoel </option>
                    </optgroup>
                   
                    <optgroup label="Assistência Social">
                      <option>Departamento de Assistência Social</option>
                      <option>CRAS</option>
                      <option>Conselho Tutelar</option>
                      <option>Fundo Social</option>
                    </optgroup>

                    <optgroup label="Outros">
                      <option>Outro Departamento</option>
                    </optgroup>

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
