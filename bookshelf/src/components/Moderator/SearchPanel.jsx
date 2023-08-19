import React from "react";

import {
    Flex,
    Icon,
    Spacer,
    Text,
    InputGroup,
    Input,
    InputRightElement
} from "@chakra-ui/react";

import { BiSearchAlt } from "react-icons/bi";

import DateFilter from "./DateFilter";
import OrganizationsFilter from "./Filters/OrganizationsFilter";
import DonationsFilter from "./Filters/DonationFilter";
import InventoryFilter from "./Filters/InventoryFilter";
import OrdersFilter from "./Filters/OrdersFilter";
import BookSharingFilter from "./Filters/BookSharingFilter";



export default function SearchPanel({name, filter}) {
  return (
    <>
      <Flex>
        <Text fontSize="lg" fontWeight={"bold"}>
          {name}
        </Text>

        <Spacer />

        <Flex gap={2}>
          <InputGroup w={"100%"}>
            <Input size="sm" placeholder="Search" />
            <InputRightElement pointerEvents={"none"}>
              <Icon as={BiSearchAlt} color={"gray.300"} />
            </InputRightElement>
          </InputGroup>
          {filter === "inventory" && <InventoryFilter />}
          {filter === "orders" && <OrdersFilter />}
          {filter === "organizations" && <OrganizationsFilter />}
          {filter === "donations" && <DonationsFilter />}
          {filter === "book_sharing" && <BookSharingFilter />}
          <DateFilter /> {/*  Date Filter */}
        </Flex>
      </Flex>
    </>
  );
}
