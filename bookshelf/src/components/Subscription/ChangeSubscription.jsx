import React from 'react';

import { Box, SimpleGrid, Icon, Text, Button, } from '@chakra-ui/react'
import SelectLoverIcon from './SelectLoverIcon';
import SelectReaderIcon from './SelectReaderIcon';
import SelectWormIcon from './SelectWormIcon';

export default function ChangeSubscription() {
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>

                <Box >
                    <Text fontSize={"21"} color={"#204974"} as={"b"}>
                        Current Subscription
                    </Text>
                    <SelectLoverIcon />
                </Box>

                <Box>
                    <SelectReaderIcon />
                    <Box marginTop={2 } >
                        <Button
                            color={'#3182CE'}
                            variant={'outline'}
                            border={'1px'}
                            borderRadius={10}
                            marginLeft={10}>
                            Select
                        </Button>

                        <Button border={'1px'}
                            borderColor={'blackAlpha.400'}
                            borderRadius={10}
                            marginLeft={8}>
                            View Details
                        </Button>
                    </Box>
                </Box>

                <Box>
                    <SelectWormIcon />
                    <Box marginTop={2} >
                        <Button
                            color={'#3182CE'}
                            variant={'outline'}
                            border={'1px'}
                            borderRadius={10}
                            marginLeft={10}>
                            Select
                        </Button>

                        <Button border={'1px'}
                            borderColor={'blackAlpha.400'}
                            borderRadius={10}
                            marginLeft={8}>
                            View Details
                        </Button>
                    </Box>
                </Box>




            </SimpleGrid>
        </Box>
    );
}