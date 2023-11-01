import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  HStack,
  Stack,
  Text,
  Badge,
  Heading,
  UnorderedList,
  ListItem,
  Table,
  Tr,
  Td
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
//Components
import DonRequest_Accept from "./DonRequest_Accept";
import DonRequest_Reject from "./DonRequest_Reject";

export default function Request_Main(id) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ID = id.id;
  const [req, setReq] = useState({});

  //get request details URL
  const URL = "http://localhost:3000/api/v1/donationRequests/" + ID;

  //get request details
  const getRequestDetails = async () => {
    try {
      const response = await axios.get(URL);
      setReq(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button
        m={1}
        colorScheme="blue"
        onClick={() => {
          onOpen();
          getRequestDetails();
        }}
      >
        View
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={"fit-content"}>
          <ModalHeader>
            Organization Registration Request{" "}
            <Badge colorScheme="green">{req.approval}</Badge>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mr={10}>
              <Heading size="md">Organization Details</Heading>
              <Text>
                <strong>Name : </strong>
                {req.orgName}
              </Text>
              <Text>
                <strong>Registration Number : </strong>
                {req.orgRegisteredNumber}
              </Text>
              <Text>
                <strong>Order Items : </strong>
              </Text>
              <Table>
              {req.requestedItems &&
                  req.requestedItems.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.title}</Td>
                      <Td>{item.ISBN}</Td>
                      <Td>{item.price}</Td>
                    </Tr>
                  ))}
              </Table>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <DonRequest_Accept id={req.id} />
            <DonRequest_Reject id={req.id} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
