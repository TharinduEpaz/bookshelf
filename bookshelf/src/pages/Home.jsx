import React from "react";
import BlurWhiteBox from "../components/Home/BlurWhiteBox";
import HomeItemBox from "../components/Home/HomeItemBox";
import { Box, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import bookgirl from "../assets/bookgirl.png";
import { FaBookOpen, FaFire, FaHeart } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import BookCard from "../components/Home/BookCard";
import Features from "../components/Home/Features";

function Home() {
  const itemBoxDetails = {
    bestSellers: {
      header: "Best Sellers",
      bgColor: "#F9EFFF",
      icon: <FaFire size={25} color="#9747FF" />,
    },
    selfHelp: {
      header: "Self Help",
      bgColor: "#FCF3E9",
      icon: <FaBookOpen size={25} color="#FFA749" />,
    },
    romance: {
      header: "Romance",
      bgColor: "#F4E2E1",
      icon: <FaHeart size={25} color="#FA605B" />,
    },
    fiction: {
      header: "Fiction",
      bgColor: "#E2F0F2",
      icon: <BsStars size={25} color="#05CBEA" />,
    },
    collections: {
      header: "Collections",
      bgColor: "#FFF5F6",
      icon: <ImBooks size={25} color="#FF9798" />,
    },
  };

  const newArrivals = {
    book1: {
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      price: "14.99",
      rating: 4,
    },
    book2: {
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
      price: "14.99",
      rating: 4.5,
    },
    book3: {
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
      price: "14.99",
      rating: 3.2,
    },
    book4: {
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
      price: "14.99",
      rating: 4,
    },
    book5: {
      title: "The Push",
      author: "Ashley Audrain",
      image: "https://m.media-amazon.com/images/I/41ClAKnvFqL.jpg",
      price: "14.99",
      rating: 4.9,
    },
  

  };

  return (
    <>
      <BlurWhiteBox
        title="Find Your Next Literary Escape Browse, Click, and Get Lost in Stories!"
        image={bookgirl}
        mainButton="Shop"
        route="/shop"
      />
      <Box
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="2xl"
        boxShadow="sm"
        bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Center>
          <Heading
            alignSelf={"center"}
            fontWeight={"light"}
            size={"sm"}
            fontFamily={"Montserrat"}
          >
            Featured Categories
          </Heading>
        </Center>

        <Flex
          gap={10}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          mt={10}
          flexWrap={"wrap"}
          
        >
          {Object.keys(itemBoxDetails).map((item) => (
            <HomeItemBox
              key={item}
              header={itemBoxDetails[item].header}
              bgColor={itemBoxDetails[item].bgColor}
              icon={itemBoxDetails[item].icon}
            />
          ))}
        </Flex>
        <Center>
          <Heading
            alignSelf={"center"}
            fontWeight={"light"}
            size={"sm"}
            fontFamily={"Montserrat"}
            mt={20}
          >
            New Arrivals
          </Heading>
        </Center>
        <Flex
          gap={10}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          mt={10}
          flexWrap={"wrap"}
        >
          {Object.keys(newArrivals).map((item) => (
            <BookCard
              key={item}
              name={newArrivals[item].title}
              author={newArrivals[item].author}
              price={newArrivals[item].price}
              imageURL={newArrivals[item].image}
              rating={newArrivals[item].rating}
            />
          ))}
        </Flex>
        <Features />
      </Box>
    </>
  );
}

export default Home;
