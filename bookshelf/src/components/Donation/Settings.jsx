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
} from "@chakra-ui/react";

function Settings() {
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
                  <form>
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
                  Change Shipping Address
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Card>
                <CardBody>
                  <form>
                    <FormControl>
                      <Input placeholder="Enter New Address" w={800} mt={5} />
                    </FormControl>
                    <FormControl>
                      <Input
                        placeholder="Enter New Postal Code"
                        w={400}
                        mt={5}
                      />
                    </FormControl>

                    <Flex justify="flex-start" mt={5}>
                      <Button type="submit" size={"sm"}>
                        Change Shipping Address
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
