import React, { useState, useEffect } from "react";
import { ButtonGroup, Flex, IconButton, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import Styles from './List.module.css'; // Importe o arquivo CSS aqui




const List = () => {
  const [data, setData] = useState([]);
  const [completedId, setCompletedId] = useState(null);
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  useEffect(() => {
    axios.get('http://localhost:3001/chamados')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter dados do servidor:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (completedId === id) {
        setCompletedId(null); // Desmarcar o chamado se já estiver marcado
    } else {
        setCompletedId(id); // Marcar o chamado se não estiver marcado
    }
};

  const header = ["ID", "Nome", "departamento", "Sobre o problema"];

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
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
          {data.map((token, tid) => {
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
                    <Popup position="right center" variant="solid" size="sm" spacing={3}  trigger={ 
                        <IconButton
                            colorScheme="blue"
                            icon={<FaInfoCircle />}
                            aria-label="Up"
                         />} >
                        <div>Data e hora do chamado: {token.data}</div>
                    </Popup>
                    
                    <IconButton
                      colorScheme="green"
                      variant="outline"
                      icon={<BsCheck />                    }
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
