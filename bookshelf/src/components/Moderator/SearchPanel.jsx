import React from "react";

import {
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";


import DateFilter from "./DateFilter";
import OrganizationsFilter from "./Filters/OrganizationsFilter";
import DonationsFilter from "./Filters/DonationFilter";
import InventoryFilter from "./Filters/InventoryFilter";
import OrdersFilter from "./Filters/OrdersFilter";
import BookSharingFilter from "./Filters/BookSharingFilter";

//import Search Bars
import InventorySearch from "./SearchBars/InventorySearch";
import OrdersSearch from "./SearchBars/OrderSearch";

export default function SearchPanel({ name, filter, setChildValue, setOrderSearchValue }) {

  // const filteredData = (data) => {
  //   console.log(data);
  //   setChildValue(data);
  // }

  const value = (data) => {
    setOrderSearchValue(data);
  }

  //Filter
  const submitFilterData = (data) => {
    setChildValue(data);
  }

  return (
    <>
      <Flex>
        <Text fontSize="lg" fontWeight={"bold"}>
          {name}
        </Text>
        {/* <Button onClick={() => (window.print())}>Print</Button> */}

        <Spacer />

        <Flex gap={2}>
          {/* Search Bar */}
          {filter === "inventory" && <InventorySearch setPassValue={value}/>}
          {filter === "orders" && <OrdersSearch setPassValue={value} />}
          {/* {filter === "organizations" && <OrganizationsSearch />}
          {filter === "donations" && <DonationsSearch />}
          {filter === "book_sharing" && <BookSharingSearch />} */}

          {filter === "inventory" && <InventoryFilter submitFilterData={submitFilterData}/>}
          {filter === "orders" && (<><OrdersFilter submitFilterData={submitFilterData}/><DateFilter /></>)}
          {filter === "organizations" && (<><OrganizationsFilter /><DateFilter /></>)}
          {filter === "donations" && (<><DonationsFilter /><DateFilter /></>)}
          {filter === "book_sharing" && (<><BookSharingFilter /><DateFilter /></>)}
        </Flex>
      </Flex>
    </>
  );
}
