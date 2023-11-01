import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import axios from 'axios';
import { GiSandSnake } from "react-icons/gi";

function SelectWormIcon() {
    const [subscriptionType, setSubscriptionType] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSubscription = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions"
                );
                setSubscriptionType(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching subscription:", error);
                setLoading(false);
            }
        };
        getSubscription();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box py={3} px={10} >
         <Grid templateColumns="auto 1fr" gap={4} paddingTop={3}>
                {/* First column with icon */}
                <GridItem marginTop={4}>
                    {/* Add your desired icon from the react-icons library */}
                    <GiSandSnake size={70} color='darkgreen' />
                </GridItem>

                {/* Second column (spanning two rows) */}
                <GridItem textAlign={"start"}>
                    {/* First row in the second column */}
                    <Text fontWeight="500" fontSize="24">
                        {subscriptionType[2].firstName}
                    </Text>

                    {/* Second row in the second column */}
                    <Text fontSize="36" fontWeight="900">
                        {subscriptionType[2].LastName}
                    </Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default SelectWormIcon