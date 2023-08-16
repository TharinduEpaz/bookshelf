import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Icon,
  Spacer,
  Text,
  StatGroup,
  Select,
} from "@chakra-ui/react";

import { BiBookOpen } from "react-icons/bi";
import StatCard from "../../components/Moderator/StatCard";
import DataTable from "../../components/Moderator/DataTable";
import SearchPanel from "../../components/Moderator/SearchPanel";


export default function BookSharing() {
  const columns = [
    "Book ID",
    "Book Title",
    "Author",
    "Shared By (ID)",
    "Shared By (Name)",
    "Shared Date",
  ];
  const list = [
    {
      book_id: "n0001",
      book_name: "Mystery at Midnight Manor",
      author: "Sam Johnson",
      user_id: "c0001",
      user_name: "Nishan Madushanka",
      date: "14.08.2023",
    },
  ];
  return (
    <>
      <Box p={10}>
        <Flex>
          <Text fontSize="lg" fontWeight={"bold"}>
            Book Sharing
          </Text>
        </Flex>

        <Flex gap={20}>
          <Card
            mt={5}
            p={5}
            pl={10}
            pr={10}
            boxShadow="sm"
            borderRadius="md"
            bgColor={"#EDF2F7"}
            w={"fit-content"}
          >
            <CardBody>
              <Flex justifyContent={"space-between"}>
                <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                <Select width={"100px"}>
                  <option value="option1">All</option>
                  <option value="option2">This week</option>
                  <option value="option2">This Month</option>
                </Select>
              </Flex>
                <StatCard lable="All" value={"1"} />
            </CardBody>
          </Card>
        </Flex>

        <Spacer mt={10} />

        <Box>
          <SearchPanel name={"Book Sharing Details"} filter={"book_sharing"} />

          <Spacer mt={5} />

          <DataTable list={list} columnNames={columns} />
        </Box>
      </Box>
    </>
  );
}
