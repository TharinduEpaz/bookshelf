import React, { useState, useEffect } from "react";
import { Text, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Card from "../components/Donation/Card";
import DonationCard from "../components/Donation/DonationCard";
import { Link } from "react-router-dom";
import axios from "axios";

function Package() {
  //get DonationRequests URL
  const URL = "http://localhost:3000/api/v1/donations";

  // Function to get all the donation requests
  const [donationRequests, setDonationRequests] = useState([]);
  const getDonationRequests = async () => {
    try {
      const response = await axios.get(URL);
      setDonationRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDonationRequests();
  }, []);

  return (
    <>
      <Card
        title="With love and kindness, we join renowned charities in Sri Lanka, gifting books to those in need, illuminating lives with endless possibilities."
        text="Support and help the much-needed local communities in Sri Lanka by donating books."
      />

      <Box
        height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid
          templateRows="50px 50px repeat(8, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
          h={"100%"}
        >
          <GridItem
            rowSpan={8}
            colSpan={4}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <Flex flexWrap={"wrap"} gap={10} p={10}>
              {donationRequests.map((request, index) => (
                <Link
                  key={index}
                  to={`/donate/${request?.id}`}
                >
                  <DonationCard
                    name={request.orgName}
                    regNum={request.orgRegisteredNumber}
                    type={request.orgType}
                  />
                </Link>
              ))}
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Package;
