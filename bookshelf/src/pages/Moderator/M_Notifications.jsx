import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import NotificationCard from "../../components/Moderator/NotificationCard";

export default function Notifications() {
  return (
    <>
      <Box p={10}>
        <Flex>
          <Text fontSize="lg" fontWeight={"bold"}>
            Notifications
          </Text>
        </Flex>

        <Flex gap={10} direction={"column"} mt={10}>
          <Flex gap={2} direction={"column"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Today
            </Text>
            <NotificationCard text="New user registered" time="9.52 P.M" description={<>Name : Ravindu Viranga  <Spacer/>  Email: ravindu@gmail.com </>} />
            <NotificationCard text="New order" time="8.00 P.M" description={<>Book Name : Mystery at Midnight Manor <Spacer /> Quantity : 1</>} />
            <NotificationCard
              text="New donation request"
              time="7.00 P.M"
              description="A new donation request has been submitted by a user."
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
