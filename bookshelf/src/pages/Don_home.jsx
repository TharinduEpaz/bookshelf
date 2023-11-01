import React, { useState, useEffect } from 'react';
import { Text, Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import Card from '../components/Donation/Card';
import DonationCard from '../components/Donation/DonationCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Package() {
  const [AcceptedDonationRequests, setAcceptedDonationRequests] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to your API endpoint to fetch the "Accepted" donation requests
    // fetch('http://localhost:3000/api/v1/donationRequests') // Replace with the actual API endpoint
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('All donation requests:', data);
    //     // Filter and set the "Accepted" donation requests
    //     const AcceptedRequests = data.filter((request) => request.approval === 'Accepted');
    //     setAcceptedDonationRequests(AcceptedRequests);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
    const sendRequestToServer = () => {
      const apiUrl = 'http://localhost:3000/api/v1/donationRequests'; // Replace with your actual server API URL
  
      axios
        .get(apiUrl)
        .then((response) => {
          console.log('Request sent successfully', response.data);
          setAcceptedDonationRequests(response.data)
          // You can handle the success response here.
        })
        .catch((error) => {
          console.error('Error sending request', error);
          // Handle errors here.
        });
    };
    sendRequestToServer()
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <>
      <Card
        title="With love and kindness, we join renowned charities in Sri Lanka, gifting books to those in need, illuminating lives with endless possibilities."
        text="Support and help the much-needed local communities in Sri Lanka by donating books."
      />

      <Box
        height={'100%'}
        m={'auto'}
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
          h={'100%'}
        >
          <GridItem rowSpan={8} colSpan={4} border={'1px'} borderColor={'blue.200'} rounded={'md'}>
            <Flex flexWrap={'wrap'} gap={10} p={10}>
              {AcceptedDonationRequests.map((request, index) => (
                <Link key={index} to={`/donate/${request.id}`}>
                  <DonationCard
                    name={request.orgName}
                    orgRegisteredNumber={request.orgRegisteredNumber}
                    // imageURL={request.image} // Add image URL if available
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
