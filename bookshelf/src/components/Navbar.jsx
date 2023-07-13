// import {
//   Box,
//   Button,
//   Container,
//   Image,
//   Spacer,
//   Link,
//   HStack,
//   Flex,
//   Heading,
//   Avatar,
//   AvatarBadge,
//   Text,
//   Center,
// } from "@chakra-ui/react";

import "@fontsource/montserrat";
import "@fontsource/playfair-display";

import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  ButtonGroup,
  Heading,
  LinkBox,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import React from "react";

const navLinks = [
  { name: "New Books", path: "#" },
  { name: "Best Sellers", path: "#" },
  { name: "Donations", path: "#" },
  { name: "Subscriptions", path: "#" },
  { name: "Share a Book", path: "#" },
];

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box px={4} bg={useColorModeValue("", "gray.800")} pl={20} pr={20} >
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto" >
        <Heading size={"md"}>BookShelf</Heading>

        <HStack
          spacing={8}
          alignItems="center"
          bg={useColorModeValue("blue.100", "gray.800")}
          p={1}
          pl={10}
          pr={10}
          borderRadius={50}
          boxShadow={"base"}
          display={{ base: "none", md: "flex" }}
        >
          <HStack
            as="nav"
            spacing={6}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </HStack>
        </HStack>
        <ButtonGroup>
          <Button
            colorScheme="blue"
            size="sm"
            display={{ base: "none", md: "block" }}
            borderRadius={10}
          >
            Sign in
          </Button>
          <Button
            colorScheme="blue"
            variant={"ghost"}
            size="sm"
            display={{ base: "none", md: "block" }}
          >
            Sign Up
          </Button>
        </ButtonGroup>

        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: "inherit", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box pb={4} display={{ base: "inherit", md: "none" }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </Stack>
          <Link></Link>
        </Box>
      ) : null}
    </Box>
  );
}
const NavLink = ({ name, path, onClose }) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("blue.500", "blue.200"),
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};
export default Navbar;
