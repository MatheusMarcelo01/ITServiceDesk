import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Styles from "./Consulta.module.css"; // Importe o arquivo CSS aqui

const List = () => {
  const [data, setData] = useState([]);
  const [completedId, setCompletedId] = useState(null); // Estado para controlar o ID do chamado completado
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false); // Estado para controlar a visibilidade da tabela
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://192.168.0.162:3001/chamados")
      .then((response) => {
        setData(response.data.map((item, index) => ({
          ...item,
          position: index === 0 ? "Em atendimento" : `${index + 1}º`, // Verifica se é o primeiro item na fila
        })));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do servidor:", error);
        setIsLoading(false);
      });

    axios
      .get("http://192.168.0.162:3001/finalizados")
      .then((response) => {
        // lógica de tratamento dos dados de finalizados
      })
      .catch((error) => {
        console.error("Erro ao obter dados de atendimentos finalizados:", error);
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
            setCompletedId(id); // Atualiza o estado completedId
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

  const header = ["ID", "Nome", "E-mail", "Tipo de problema", "Departamento", "Sobre o problema", "TI Responsável", "Posição na fila"];
  const reversedData = [...data].reverse();

  const filteredData = reversedData.filter((item) => {
    return searchId === "" || item.id.toString().toLowerCase().includes(searchId.toLowerCase());
  });

 const handleChangeSearch = (e) => {
    const { value } = e.target;
    
    // Verifica se o valor digitado tem o comprimento esperado (por exemplo, 4 caracteres)
    if (value.length === 4) {
      setSearchId(value);
      setShowTable(true);  // Mostra a tabela porque o ID foi digitado completamente
    } else {
      setSearchId(value);  // Atualiza o searchId com o valor atual, mesmo se não for 4 caracteres
      setShowTable(false);  // Esconde a tabela se o ID não estiver completo
    }
  };

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={5}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      Digite o ID do chamado:
      <Input
        type="text"
        placeholder="Digite o ID do chamado"
        value={searchId}
        onChange={handleChangeSearch}
        mb={4}
        w={{ base: "full", md: "auto" }}
      />

      {isLoading ? (
        <Text mt={4}>Carregando...</Text>
      ) : filteredData.length === 0 && searchId !== "" ? (
        <Text mt={4}>Nenhum chamado encontrado com o ID {searchId}.</Text>
      ) : (
        showTable && (
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
              {filteredData.map((token, tid) => {
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
                    className={token.id === completedId ? Styles.completed : ""}
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
                          <Td color={"gray.500"} fontSize="md" fontWeight="hairline">
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
                      
                        <Popup
                          position="left center"
                          variant="solid"
                          size="sm"
                          spacing={3}
                          trigger={
                            <IconButton
                              colorScheme="blue"
                              icon={<FaInfoCircle />}
                              aria-label="Detalhes"
                            />
                          }
                        >
                          <div>Data e hora do chamado: {token.data}</div>
                        </Popup>
                       
                      </ButtonGroup>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )
      )}
    </Flex>
  );
};

export default List;
