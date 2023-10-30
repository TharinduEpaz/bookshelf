import {
  Box,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  CardFooter,
  Heading,
    Text,
    Button,
    Divider,
    Stack,
    Alert,
    AlertIcon


} from "@chakra-ui/react";

import { useContext,useEffect,useState } from "react";
import { userContext } from "../../context/UserContext";

import axios from "axios";


function Dashboard() {

  const { user } = useContext(userContext);
  
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
  console.log(user);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/getNotifications/${user.user.userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


 useEffect(() => {
  const fetchNotifications = async () => {
    const fetchedNotifications = await getNotifications();
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications);
    }
  };
  fetchNotifications();
}, []);

 
  
  return (
    <Box
      position={"relative"}
      h={"100%"}
      
      borderRadius={"10px"}
      ml={2}
      p={5}
        border={"1px solid #E2E8F0"}
    >
    <Box>
        <Heading size="md"> Dashboard </Heading>
    </Box>
    <Divider mb={10}></Divider>
    
    <Box mb={10}>
    <Stack spacing={3}>
    {/* {notifications.map((notification) => (
      <Alert status={notification.type}>
        <AlertIcon />
        {notification.message}
      </Alert>
    ))} */}

    {Object.keys(notifications).map((key) => (
      <Alert status={notifications[key].type} key={key}>

        <AlertIcon />
        {notifications[key].message}
      </Alert>
    ))}


    
  {/* <Alert status='error'>
    <AlertIcon />
    There was an error processing your Order Go to order page for more details
  </Alert>

  <Alert status='success'>
    <AlertIcon />
    Order 546 Shipped Successfully
  </Alert>

  <Alert status='warning'>
    <AlertIcon />
    Please Confirm your email address to activate your account to access our all features
  </Alert> */}



</Stack>
    </Box>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(30%, 1fr))"
      >
        <Card>
          <CardHeader>
            <Heading size="md"> 5 Orders </Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
           
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Subscription Status</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              No Subscription
            </Text>
          </CardBody>
          <CardFooter>
            <Button variant={'link'} colorScheme="purple">Go to subscriptions</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Exchange Requests</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Total of 5 Requests Posted
            </Text>
          </CardBody>
          <CardFooter>
            <Button variant={'link'} colorScheme="purple" mr={50}>Post Request</Button>
            <Button variant={'link'} colorScheme="purple">Manage</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
