import React from "react";

import {
    Box,
    Heading,
    Text,
    Flex,
    Avatar,
    HStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { AiFillWarning, AiTwotoneMessage } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { MdSettingsSuggest } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";

import { useContext } from "react";
import { userContext } from "../../context/userContext";

const SidenavDetailsLinks = [
    {
        id: 1,
        url: "shareBook",
        text: "Books",
        icon: <FaBookOpen/>,
    },
    {
        id: 2,
        url: "shareRequest",
        text: "Post Share Request",
        icon: <FaShareSquare />,
    },
    {
        id: 3,
        url: "manageRequest",
        text: "Manage Your Request",
        icon: <MdSettingsSuggest />,
    },
    {
        id: 5,
        url: "chat",
        text: "Chat",
        icon: <AiTwotoneMessage />,
    },
];

export function Sidenav() {
    const [setActiveLink] = useState(SidenavDetailsLinks[0].url);
    const { user} = useContext(userContext);

    const handleLinkClick = (url) => {
        setActiveLink(url);
    };

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
                fontSize="18px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="normal"
            >
                {user && user.user.name}
            </Heading>

            <Text
                color="#204974"
                fontFamily="Montserrat"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="10"
            >
                Book Sharing
            </Text>
            <Flex flexDirection={'column'} gap={2} w={'80%'} mb={10} mt={5} >

                {SidenavDetailsLinks.map(({ id, url, text, icon }) => (
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

export default Sidenav;