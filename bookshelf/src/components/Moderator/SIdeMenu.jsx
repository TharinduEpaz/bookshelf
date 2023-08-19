import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
//import { SettingsIcon } from "@chakra-ui/icons";
import { BiBell, BiBuilding, BiCollection, BiGift, BiHomeAlt, BiMoney, BiPurchaseTag, BiShareAlt } from "react-icons/bi";
import React from "react";
import NavItem from "./NavItem";

function SideMenu() {
  return (
    <Box m={5} mt={10}>
      <Center>
        <Avatar
          size="lg"
          name="Anushka Rajapaksha"
          fontWeight={"bold"}
          bg="blue.300"
          src="#"
        >
          <AvatarBadge boxSize="1.1em" bg="green.500" />
        </Avatar>
      </Center>
      <Center>
        <Text fontSize="m" fontWeight={"bold"} mt={5} mb={8}>
          Anushka Rajapaksha
        </Text>
      </Center>

      <NavItem icon={BiHomeAlt} title="DashBoard" link="/moderator/dashboard" />
      <NavItem icon={BiBell} title="Notification" link="/moderator/notifications" />
      <NavItem icon={BiBuilding} title="Inventry" link="/moderator/inventry" />
      <NavItem icon={BiCollection} title="Orders" link="/moderator/orders" />
      <NavItem icon={BiGift} title="Donations" link="/moderator/donations" />
      <NavItem icon={BiMoney} title="Subscriptions" link="/moderator/subscriptions" />
      <NavItem icon={BiShareAlt} title="Book Sharing" link="/moderator/booksharing" />
      <NavItem icon={SettingsIcon} title="Setting" link="/moderator/setting" />
    </Box>
  );
}

export default SideMenu;
