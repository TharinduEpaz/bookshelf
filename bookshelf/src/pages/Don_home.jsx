import React from 'react'

import bookgirl from "../assets/bookgirl.png";
import { Text, Box, Flex, Grid, GridItem, Heading, Center } from '@chakra-ui/react'
import Search from '../components/Donation/Search'
import Card from '../components/Donation/Card'
//import Filter from '../components/Shop/Filter'
import CategoryFilter from '../components/Donation/DonationCategories'
import DonationCard from '../components/Donation/DonationCard'

import { Link } from 'react-router-dom';



function Shop() {
  const bookDetails = {
    d1: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://123read2me.org.au/wp-content/uploads/2021/04/123RTM-BinGlove-2-818x1024.png",
      price: "700",
      needsfor: "Tarana Foundation",

    },
    d2: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlrG3yAClXl0LEWma1po1qCpDuAgQ0dyUWcg&usqp=CAU",
      price: "700",
    },
    d3: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnsNRmCEGFBWf2Lf-P2ghDXBAZ8YXoN8WEWg&usqp=CAU",
      price: "700",
    },
    d4: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://www.whatdowedoallday.com/wp-content/uploads/2013/11/charity-pin-680.jpg",
      price: "700",
    },
    d5: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrC58CWWPcQrr-LE8CVaLMfc2yXhuuwpwcfIZVqK3jXZLYQeTZGoyNerpCKmWRChyDrUU&usqp=CAU",
      price: "700",
    }, 
    d6: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://openarc.lk/wp-content/uploads/2017/04/su-1.jpg",
      price: "700",
    },
    d7: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "",
      price: "700",
    },
    d8: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://123read2me.org.au/wp-content/uploads/2021/04/123RTM-BinGlove-2-818x1024.png",
      price: "700",
    },
    d9: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://123read2me.org.au/wp-content/uploads/2021/04/123RTM-BinGlove-2-818x1024.png",
      price: "700",
    },
    d10: {
      title: "Donate an Educational Pack to Survivors of Child Abuse",
      image: "https://123read2me.org.au/wp-content/uploads/2021/04/123RTM-BinGlove-2-818x1024.png",
      price: "700",
    },
  
  };
  return (
    <>
      <Card
        title="With love and kindness, we join renowned charities in Sri Lanka, gifting books to those in need, illuminating lives with endless possibilities."
        //image={bookgirl}

      text= 
        "Support and help the much needed local communities in Sri Lanka by donating books and educational materials."
      
      />
      
    <Box
    height={'100%'}
    m={"auto"}
    mt={10}
    w="80%"
    borderRadius="md"
    boxShadow="sm"
    bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
    // filter="blur(8px)"
    backdropFilter="blur(8px)"
    p={10}
    
  >
  
    
    <Grid
      
      templateRows="50px 50px repeat(8, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
      h={'100%'}
      >
      <GridItem rowSpan={1} colSpan={5} >
        <Search/>
      </GridItem>
      <GridItem rowSpan={1} colSpan={5} p={2}>
      
      </GridItem>
      <GridItem rowSpan={8} colSpan={1} border={'1px'} borderColor={'blue.200'} rounded={'md'}>
        <CategoryFilter />
      </GridItem>
      <GridItem rowSpan={8} colSpan={4} border={'1px'} borderColor={'blue.200'} rounded={'md'}>
      <Flex flexWrap={'wrap'} gap={10} p={10}>
      {Object.keys(bookDetails).map((item) => (
            <Link key={item} to={`/donate/${item}`}>
            <DonationCard
              name={bookDetails[item].title}
              price={bookDetails[item].price}
              needsfor={bookDetails[item].needsfor}
              imageURL={bookDetails[item].image}
            />
          </Link>
          ))}
          </Flex>
      </GridItem>
      </Grid>
    </Box>
    
    </>
  )
}

export default Shop