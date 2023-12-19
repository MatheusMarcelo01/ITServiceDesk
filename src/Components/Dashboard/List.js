import React from "react";
import { ButtonGroup,  Flex,  IconButton,  Table,  Tbody,  Td,  Th,  Thead,  Tr,  useColorModeValue,} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const Choc = () => {
  const header = ["name", "departamento", "actions"];
  const data = [
    { nome: "Julio", departamento: "Saude"},
    { nome: "João", departamento: "Saude" },
    { nome: "Maria", departamento: "Educação" },
    { nome: "Helena", departamento: "Saude" },
  ];
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

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
              >
                {Object.keys(token).map((x) => {
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
                        {token[x]}
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
                        <div>O problema ficara escrito aqui, quando você clicar neste botão azul!!</div>
                    </Popup>
                    


                    <IconButton
                      colorScheme="green"
                      icon={<AiFillEdit />}
                      aria-label="Edit"
                    />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                      aria-label="Delete"
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

export default Choc;