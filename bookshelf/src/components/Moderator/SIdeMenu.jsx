import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { BiBell, BiBuilding, BiCollection, BiGift, BiHomeAlt, BiMoney, BiPurchaseTag, BiShareAlt } from "react-icons/bi";
import React from "react";
import NavItem from "./NavItem";
import { userContext } from "../../context/userContext";

function SideMenu() {
  const { user } = React.useContext(userContext);
  return (
    <Box m={5} mt={10}>
      <Center>
        <Avatar
          size="lg"
          name={user.user.name}
          fontWeight={"bold"}
          bg="blue.300"
          src="#"
        >
          <AvatarBadge boxSize="1.1em" bg="green.500" />
        </Avatar>
      </Center>
      <Center flexDir={"column"}>
        <Text fontSize="m" fontWeight={"bold"} mt={5} mb={5}>
          {user.user.name}
        </Text>
        <Text fontSize="sm" fontWeight={"bold"} mb={8} color={"blue.700"}>
          Moderator Dashboard
        </Text>
      </Center>

      <NavItem icon={BiHomeAlt} title="DashBoard" link="dashboard" />
      <NavItem icon={BiBell} title="Notification" link="notifications" />
      <NavItem icon={BiBuilding} title="Inventory" link="inventory" />
      <NavItem icon={BiCollection} title="Orders" link="orders" />
      <NavItem icon={BiGift} title="Donations" link="donations" />
      <NavItem icon={BiMoney} title="Subscriptions" link="subscriptions" />
      <NavItem icon={BiShareAlt} title="Book Sharing" link="booksharing" />
      <NavItem icon={SettingsIcon} title="Setting" link="setting" />
    </Box>
  );
}

export default SideMenu;
