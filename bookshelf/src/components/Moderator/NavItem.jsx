import React from "react";
import { Flex, Menu, MenuButton, Link, Icon, Text } from "@chakra-ui/react";
import { NavLink, Link as RouterLink } from "react-router-dom";

export default function NavItem({ title, icon, link, active }) {
  return (
    <Flex flexDir={"column"} w={"100%"} mt={1}>
      <Menu placement="right">
        <NavLink to={link} style={({ isActive }) => ({
          backgroundColor: isActive ? "#D7EEFF" : "#FFFFFF",
          borderRadius: 8,
          fontWeight: isActive ? "bold" : "normal",
        })}
        >
          <MenuButton
            pt={2}
            pb={2}
            pl={4}
            borderRadius={8}
            _hover={{ textDecoration: "none", bg: "#D7EEFF" }}
            w={"100%"}
          >
            <Flex>
              <Icon as={icon} fontSize={"xl"} color={"#6B7280"} />
              <Text
                ml={4}
                color={"#6B7280"}
                fontWeight={"semibold"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </NavLink>
      </Menu>
    </Flex>
  );
}
