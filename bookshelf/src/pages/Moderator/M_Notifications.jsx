import { Box, Flex, Spacer, Text, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NotificationCard from "../../components/Moderator/NotificationCard";
import axios from "axios";

export default function Notifications() {
  console.log("Notifications");
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/notifications"
      );
      const jsonData = await response.data;
      setNotifications(jsonData);
      setIsLoading(false);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  if (isLoading) {
    return (
      <>
        <Box mb={"100vh"}>
          <Spinner
            position={"absolute"}
            top={"30%"}
            left={"50%"}
            size={"xl"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box p={10}>
        <Flex>
          <Text fontSize="lg" fontWeight={"bold"}>
            Notifications
          </Text>
        </Flex>

        {notifications.length != 0 ? (
          <Flex gap={10} direction={"column"} mt={10}>
            <Flex gap={2} direction={"column"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Today
              </Text>
              {notifications.map((notification, index) => (
                <Box key={index}>
                  <NotificationCard
                    text={notification.type}
                    time={new Date(notification.createdAt).toLocaleDateString()}
                    description={notification.message}
                  />
                </Box>
              ))}
            </Flex>
          </Flex>
        ) : (
          <Flex mt={10} justifyContent={"center"}>
            <Text fontSize={"md"} fontWeight={"bold"}>
              No Notifications
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
}
