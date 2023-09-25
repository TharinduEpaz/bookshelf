import React from "react";
import {
  Box,
  Heading,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  InputLeftElement,
  InputGroup,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { FaUser, FaAddressBook } from "react-icons/fa";
import { BsFillSignpostFill, BsFillPinMapFill } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import { AiFillPhone } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { userContext } from "../../context/userContext";
import { useContext } from "react";

function Settings() {
  const [address, setAddress] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, setUser } = useContext(userContext);

  console.log(user);

  const toast = useToast();

  const handleShippingChange = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/changeShippingDetails",
        {
          address: address,
          postalCode: postalCode,
          city: city,
          phoneNumber: phoneNumber,
          province: province,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);
      setIsLoading(false);

      setAddress("");
      setPostalCode("");
      setCity("");
      setPhoneNumber("");
      setProvince("");


      return toast({
        title: "Shipping Details Changed",
        description: "Your shipping details have been changed",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  

  return (
    <>
      <Box
        position={"relative"}
        h={"100%"}
        borderRadius={"10px"}
        ml={2}
        p={5}
        border={"1px solid #E2E8F0"}
      >
        <Box>
          <Heading size="md"> Account Settings </Heading>
        </Box>
        <Divider mb={10}></Divider>
        <Card
          mb={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={10}
          p={10}
          backgroundColor={"gray.100"}
        >
          <Avatar name="Tharindu Dananjaya"></Avatar>
          <Heading size={"md"} fontWeight={"bold"}>
            Tharindu Dananjaya{" "}
          </Heading>
        </Card>
        <Accordion defaultIndex={[0]} allowMultiple mt={10}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Change Email
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Card mb={2}>
                <CardHeader fontWeight={"bold"}>
                  <Heading size={"md"} fontFamily={"Montserrat"}>
                    epazi550@gmail.com
                  </Heading>
                </CardHeader>
                <CardBody>
                  <form>
                    <FormControl>
                      <FormLabel>Enter New Email</FormLabel>
                      <Input placeholder="Email" w={400} />
                    </FormControl>
                    <Flex justify="flex-start" mt={5}>
                      <Button type="submit" size={"sm"} colorScheme="gray">
                        Change Email
                      </Button>
                    </Flex>
                  </form>
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Change Password
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Card>
                <CardBody>
                  <form onSubmit={handleShippingChange}>
                    <FormControl>
                      <Input placeholder="Current Password" w={400} mt={5} />
                    </FormControl>
                    <FormControl>
                      <Input placeholder="New Password" w={400} mt={5} />
                    </FormControl>
                    <FormControl>
                      <Input placeholder="Confirm Password" w={400} mt={5} />
                    </FormControl>

                    <Flex justify="flex-start" mt={5}>
                      <Button type="submit" size={"sm"}>
                        Change Password
                      </Button>
                    </Flex>
                  </form>
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Add / Change Shipping and Billing Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Card>
                <CardBody>
                  <form onSubmit={handleShippingChange}>
                    <FormControl>
                      <InputGroup mt={5}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FaAddressBook />}
                        />

                        <Input
                          placeholder="Enter New Address"
                          w={"90%"}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup mt={5}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BsFillSignpostFill />}
                        />
                        <Input
                          placeholder="Enter New Postal Code"
                          w={400}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </InputGroup>

                      <InputGroup mt={5}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BiSolidCity />}
                        />
                        <Input
                          placeholder="Enter City"
                          w={400}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup mt={5}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BsFillPinMapFill />}
                        />

                        <Input
                          placeholder="Enter Province"
                          w={400}
                          onChange={(e) => setProvince(e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup mt={5}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<AiFillPhone />}
                        />
                        <Input
                          placeholder="Enter Phone Number"
                          w={400}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>

                    <Flex justify="flex-start" mt={5}>
                      <Button type="submit" size={"sm"} colorScheme="purple" ml={'auto'}>
                        {isLoading ? " " : "Change Shipping Details"}
                        {isLoading ? <Spinner /> : null}
                      </Button>
                    </Flex>
                  </form>
                </CardBody>
              </Card>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
}

export default Settings;
