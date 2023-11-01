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
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
//Components
import Request_Accept from "./Request_Accept";
import Request_Reject from "./Request_Reject";

export default function Request_Main(id) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ID = id.id;
  const [req, setReq] = useState({});

  //get request details URL
  const URL = "http://localhost:3000/api/v1/donations/request/" + ID;

  //get request details
  const getRequestDetails = async () => {
    try {
      const response = await axios.get(URL);
      setReq(response.data);
      console.log(response.data);
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
            <Badge colorScheme="green">Pending</Badge>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack justifyContent={"flex-start"}>
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
                  <strong>Type : </strong>
                  {req.orgType}
                </Text>
                <Text>
                  <strong>Address : </strong>
                  {req.orgAddress}
                </Text>
                <Text>
                  <strong>Telephone : </strong>
                  {req.orgTelephone}
                </Text>
                <Text>
                  <strong>Email : </strong>
                  {req.orgEmail}
                </Text>
                <Text>
                  <strong>Description : </strong>
                  {req.description}
                </Text>
              </Stack>
              <Stack justifyContent={"flex-start"}>
                <Heading size="md">Request Person's Details</Heading>
                <Text>
                  <strong>Name : </strong>
                  {req.contactPersonName}
                </Text>
                <Text>
                  <strong>NIC : </strong>
                  {req.contactPersonNIC}
                </Text>
                <Text>
                  <strong>Telephone : </strong>
                  {req.contactPersonPhone}
                </Text>
                <Text>
                  <strong>Email : </strong>
                  {req.contactPersonEmail}
                </Text>
              </Stack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Request_Accept id={req.id} />
            <Request_Reject id={req.id} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
