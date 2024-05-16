import { Box, Text, Link, Flex, Icon } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const FaleConosco = () => {
  return (
    <Box
      bg="gray.100"
      p={6}
      borderRadius="md"
      boxShadow="md"
      maxW="500px"
      mx="auto"
      minHeight="500px"
    >
      <Text fontSize="xl" fontWeight="bold" mb={10}>Informações de Contato</Text>

      <Flex align="center" mb={2}>
        <Icon as={FaMapMarkerAlt} color="blue.500" boxSize={6} mr={2} />
        <Text fontSize="md">Local: Rua Bahia nº233, Centro - Cidade de Manduri</Text>
      </Flex>

      <Flex align="center" mb={2}>
        <Icon as={FaPhoneAlt} color="blue.500" boxSize={6} mr={2} />
        <Text fontSize="md">Telefone: <Link href="tel:+551433569200">14 3356-9200</Link></Text>
      </Flex>

      <Flex align="center" mb={2}>
        <Icon as={FaClock} color="blue.500" boxSize={6} mr={2} />
        <Text fontSize="md">Atendimento: Segunda a Sexta das 8h às 12h e das 13h às 17h</Text>
      </Flex>

      <Text fontSize="md" mt={4}>
        Repositório do sistema open-source para colaborações: {" "}
        <Link href="https://github.com/MatheusMarcelo01/ITServiceDesk" target="_blank" rel="noopener noreferrer">Repositório no GitHub</Link>
      </Text>
    </Box>
  );
}

export default FaleConosco;
