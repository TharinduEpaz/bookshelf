import React from 'react';
import { Box, SimpleGrid, Button, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SelectLoverIcon from './SelectLoverIcon';
import SelectReaderIcon from './SelectReaderIcon';
import SelectWormIcon from './SelectWormIcon';
import { Link as RouterLink } from 'react-router-dom';

export default function ChangeSubscription() {
    const location = useLocation();
    const pathname = location.pathname;

    let currentSubscription = null;

    if (pathname.includes('Reader')) {
        currentSubscription = <SelectReaderIcon />;
    } else if (pathname.includes('Worm')) {
        currentSubscription = <SelectWormIcon />;
    } else {
        currentSubscription = <SelectLoverIcon />;
    }

    let otherSubscription1 = null;
    let otherSubscription2 = null;

    let otherSubscriptionManage1 = null;
    let otherSubscriptionManage2 = null;

    let otherSubscriptionDetail1 = null;
    let otherSubscriptionDetail2 = null;

    if (pathname.includes('Reader')) {
        otherSubscription1 = <SelectWormIcon />;
        otherSubscription2 = <SelectLoverIcon />;
        otherSubscriptionManage1 = '/selectBookWorm/manageSubscription';
        otherSubscriptionDetail1 = '/selectBookWorm/details';
        otherSubscriptionManage2 = '/selectBookLover/manageSubscription';
        otherSubscriptionDetail2 = '/selectBookLover/details';

    } else if (pathname.includes('Worm')) {
        otherSubscription1 = <SelectReaderIcon />;
        otherSubscription2 = <SelectLoverIcon />;
        otherSubscriptionManage1 = '/selectBookReader/manageSubscription';
        otherSubscriptionDetail1 = '/selectBookReader/details';
        otherSubscriptionManage2 = '/selectBookLover/manageSubscription';
        otherSubscriptionDetail2 = '/selectBookLover/details';
    } else {
        otherSubscription1 = <SelectReaderIcon />;
        otherSubscription2 = <SelectWormIcon />;
        otherSubscriptionManage1 = '/selectBookReader/manageSubscription';
        otherSubscriptionDetail1 = '/selectBookReader/details';
        otherSubscriptionManage2 = '/selectBookWorm/manageSubscription';
        otherSubscriptionDetail2 = '/selectBookWorm/details';
    }

    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Box>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Current Subscription
                    </Text>
                    {currentSubscription}
                </Box>

                <Box>
                    {otherSubscription1}
                    <Box marginTop={2}>
                        <RouterLink to={otherSubscriptionManage1}>
                            <Button
                                color={'#3182CE'}
                                variant={'outline'}
                                border={'1px'}
                                borderRadius={10}
                                marginLeft={10}
                            >
                                Select
                            </Button>
                        </RouterLink>
                        <RouterLink to={otherSubscriptionDetail1}>
                            <Button
                                border={'1px'}
                                borderColor={'blackAlpha.400'}
                                borderRadius={10}
                                marginLeft={8}
                            >
                                View Details
                            </Button>
                        </RouterLink>
                        
                    </Box>
                </Box>

                <Box>
                    {otherSubscription2}
                    <Box marginTop={2}>
                        <RouterLink to={otherSubscriptionManage2}>
                            <Button
                                color={'#3182CE'}
                                variant={'outline'}
                                border={'1px'}
                                borderRadius={10}
                                marginLeft={10}
                            >
                                Select
                            </Button>
                        </RouterLink>
                        <RouterLink to={otherSubscriptionDetail2}>
                            <Button
                                border={'1px'}
                                borderColor={'blackAlpha.400'}
                                borderRadius={10}
                                marginLeft={8}
                            >
                                View Details
                            </Button>
                        </RouterLink>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
}
