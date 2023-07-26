import React from 'react'

import {
  Box, 
  Heading,
  Text,
  VStack,
  StackDivider,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'

import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { CiShoppingTag } from "react-icons/ci";
import { LuBuilding2 } from "react-icons/lu";
import { FiGift } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

const sidebarLinks = [
  {
    id:1,
    url:'/admindashboard',
    text:'Dashboard',
    icon:<LuLayoutDashboard/>
  },
  {
    id:2,
    url:'/adminnotifications',
    text:'Notifications',
    icon:<IoMdNotificationsOutline/>
  },
  {
    id:3,
    url:'/adminusermgt',
    text:'User Management',
    icon:<FiUsers/>
  },
  {
    id:4,
    url:'/adminshop',
    text:'Shop',
    icon:<CiShoppingTag/>
  },
  {
    id:5,
    url:'/admininventory',
    text:'Inventory',
    icon:<LuBuilding2/>
  },
  {
    id:6,
    url:'/admindonations',
    text:'Donations',
    icon:<FiGift/>
  },
  {
    id:7,
    url:'/adminsubscriptions',
    text:'Subscriptions',
    icon:<RiMoneyDollarCircleLine/>
  },
  {
    id:8,
    url:'/adminsettings',
    text:'Settings',
    icon:<FiSettings/>
  }

];


export default function AdminSidebar() {

  const [activeLink, setActiveLink] = useState(sidebarLinks[0].url);

  const handleLinkClick = (url) => {
    setActiveLink(url);
  };

  /*
  const handleRouterLinkClick = (url) => (event) => {
    event.preventDefault();
    handleLinkClick(url);
  };
  */
  
  return (
    
    <Box  
    
      position={"fixed"}
      borderRadius='10px' 
      borderColor='rgba(0, 0, 0, 0.20)' 
      borderWidth="0.5px"
      bg='rgba(255, 255, 255, 0.90)' 
      h="90%"
      w="20%"
      ml="2"
    >

<Box mt={'20px'} mb={'10px'} pl={'90px'}>
<svg width="45" height="45" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="32" fill="#63B3ED"/>
<path d="M19.4098 41V23.5455H25.6314C26.9837 23.5455 28.1058 23.7784 28.9979 24.2443C29.8956 24.7102 30.5661 25.3551 31.0092 26.179C31.4524 26.9972 31.674 27.9432 31.674 29.017C31.674 30.0852 31.4496 31.0256 31.0007 31.8381C30.5575 32.6449 29.8871 33.2727 28.9893 33.7216C28.0973 34.1705 26.9751 34.3949 25.6229 34.3949H20.9098V32.1278H25.3842C26.2365 32.1278 26.9297 32.0057 27.4638 31.7614C28.0036 31.517 28.3984 31.1619 28.6484 30.696C28.8984 30.2301 29.0234 29.6705 29.0234 29.017C29.0234 28.358 28.8956 27.7869 28.6399 27.304C28.3899 26.821 27.995 26.4517 27.4553 26.196C26.9212 25.9347 26.2195 25.804 25.3501 25.804H22.0433V41H19.4098ZM28.0263 33.125L32.3388 41H29.3388L25.1115 33.125H28.0263ZM34.8786 41V23.5455H37.5121V38.733H45.4212V41H34.8786Z" fill="black"/>
<circle cx="54" cy="54" r="9.5" fill="#38A169" stroke="white" stroke-width="3"/>
</svg>
</Box>

<Heading 
  as='h4' 
  size='14px' 
  color='#204974' 
  fontFamily="Montserrat"
  textAlign='center'
  fontSize="14px"
  fontStyle="normal"
  fontWeight="500"
  lineHeight="normal"
  m={'10px'}
  >
  Rashini Lakshika 
</Heading>

<Text
  color="#204974"
  textAlign='center'
  fontFamily='Montserrat'
  fontSize="14px"
  fontStyle="normal"
  fontWeight="600"
  lineHeight="10"
  m={'20px'}
>
  Admin Dashboard
</Text>

<VStack
      divider={<StackDivider borderColor='transparent' />}
      spacing={0.1}
      align='stretch'
    >
      {sidebarLinks.map((link) => {
        const { id, url, text, icon } = link;
        return (
          <RouterLink
          key={id}
          to={url}
          onClick={()=> handleLinkClick(url)}
          >

          <Box
            display='flex'
            alignItems='center'
            textDecoration='none'
            pl={'20px'}
            borderBottom='none'
            lineHeight={'50px'}
            bg={activeLink == url ? useColorModeValue('gray.100', 'gray.100') : 'transparent'} 
            _hover={{
            bg: useColorModeValue('gray.100', 'gray.100'),
            }}
          >
            <Flex alignItems='center' marginRight={2}>
              {icon}
            </Flex>
            {text}
          </Box>
          </RouterLink>
        );
      })}
    </VStack>



{/*
<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.5003 3.91667C12.6903 3.91667 3.91699 12.69 3.91699 23.5C3.91699 34.31 12.6903 43.0833 23.5003 43.0833C34.3103 43.0833 43.0837 34.31 43.0837 23.5C43.0837 12.69 34.3103 3.91667 23.5003 3.91667ZM26.2616 35.4263V39.1667H21.0328V35.3871C17.6841 34.6821 14.8445 32.5279 14.6291 28.7288H18.4674C18.6632 30.785 20.0732 32.3908 23.657 32.3908C27.4953 32.3908 28.357 30.4717 28.357 29.2771C28.357 27.6517 27.4953 26.1242 23.1282 25.0863C18.2716 23.9113 14.9424 21.9138 14.9424 17.8992C14.9424 14.5308 17.6645 12.3375 21.0328 11.6129V7.83334H26.2616V11.6521C29.9041 12.5333 31.7253 15.2946 31.8428 18.2908H28.0045C27.9066 16.1171 26.7512 14.6288 23.657 14.6288C20.7195 14.6288 18.957 15.9604 18.957 17.8404C18.957 19.4854 20.2299 20.5625 24.1857 21.5808C28.1416 22.5992 32.3716 24.3029 32.3716 29.2379C32.352 32.8217 29.6691 34.78 26.2616 35.4263Z" fill="#3182CE"/>
</svg>
  */}


    </Box>

  )
}
