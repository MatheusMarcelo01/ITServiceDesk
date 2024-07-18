import { Formik, Field } from "formik";
import { Box, Button, Flex, FormControl, FormLabel, Select, Input, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect} from "react";

export default function App() {
  // eslint-disable-next-line
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [numChamados, setNumChamados] = useState(0);


  useEffect(() => {
    axios.get("http://192.168.0.162:3001/chamados")
      .then(response => {
        setNumChamados(response.data.length);
      })
      .catch(error => {
        console.error("Erro ao obter lista de chamados:", error);
      });
  }, []);

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
  
      axios.post("http://192.168.0.162:3001/chamados", values)
        .then(async (response) => {
          const novoChamadoId = response.data.id; // Supondo que o backend retorna o ID do novo chamado
          setNumChamados(numChamados + 1);
          
          // Montar o conteúdo do email e do modal com o número do protocolo
          const content = `
            Seu chamado foi criado com sucesso!<br/>
            O profissional responsável pelo seu atendimento será: <br /> 
            <strong>${tecnico}</strong>!<br /><br />
            <strong style="text-align: center;"><span style="font-size: 22px; color: red;">ATENÇÃO</span><br/>
            Você é o <span style="font-size: 20px; color: red;">${numChamados + 1}º</span> na fila de atendimento.</strong><br/><br/>
            Seu número de protocolo é: <span style="font-size: 20px; color: red;">${novoChamadoId}</span></strong><br/><br/>
            Aguarde retorno pelo seu e-mail institucional!<br/>
          `;
  
          handleOpenModal(content);
  
          // Enviar email
          await axios.post("http://192.168.0.162:3002/chamados", { ...values, tecnico }); 
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
                    <optgroup label="Gestão / Administrativo">
                      <option>Secretaria / Gabinete</option>
                      <option>Jurídico</option>
                      <option>Gestão</option>
                      <option>Compras / Contabilidade</option>
                      <option>Cadastro e Tributos</option>
                      <option>RH</option>
                      <option>Transportes Educação</option>
                      <option>Licitação</option>
                      <option>Tesouraria</option>
                      <option>Jurídico</option>
                      <option>Engenharia/Meio Ambiente</option>
                      <option>Banco do Povo/PROCON</option>
                      <option>Acessa/Correio SP São Berto</option>
                    </optgroup>
                    <optgroup label="Educação, Cultura e Esporte">
                      <option>Departamento de Educação</option>
                      <option>Departamento de Cultura e Esporte</option>
                      <option>Escola Hermelindo Prestes </option>
                      <option>Escola Zoroastro Alves</option>
                      <option>Creche Alice Menezes</option>
                      <option>Creche Arlette Meli </option>
                      <option>Escola José Manoel </option>
                      <option>Creche São Berto </option>

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

