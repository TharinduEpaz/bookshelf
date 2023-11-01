import React from "react";
import {
  Box,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Badge,
  Stack,
  Text,
  Image,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { BiSolidDetail } from "react-icons/bi";
import axios from "axios";

export default function ViewOrder(id) {
  const orderId = id.id;
  const [orderData, setOrderData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orderURL = "http://localhost:3000/api/v1/orders/" + orderId;

  const getOrder = async () => {
    try {
      axios.get(orderURL).then((response) => {
        // Handle the successful response
        const orderData = response.data;
        setOrderData(orderData);
        getUser(orderData.user_id);
        console.log("Retrieved order:", orderData);
        // You can further process the order data here
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUser = async (userId) => {
    const userURL = "http://localhost:3000/api/v1/users/" + userId;
    try {
      axios.get(userURL).then((response) => {
        // Handle the successful response
        const userData = response.data;
        setUserData(userData);
        console.log("Retrieved user:", userData);
        // You can further process the user data here
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Box bgColor={"green.500"} pt={1} px={1} borderRadius={4}>
        <Icon
          as={BiSolidDetail}
          onClick={() => {
            onOpen();
            getOrder();
          }}
          fontSize={"md"}
          color={"white"}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={"fit-content"}>
          <ModalHeader>Order details - {orderData.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack gap={500} mb={5}>
              <HStack>
                <Badge colorScheme="green">
                  {orderData.isPaid ? "Paid" : "Not Paid"}
                </Badge>
                <Badge colorScheme="green">{orderData.orderStatus}</Badge>
              </HStack>
              <Stack>
                <Text>
                  Order Date :{" "}
                  {new Date(orderData.orderDate).toLocaleDateString()}
                </Text>
              </Stack>
            </HStack>
            <Text fontWeight={"bold"}>Contact Details</Text>
            <Stack mt={5} mb={10}>
              {orderData.user_id ? (
                <Text>
                  Customer ID:{" "}
                  {"User_" +
                    (orderData.user_id.slice(0, 5).toUpperCase() || "INVALID")}
                </Text>
              ) : (
                <Text>Customer ID is not provided</Text>
              )}

              <Text>
                Customer Name : {userData.firstName + " " + userData.lastName}
              </Text>
              <Text>Email : {userData.email}</Text>
              <Text>Phone : {orderData.phone}</Text>
              <Text>
                {orderData && orderData.address && (
                  <Text>
                    Address :{" "}
                    {orderData.address.line1 +
                      ", " +
                      orderData.address.line2 +
                      ", " +
                      orderData.address.city +
                      ", " +
                      orderData.address.state +
                      ", " +
                      orderData.address.country +
                      ", " +
                      orderData.address.postal_code}
                  </Text>
                )}
              </Text>
            </Stack>

            <Text fontWeight={"bold"}>Order Items</Text>
            {orderData &&
              orderData.orderItems &&
              orderData.orderItems.map((item, index) => (
                <div key={index}>
                  <Card mb={5}>
                    <CardBody>
                      <HStack>
                        <Image h={100} mr={10} src={item.image} alt={""} />
                        <Stack>
                          <Text>Book Name: {item.title}</Text>
                          <Text>Price: {item.price}</Text>
                          <Text>Quantity: {item.amount}</Text>
                        </Stack>
                      </HStack>
                    </CardBody>
                  </Card>
                </div>
              ))}
            <Text fontWeight={"bold"}>
              Total Price : {orderData.totalPrice}
            </Text>
          </ModalBody>

          <ModalFooter>
            {orderData.orderStatus === "Shipped" ? null : (
              <>
                <Button colorScheme="blue" mr={5}>
                  Ready to Ship
                </Button>
              </>
            )}
            <Button varient="ghost" colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
