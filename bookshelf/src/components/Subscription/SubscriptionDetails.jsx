import React, { useState, useEffect } from 'react'
import {
    Box, 
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";

function SubscriptionDetails() {

    const [subscriptionType, setSubscriptionType] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);

    useEffect(() => {
        const getSubscription = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions",
                    {
                        withCredentials: true
                    }
                )

                setSubscriptionType(response.data);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
        };
        getSubscription();
    }, []);

    useEffect(() => {
        const getCurrentSubscription = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions/getMySubscription",
                    {
                        withCredentials: true
                    }
                );
                setSubscriptionDetails(response);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
        };
        getCurrentSubscription();
    }, []);

    let currentSubscription = subscriptionDetails && subscriptionDetails.data[0].subscriptionType;
    let bookItem = null;
    let timePeriod = null;
    let percentage = null;

    if (currentSubscription === "Book Lover" && subscriptionType.length >= 2) {
        bookItem =subscriptionType[1].book_count;
        timePeriod = subscriptionType[1].time_period;
        percentage = subscriptionType[1].discount;
    }
    else if (currentSubscription === "Book Reader" && subscriptionType.length >= 2) {
        bookItem = subscriptionType[0].book_count;
        timePeriod = subscriptionType[0].time_period;
        percentage = subscriptionType[0].discount;
    }
    else if (currentSubscription === "Book Worm" && subscriptionType.length >= 2) {
        bookItem = subscriptionType[2].book_count;
        timePeriod = subscriptionType[2].time_period;
        percentage = subscriptionType[2].discount;
    }


  return (
    <div>
          <Accordion allowToggle paddingTop={3}>
              <AccordionItem>
                  <h2>
                      <AccordionButton bg={'blue.100'}>
                          <Box as="b" flex='1' textAlign='left' fontSize={'2xl'}>
                              Details
                          </Box>
                          <AccordionIcon as={'b'}/>
                      </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg={'white'}>
                      <Text paddingLeft={10} fontSize={'xl'}>
                          Terms for the <strong>{currentSubscription}</strong> subscription package
                      </Text>
                      <UnorderedList paddingLeft={20} fontSize={'lg'}>
                          <ListItem>{bookItem} book for {timePeriod} month</ListItem>
                          <ListItem>{percentage} of the original price of the book</ListItem>
                          <ListItem>Doorstep delivery</ListItem>
                          <ListItem>Please make sure the book has the optimal quality when returned to avoid extra quality check charges</ListItem>
                      </UnorderedList>
                  </AccordionPanel>
              </AccordionItem>
          </Accordion>
    </div>
  )
}

export default SubscriptionDetails
