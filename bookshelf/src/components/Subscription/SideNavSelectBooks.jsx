import React from 'react';
import {
    Heading,
    Text,
    WrapItem,
    Avatar,
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

function SideNavSelectBooks() {

    return (
        <div>
            <WrapItem>
                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={'xl'} marginTop={'8'} marginLeft={'85'} />
            </WrapItem>

            <Text textAlign={'center'} color={'rgb(32,73,116)'} fontSize={'20'}>Hasindu sudeepana </Text>

            <Heading textAlign={'center'} marginTop={'15'}>
                <Text as='b' color={'rgb(32,73,116)'} fontSize={'2xl'} >Subscription Details</Text>
            </Heading>

            <div style={{ marginLeft: '18px', marginTop: '20px' }}>
                <RouterLink to="#">
                    <Text  fontSize={'19'} lineHeight={'10'}> Details</Text>
                </RouterLink>
                <RouterLink to="#">
                    <Text as='b'fontSize={'19'} lineHeight={'10'} >Select Books</Text>
                </RouterLink>
                <RouterLink to="/manageSubscription">
                    <Text fontSize={'19'} lineHeight={'10'}>Manage Subscription</Text>
                </RouterLink>
                <RouterLink to="#">
                    <Text fontSize={'19'} lineHeight={'10'}>Chat</Text>
                </RouterLink>
            </div>
        </div>
    )
}

export default SideNavSelectBooks;