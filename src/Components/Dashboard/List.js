import React, { useState, useEffect } from "react";
import { ButtonGroup, Flex, IconButton, Table, Tbody, Box, Text,Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { BsCheck,BsFillTrashFill, BsCheckCircle, BsTools } from "react-icons/bs";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import Styles from './List.module.css'; // Importe o arquivo CSS aqui

const List = () => {
  const [data, setData] = useState([]);
  const [pendingByMatheus, setPendingByMatheus] = useState(0);
  const [pendingByJoao, setPendingByJoao] = useState(0);
  const [completedByMatheus, setCompletedByMatheus] = useState(0);
  const [completedByJoao, setCompletedByJoao] = useState(0);
  // eslint-disable-next-line
  const [completedId, setCompletedId] = useState(null);
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  useEffect(() => {
    axios.get('http://192.168.0.162:3001/chamados')
      .then(response => {
        //orde dos itens
        setData(response.data.map((item, index) => ({
          ...item,
          position: index === 0 ? "Em atendimento" : `${index + 1}º`, // Verifica se é o primeiro item na fila
        })));
        const matheusPending = response.data.filter(item => item.tecnico === "Matheus Marcelo" && !item.completed).length;
        const joaoPending = response.data.filter(item => item.tecnico === "João Luiz" && !item.completed).length;

        console.log("Chamados abertos para Matheus:", matheusPending); 
        console.log("Chamados abertos para João:", joaoPending); 
        
        setPendingByMatheus(matheusPending);
        setPendingByJoao(joaoPending);
      })
      .catch(error => {
        console.error('Erro ao obter dados do servidor:', error);
      });

    axios.get('http://192.168.0.162:3001/finalizados')
      .then(response => {
        const matheusCompleted = response.data.filter(item => item.tecnico === "Matheus Marcelo").length;
        const joaoCompleted = response.data.filter(item => item.tecnico === "João Luiz").length;

        console.log("Atendimentos finalizados por Matheus:", matheusCompleted); 
        console.log("Atendimentos finalizados por João:", joaoCompleted); // Adicionando um log para verificar a contagem de atendimentos finalizados por João
        setCompletedByMatheus(matheusCompleted);
        setCompletedByJoao(joaoCompleted);
      })
      .catch(error => {
        console.error('Erro ao obter dados de atendimentos finalizados:', error);
      });
  }, []);

  const handleComplete = (id) => {
    const confirmComplete = window.confirm("Esse chamado foi finalizado com sucesso!");

    const item = data.find(item => item.id === id);
    if (!item) {
      return;
    }
  
    axios.post('http://192.168.0.162:3001/finalizados', item)
      .then(response => {
        console.log('Chamado movido para finalizados:', response.data);
        axios.delete(`http://192.168.0.162:3001/chamados/${id}`)
          .then(() => {
            console.log('Chamado removido da lista de chamados');
            setData(data.filter(item => item.id !== id));
          })
          .catch(error => {
            console.error('Erro ao remover chamado da lista de chamados:', error);
          });
      })
      .catch(error => {
        console.error('Erro ao mover chamado para finalizados:', error);
      });
  };
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Deseja realmente excluir este chamado?");
  
    if (confirmDelete) {
      axios.delete(`http://192.168.0.162:3001/chamados/${id}`)
        .then(response => {
          console.log('Chamado deletado:', response.data);
          setData(data.filter(item => item.id !== id));
        })
        .catch(error => {
          console.error('Erro ao deletar chamado:', error);
        });
    }
  };

  const header = ["ID", "Nome", "E-mail", "Tipo de problema", "Departamento", "Sobre o problema", "TI Responsável", "Fila"];
  const reversedData = [...data].reverse(); // Criar uma cópia reversa dos dados

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >


<Flex mt="-10" ml="1000" flexDirection={{ base: "column", md: "row" }} justifyContent="center" alignItems="center">
  <Box mb={4} border="2px solid #E2E8F0" borderRadius="md" p={4} textAlign="center">
    <Text fontWeight="bold" mb={2}>Chamados Matheus:</Text>
    <Flex align="center">
      <BsTools />
      <Text ml={1} mr={1}>Chamados abertos:</Text>
      <Text color="red">{pendingByMatheus}</Text>
    </Flex>
    <Flex align="center" mt={2}>
      <BsCheckCircle />
      <Text ml={1} mr={1}>Chamados finalizados:</Text>
      <Text color="blue">{completedByMatheus}</Text>
    </Flex>
  </Box>
  <Box mb={4} border="2px solid #E2E8F0" borderRadius="md" p={4} textAlign="center">
    <Text fontWeight="bold" mb={2}>Chamados João:</Text>
    <Flex align="center">
      <BsTools />
      <Text ml={1} mr={1}>Chamados abertos:</Text>
      <Text color="red">{pendingByJoao}</Text>
    </Flex>
    <Flex align="center" mt={2}>
      <BsCheckCircle />
      <Text ml={1} mr={1}>Chamados finalizados:</Text>
      <Text color="blue">{completedByJoao}</Text>
    </Flex>
  </Box>
</Flex>


      



      <Table
        w="full"
        bg="white"
        _dark={{ bg: "gray.800" }}
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        {/* Cabeçalho da tabela */}
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        {/* Corpo da tabela */}
        <Tbody
          display={{
            base: "block",
            lg: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {reversedData.map((token, tid) => {
            const { data, ...otherData } = token;

            return (
              <Tr
                key={tid}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
                className={token.id === completedId ? Styles.completed : ''}
              >
                {/* Renderizando dados da linha */}
                {Object.keys(otherData).map((x) => {
                  return (
                    <React.Fragment key={`${tid}${x}`}>
                      <Td
                        display={{
                          base: "table-cell",
                          md: "none",
                        }}
                        sx={{
                          "@media print": {
                            display: "none",
                          },
                          textTransform: "uppercase",
                          color: color1,
                          fontSize: "xs",
                          fontWeight: "bold",
                          letterSpacing: "wider",
                          fontFamily: "heading",
                        }}
                      >
                        {x}
                      </Td>
                      <Td
                        color={"gray.500"}
                        fontSize="md"
                        fontWeight="hairline"
                      >
                        {otherData[x]}
                      </Td>
                    </React.Fragment>
                  );
                })}
                {/* Ações */}
                <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: color2,
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
                <Td>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="green"
                      variant="outline"
                      icon={<BsCheck />}
                      aria-label="Delete"
                      onClick={() => handleComplete(token.id)}
                    />
                    <Popup position="left center" variant="solid" size="sm" spacing={3}  trigger={ 
                      <IconButton
                        colorScheme="blue"
                        icon={<FaInfoCircle />}
                        aria-label="Up"
                      />} >
                      <div>Data e hora do chamado: {token.data}</div>
                    </Popup>
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                      aria-label="Delete"
                      onClick={() => handleDelete(token.id)}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default List;
