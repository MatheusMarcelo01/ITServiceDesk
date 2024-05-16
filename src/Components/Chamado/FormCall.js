import { Formik, Field } from "formik";
import { Box, Button, Flex, FormControl, FormLabel, Select, Input, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.href = '/'; // Redirecionar para a home
  };


  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);

    try {
      values.data = new Date().toLocaleString();
      let tecnico = "Matheus Marcelo";
      if (values.tipos === "Liberação de site bloqueado (para curso como Youtube, etc)" || values.tipos === "Problema com softwares (office, sistema, etc.)") {
        tecnico = "João Luiz"; 
      }
      values.tecnico = tecnico;

      axios.post("http://localhost:3001/chamados", values)
        .then(response => {
          
          const content = `Chamado criado com sucesso!<br />O profissional que fará seu atendimento é: <br /> <strong>${tecnico}</strong>!<br />Aguarde retorno pelo ramal ou E-mail!`;
          handleOpenModal(content);
          //resetForm();
          // window.location.href = '/'; // Evite redirecionar automaticamente, pode ser confuso para o usuário
        })
        .catch(error => {
          console.error("Erro ao criar chamado:", error);
        });
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex bg="gray.900" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={["90%", 600]} h={["90%", 700]}>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            tipos: "", 
            departamento: "",
            sobre: "",
          }}
          onSubmit={handleSubmit}
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
                  <FormLabel>E-mail Institucional:</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    borderColor="gray.600"
                    placeholder="Digite o e-mail institucional do seu departamento"
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
                  <FormLabel>Tipo de solicitação</FormLabel>
                  <Field
                    as={Select}
                    id="tipos"
                    name="tipos"
                    placeholder="Selecione o tipo de solicitação"
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
                  <FormLabel>Descreva o problema:</FormLabel>
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
        {/* Modal */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informações do Chamado</ModalHeader>
          <ModalCloseButton />
          <ModalBody dangerouslySetInnerHTML={{ __html: modalContent }} />

            
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </Flex>
  );
}
