import { Box, Tab, TabList, TabPanels, TabPanel, Tabs, FormControl, FormLabel, Input, Icon, Flex, Button, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai'
import { BiX, BiCheck } from 'react-icons/bi'
import { userContext } from '../../context/userContext'
import { useContext } from "react";

export default function Settings() {
  const { user, setUser } = useContext(userContext);
  const [isEditFName, setIsEditFName] = useState(false);
  const [isEditLName, setIsEditLName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [fName, setFName] = useState('Anushka');
  const [lName, setLName] = useState('Raj');
  const [email, setEmail] = useState('anushkarajapaksha9@gmail.com');

  return (
    <div>
      <Box p={10}>
        <Tabs>
          <TabList>
            <Tab>General Setting</Tab>
            <Tab>Change Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{/* General Setting */}
            {/* First Name */}
              <FormControl>
                  <FormLabel fontWeight={"semibold"}>
                    First Name
                  </FormLabel>
                  <Flex>
                  <Input
                    type="text"
                    value={fName}
                    width={"50%"}
                    onChange={(e) => setFName(e.target.value)}
                    isReadOnly={!isEditFName}
                  />
                  <Box
                    as="button"
                    bg={"blue.600"}
                    width={50}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    borderRadius={"md"}
                    mr={2}
                    onClick={() => {
                      isEditFName ? setIsEditFName(false) : setIsEditFName(true)
                    }}
                  >
                    {
                      isEditFName ? <Icon as={BiCheck} /> : <Icon as={AiFillEdit} />
                    }
                  </Box>
                  {
                    isEditFName ? (
                      <Box
                    as="button"
                    bg={"red.600"}
                    width={50}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    borderRadius={"md"}
                    onClick={() =>
                    {
                      setFName(fName);
                      setIsEditFName(false);
                    }}
                  >
                    <Icon as={BiX} />
                  </Box>
                    ) : null
                  }
                  </Flex>
                </FormControl>

                {/* Last Name */}
                <FormControl>
                  <FormLabel fontWeight={"semibold"}>
                    Last Name
                  </FormLabel>
                  <Flex>
                  <Input
                    type="text"
                    value={lName}
                    width={"50%"}
                    onChange={(e) => setLName(e.target.value)}
                    isReadOnly={!isEditLName}
                  />
                  <Box
                    as="button"
                    bg={"blue.600"}
                    width={50}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    borderRadius={"md"}
                    mr={2}
                    onClick={() => {
                      isEditLName ? setIsEditLName(false) : setIsEditLName(true)
                    }}
                  >
                    {
                      isEditLName ? <Icon as={BiCheck} /> : <Icon as={AiFillEdit} />
                    }
                  </Box>
                  {
                    isEditLName ? (
                      <Box
                    as="button"
                    bg={"red.600"}
                    width={50}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    borderRadius={"md"}
                    onClick={() =>
                    {
                      setLName(lName);
                      setIsEditLName(false);
                    }}
                  >
                    <Icon as={BiX} />
                  </Box>
                    ) : null
                  }
                  </Flex>
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel fontWeight={"semibold"}>
                    Email
                  </FormLabel>
                  <Flex>
                  <Input
                    type="text"
                    value={email}
                    width={"50%"}
                    onChange={(e) => setEmail(e.target.value)}
                    isReadOnly={!isEditEmail}
                  />
                  <Box
                    as="button"
                    bg={"blue.600"}
                    width={50}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    borderRadius={"md"}
                    mr={2}
                    onClick={() => {
                      isEditEmail ? setIsEditEmail(false) : setIsEditEmail(true)
                    }}
                  >
                    {
                      isEditEmail ? <Icon as={BiCheck} /> : <Icon as={AiFillEdit} />
                    }
                  </Box>
                  {
                    isEditEmail ? (
                      <Box
                    as="button"
                    bg={"red.600"}
                    width={50}
                    justifyContent={"center"}
                    alignItems={"center"}
                    color={"white"}
                    borderRadius={"md"}
                    onClick={() =>
                    {
                      setEmail(email);
                      setIsEditEmail(false);
                    }}
                  >
                    <Icon as={BiX} />
                  </Box>
                    ) : null
                  }
                  </Flex>
                </FormControl>
                
                {/* Save Button */}
                <Button colorScheme='blue' mt={5}>Save Changes </Button>
            </TabPanel>

            <TabPanel>{/* Change Password */}
              <FormControl>
                <FormLabel fontWeight={"semibold"}>
                  Current Password
                </FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"}>
                  New Password
                </FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"}>
                  Confirm Password
                </FormLabel>
                <Input type="password" />
              </FormControl>
              <ButtonGroup mt={5}>
              <Button colorScheme='blue' mt={5}>Update Password</Button>
              <Button variant={'outline'} colorScheme='red' mt={5}>Cancel</Button>
              </ButtonGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  )
}
