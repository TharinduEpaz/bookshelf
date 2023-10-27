import { Card, CardBody, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export default function NotificationCard({ text, time, description, status, id }) {
const [isLoading, setIsLoading] = useState(false);
  const changeStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`http://localhost:3000/api/v1/notifications/${id}`);
      const jsonData = await response.data;
      setIsLoading(false);
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <>
      <Card bgColor={status != 1 ? "blue.100" : null} cursor={"pointer"} onClick={changeStatus}>
        <CardBody>
          <Flex>
            <Stack>
            <Text fontWeight={"semibold"}>{text}</Text>
            <Text>{description}</Text>
            </Stack>
            <Spacer />
            <Text fontSize="xs" color="gray.500" mt={5}>
              {time}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
