import React from 'react';
import {
    Heading,
    Text,
    WrapItem,
    Avatar,
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

function SideNav() {

  return (
    <div>
          <WrapItem>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={'xl'} marginTop={'8'} marginLeft={'170'} />
          </WrapItem>
          <Text textAlign={'center'} color={'rgb(32,73,116)'} fontSize={'2xl'}>Hasindu sudeepana </Text>
          <Heading textAlign={'center'} marginTop={'15'}>
              <Text as='b' color={'rgb(32,73,116)'} fontSize={'2xl'} >Book Sharing</Text>
          </Heading>
          <div style={{ marginLeft: '20px' , marginTop:'20px'}}> 
              <RouterLink to="#">
                  <Text as='b' fontSize={'2xl'} marginTop={'-500'}>Post Share Request</Text>
              </RouterLink>
              <RouterLink to="#">
                  <Text fontSize={'2xl'} lineHeight={'10'} >View Other Request</Text>
              </RouterLink>
              <RouterLink to="#">
                  <Text fontSize={'2xl'} lineHeight={'10'}>Manage Your Request</Text>
              </RouterLink>
              <RouterLink to="#">
                  <Text fontSize={'2xl'} lineHeight={'10'}>Chat</Text>
              </RouterLink>
          </div>
    </div>
  )
}

export default SideNav;