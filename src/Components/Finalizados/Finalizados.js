import React, { useState, useEffect } from "react";
import {  Flex,  Table,  Tbody,  Td,  Th,  Thead,  Tr,} from "@chakra-ui/react";

const Choc = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("http://192.168.0.98:3001/finalizados")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

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
            {Object.keys(data[0] || {}).map((key) => (
              <Th key={key}>{key}</Th>
            ))}
            <Th></Th>
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
                {Object.keys(token).map((key) => (
                  <Td key={`${tid}${key}`} color={"gray.500"} fontSize="md" fontWeight="hairline">
                    {token[key]}
                  </Td>
                ))}
                
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default Choc;
