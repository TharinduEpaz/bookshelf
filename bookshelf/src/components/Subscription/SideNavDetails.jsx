// import React from 'react';
// import {
//     Heading,
//     Text,
//     WrapItem,
//     Avatar,
// } from '@chakra-ui/react';
// import { Link as RouterLink } from "react-router-dom";

// function SideNavDetails() {

//     return (
//         <div>
//             <WrapItem justifyContent={'center'}>
//                 <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={'xl'} marginTop={'8'} />
//             </WrapItem>

//             <Text textAlign={'center'} color={'rgb(32,73,116)'} fontSize={'20'}>Hasindu sudeepana </Text>

//             <Heading textAlign={'center'} marginTop={'15'}>
//                 <Text as='b' color={'rgb(32,73,116)'} fontSize={'2xl'} >Subscription Details</Text>
//             </Heading>
            
//             <div style={{ marginLeft: '20px', marginTop: '20px' }}>
//                 <RouterLink to="#">
//                     <Text as='b' fontSize={'19'} marginTop={'-500'}>Details</Text>
//                 </RouterLink>
//                 <RouterLink to="#">
//                     <Text fontSize={'19'} lineHeight={'10'} >Select Books</Text>
//                 </RouterLink>
//                 <RouterLink to="/manageSubscription">
//                     <Text fontSize={'19'} lineHeight={'10'}>Manage Subscription</Text>
//                 </RouterLink>
//                 <RouterLink to="#">
//                     <Text fontSize={'19'} lineHeight={'10'}>Chat</Text>
//                 </RouterLink>
//             </div>
//         </div>
//     )
// }

// export default SideNavDetails;

import React from "react";

import {
    Box,
    Heading,
    Text,
    VStack,
    StackDivider,
    Flex,
    useColorModeValue,
    Avatar,
    HStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { AiFillWarning, AiTwotoneMessage } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";

import { useContext } from "react";
import { userContext } from "../../context/userContext";

const SideNavDetailsLinks = [
    {
        id: 1,
        url: "details",
        text: "Details",
        icon: <BiSolidDashboard />,
    },
    {
        id: 2,
        url: "selectBook",
        text: "Select Books",
        icon: <IoMdSettings />,
    },
    {
        id: 3,
        url: "manageSubscription",
        text: "Manage Subscriptions",
        icon: <ImBooks />,
    },
    {
        id: 5,
        url: "chat",
        text: "Chat",
        icon: <AiTwotoneMessage />,
    },
];

export function SideNavDetails() {
    const [activeLink, setActiveLink] = useState(SideNavDetailsLinks[0].url);
    const { user, setUser } = useContext(userContext);

    const handleLinkClick = (url) => {
        setActiveLink(url);
    };

    /*
    const handleRouterLinkClick = (url) => (event) => {
      event.preventDefault();
      handleLinkClick(url);
    };
    */

    return (
        <Box
            //   position={"fixed"}
            borderRadius="10px"
            borderColor="blue.100"
            borderWidth="0.5px"
            bg="white"
            display={"flex"}
            flexDirection={"column"}

            alignItems={"center"}
            gap={3}
            pt={10}
            minH={'80vh'}
            h={"100%"}
        >
            <Avatar size={"lg"} name={user && user.user.name} position={"relative"} />

            <Heading
                as="h4"
                size="14px"
                color="#204974"
                fontFamily="Montserrat"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
            >
                {user && user.user.name}
            </Heading>

            <Text
                color="#204974"
                fontFamily="Montserrat"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="10"
            >
                Account overview
            </Text>
            <Flex flexDirection={'column'} gap={2} w={'80%'} mb={10} mt={5} >

                {SideNavDetailsLinks.map(({ id, url, text, icon }) => (
                    <RouterLink to={url} key={id} style={({ isActive, isPending }) => {
                        return {

                            backgroundColor: isActive ? "#E2E8F0" : "",
                            color: isPending ? "red" : "black",
                            borderRadius: "10px",
                        };
                    }}>

                        <HStack alignItems="center" gap={2} p={2} borderRadius={10} _hover={{ bg: 'gray.200' }}>
                            <Box>{icon}</Box>
                            <Box> {text}</Box>
                        </HStack>

                    </RouterLink>
                ))}
            </Flex>
        </Box>
    );
}

export default SideNavDetails;
