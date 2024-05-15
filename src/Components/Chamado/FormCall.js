import { Formik, Field } from "formik";
import {  Box,  Button,  Flex,  FormControl,  FormLabel,  Select,  Input,  VStack,} from "@chakra-ui/react";
import axios from "axios";
import { connectToDatabase } from "./../../api"; // Importa a função connectToDatabase do seu arquivo de conexão com o MongoDB
import { useState } from "react";





export default function App() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);

    try {
      console.log("Valores do formulário:", values); // Adiciona um log dos valores do formulário
      const db = await connectToDatabase(); // Conecta ao banco de dados MongoDB
      console.log("Conexão estabelecida com o MongoDB");
      const Chamado = db.model("Chamado");

      // Adicionando a data e hora da solicitação
      values.data = new Date().toLocaleString();

      console.log("Dados a serem salvos:", values); // Adiciona um log dos dados a serem salvos

      // Salva o chamado no banco de dados
      await Chamado.create(values);

      // Exibe mensagem de sucesso
      window.alert("Chamado criado com sucesso!\n O profissional que fará seu atendimento é: Matheus Marcelo! \n Aguarde contato pelo ramal ou Whatsapp!");
      resetForm();
      window.location.href = '/';
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <Flex bg="gray.900" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={["90%", 600]} h={["90%", 650]}>
        <Formik
          initialValues={{
            nome: "",
            tipo: "",
            departamento: "",
            sobre: "",
          }}
          onSubmit={(values, { resetForm }) => { 
            values.data = new Date().toLocaleString(); // Adicionando a data e hora da solicitação
          
            // Verificar o tipo de problema selecionado
            if (values.tipos === "Problema com softwares (office, sistema, etc.)" || values.tipos === "Liberação de site bloqueado (para curso como Youtube, etc)" ) {
              // Se for um problema de software, exibir uma mensagem específica
              window.alert("Chamado criado com sucesso!\n O profissional que fará seu atendimento é: João Luiz \n Aguarde contato pelo ramal ou Whatsapp!");
              resetForm();
              window.location.href = '/' ;
            } else {
              // Enviar os dados para o servidor usando axios
              axios.post("http://localhost:3001/chamados", values)
                .then(response => {
                  console.log("Chamado criado com sucesso:", response.data);
                  window.alert("Chamado criado com sucesso!\n O profissional que fará seu atendimento é: Matheus Marcelo! \n Aguarde contato pelo ramal ou Whatsapp!");
                  resetForm();
                  window.location.href = '/' ;
                })
                .catch(error => {
                  console.error("Erro ao criar chamado:", error);
                });
            }
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

                <FormControl isRequired>
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
                  <FormLabel>Tipo de problema</FormLabel>
                  <Field
                    as={Select}
                    id="tipos"
                    name="tipos"
                    placeholder="Selecione o tipo de problema"
                  >
                      <option>Problema com internet</option>
                      <option>Problema com sites da internet</option>
                      <option>Problema com serviço de e-mail</option>
                      <option>Problema com hardware (computador não liga, não funciona)</option>
                      <option>Problema com softwares (office, sistema, etc.)</option>
                      <option>Problema com servidor de arquivos</option>
                      <option>Liberação de site bloqueado (para curso como Youtube, etc)</option>
                      <option>Problema com impressoras</option>
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
