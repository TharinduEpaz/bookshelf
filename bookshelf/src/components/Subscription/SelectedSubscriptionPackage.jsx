import React, { useState, useEffect } from 'react';
import BookDetails from "../../components/Subscription/BookDetails";
import SelectLoverIcon from '../../components/Subscription/SelectLoverIcon';
import SelectReaderIcon from './SelectReaderIcon';
import SelectWormIcon from './SelectWormIcon';
import {
    Box,
    Button,
    Grid,
    GridItem,
    Text,
    DatePicker, // Import the DatePicker component
} from "@chakra-ui/react";

import { BsFillCalendar2DateFill } from "react-icons/bs";
import { Outlet } from 'react-router-dom';
import axios from "axios";

function SelectedSubscriptionPackage() {
    const [subscriptionType, setSubscriptionType] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

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

    let currentSubscription = subscriptionDetails?.data[0]?.subscriptionType;
    let currentSubscriptionIcon = "";

    if (currentSubscription === "Book Reader") {
        currentSubscriptionIcon = <SelectReaderIcon />;
    } else if (currentSubscription === "Book Worm") {
        currentSubscriptionIcon = <SelectWormIcon />;
    } else if (currentSubscription === "Book Lover") {
        currentSubscriptionIcon = <SelectLoverIcon />;
    }

    const handleDateClick = () => {
        setDatePickerOpen(true);
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setDatePickerOpen(false);
    }

    return (
        <Grid>
            <GridItem rowSpan={1} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} py={7} px={12}>
                <Box>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Current Subscription
                    </Text>
                    {currentSubscriptionIcon}
                </Box>
            </GridItem>

            <GridItem rowSpan={4} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} py={7} px={12} marginTop={5}>
                <Text fontSize={'21'} color={'#204974'} as={'b'}>
                    Next Delivery
                </Text>
                <Button
                    bg={'white'}
                    variant={'outline'}
                    borderRadius={15}
                    marginLeft={10}
                    w={'auto'}
                    onClick={handleDateClick}
                >
                    <strong>Extended Date</strong>
                </Button>
                {isDatePickerOpen && (
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => handleDateSelect(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                )}

                <Box marginTop={10}>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Book Details
                    </Text>
                </Box>
                <BookDetails />
            </GridItem>
        </Grid>
    )
}

export default SelectedSubscriptionPackage;
