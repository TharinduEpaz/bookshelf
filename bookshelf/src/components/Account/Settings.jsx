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

import axios from "axios";

function Settings() {
  const [address,setAddress] = React.useState('');
  const [postalCode,setPostalCode] = React.useState('');
  const [city,setCity] = React.useState('');
  const [phoneNumber,setPhoneNumber] = React.useState('');
  const [province,setProvince] = React.useState('');

  const handleShippingChange = async (e) => {
    e.preventDefault();
    try{
    const response = await axios
      .post("http://localhost:3000/api/v1/users/changeShippingDetails", {
        address: address,
        postalCode: postalCode,
        city: city,
        phoneNumber: phoneNumber,
        province: province,
      },
      {
        withCredentials: true,
        });
        console.log(response);
    }
    
    catch(error){
      console.log(error);
    }
    }


      
      

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
        <Card mb={2} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={10} p={10} backgroundColor={'gray.100'} >
          
          <Avatar name="Tharindu Dananjaya"></Avatar>
            <Heading size={"md"} fontWeight={'bold'}>
              Tharindu Dananjaya{" "}
            </Heading>
       
          
        </Card>
        <Accordion defaultIndex={[0]} allowMultiple mt={10}>
  <AccordionItem>
    <h2>
      <AccordionButton  >
        <Box as="span" flex='1' textAlign='left' >
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
                <Input placeholder="Email"  w={400}/>
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
        <Box as="span" flex='1' textAlign='left'>
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
                
                <Input placeholder="Current Password"  w={400} mt={5}/>
                </FormControl>
                <FormControl>
                
                <Input placeholder="New Password"  w={400} mt={5}/>
                </FormControl>
                <FormControl>
               
                <Input placeholder="Confirm Password"  w={400} mt={5}/>
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
        <Box as="span" flex='1' textAlign='left'>
          Add Shipping and Billing Details
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Card>
          
          <CardBody>
            <form onSubmit={handleShippingChange}>
                <FormControl>
                
                <Input placeholder="Enter New Address"  w={'90%'} mt={5}
                onChange={(e) => setAddress(e.target.value)}
                />
                </FormControl>
                <FormControl>
                
                <Input placeholder="Enter New Postal Code"  w={400} mt={5}
                onChange={(e) => setPostalCode(e.target.value)}
                />
                <Input placeholder="Enter City"  w={400} mt={5}
                onChange={(e) => setCity(e.target.value)}
                />
                <Input placeholder="Enter Province"  w={400} mt={5}
                onChange={(e) => setProvince(e.target.value)}
                /> 
                <Input placeholder="Enter Phone Number"  w={400} mt={5}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
