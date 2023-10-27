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
  IconButton,
  useDisclosure,
  useColorModeValue,
  ButtonGroup,
  Heading,
  Avatar,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";
import { userContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";

import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiFillCaretDown,
} from "react-icons/ai";

import { BsFillCartFill } from "react-icons/bs";

const navLinks = [
  { name: "New Books", path: "#" },
  { name: "Best Sellers", path: "#" },
  { name: "Donations", path: "/donation" },
  { name: "Subscriptions", path: "/subscriptions" },
  { name: "Share a Book", path: "/sharing" },
];

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useContext(userContext);
  const logoutUrl = "http://localhost:3000/api/v1/logout";
  const toast = useToast();

  const logout = async () => {
    try {
      const res = await axios.get(logoutUrl,{
        withCredentials: true,}
        );
      setUser(null);
      console.log(res.data);
      localStorage.removeItem("cartItems");

      return toast({
        title: "Successfully logged out",
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Box
      as="nav"
      position={"fixed"}
      zIndex={999}
      px={4}
      bg={useColorModeValue("", "gray.800")}
      pl={20}
      pr={20}
      w={"100%"}
      bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.1))"
      // filter="blur(8px)"
      backdropFilter="blur(8px)"
      top={0}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <RouterLink to="/">
          <Heading size={"md"}>BookShelf</Heading>
        </RouterLink>
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

        {!user ? (
          <ButtonGroup>
            <RouterLink to="/login">
              <Button
                colorScheme="blue"
                size="sm"
                variant={"ghost"}
                display={{ base: "none", md: "block" }}
              >
                Sign in
              </Button>
            </RouterLink>

            <RouterLink to="/register">
              <Button
                colorScheme="facebook"
                size="sm"
                display={{ base: "none", md: "block" }}
              >
                Sign Up
              </Button>
            </RouterLink>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <RouterLink to={`cart/${user.user.userId}`}>
              <IconButton
                colorScheme="blue"
                aria-label="Call Segun"
                size="lg"
                variant={"ghost"}
                icon={<BsFillCartFill />}
              />
            </RouterLink>
            <Menu w="100">
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                rightIcon={<AiFillCaretDown />}
              >
                <Avatar
                  size={"sm"}
                  name={user.user.name}
                  colorScheme="blue"
                  src="https://bit.ly/broken-link"
                />
              </MenuButton>
              <MenuList>
                {user.user.role !== "admin" &&
                user.user.role !== "moderator" ? (
                  <>
                    <RouterLink to="/account">
                      <MenuItem>Account</MenuItem>
                    </RouterLink>

                    <RouterLink to="account/orders">
                      <MenuItem>Orders</MenuItem>
                    </RouterLink>
                  </>
                ) : (
                  <>
                    {user.user.role === "admin" ? (
                      <RouterLink to="/admindashboard">
                        <MenuItem>Admin Dashboard</MenuItem>
                      </RouterLink>
                    ) : (
                      <RouterLink to="/moderator">
                        <MenuItem>Moderator Dashboard</MenuItem>
                      </RouterLink>
                    )}
                  </>
                )}

                <MenuDivider />
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </ButtonGroup>
        )}

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