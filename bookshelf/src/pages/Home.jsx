import { React, useState, useEffect } from "react";
import BlurWhiteBox from "../components/Home/BlurWhiteBox";
import { BlurWhiteBox as DonationBox } from "../components/Donation/BlurWhiteBox";
import { BlurWhiteBox as SubscriptionBox } from "../components/Subscription/BlureWhiteBox";
import { BlurWhiteBox as SharingBox } from "../components/Sharing/BlurWhiteBox";

import HomeItemBox from "../components/Home/HomeItemBox";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
import bookgirl from "../assets/bookgirl.png";
import { FaBookOpen, FaFire, FaHeart } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import BookCard from "../components/Shop/BookCard";
import Features from "../components/Home/Features";
import { motion, AnimatePresence } from "framer-motion";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { useBooksContext } from "../context/booksContext";

function Home() {
  const itemBoxDetails = {
    bestSellers: {
      header: "Best Sellers",
      bgColor: "#F9EFFF",
      icon: <FaFire size={25} color="#9747FF" />,
      link: "/bestSellers",
    },
    selfHelp: {
      header: "Self Help",
      bgColor: "#FCF3E9",
      icon: <FaBookOpen size={25} color="#FFA749" />,
      link: "/selfHelp",
    },
    romance: {
      header: "Romance",
      bgColor: "#F4E2E1",
      icon: <FaHeart size={25} color="#FA605B" />,
      link: "/romance",
    },
    fiction: {
      header: "Fiction",
      bgColor: "#E2F0F2",
      icon: <BsStars size={25} color="#05CBEA" />,
      link: "/fiction",
    },
    collections: {
      header: "Collections",
      bgColor: "#FFF5F6",
      icon: <ImBooks size={25} color="#FF9798" />,
      link: "/collections",
    },
  };

  const homeImage = "home.png";

  //page section animation changes

  const [activeComponent, setActiveComponent] = useState(1);

  const {  books } = useBooksContext();



  
  

  useEffect(() => {
 
    const interval = setInterval(() => {
      setActiveComponent((prevComponent) => (prevComponent % 4) + 1);
    }, 100000000000000); // Change component every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <BlurWhiteBox
        title="Find Your Next Literary Escape Browse, Click, and Get Lost in Stories!"
        image={homeImage}
        mainButton="Shop"
        route="/shop"
        
      />
      </motion.div> */}

      {/* <Search />   */}
      <AnimatePresence mode="wait">
        {activeComponent === 1 && (
          <motion.div
            key="component1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BlurWhiteBox
              title="Find Your Next Literary Escape Browse, Click, and Get Lost in Stories!"
              image={homeImage}
              mainButton="Shop"
              route="/shop"
            />
          </motion.div>
        )}
        {activeComponent === 2 && (
          <motion.div
            key="component2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SubscriptionBox
              title="Indulge in your literary cravings with our carefully curated subscriptions,"
              image={"subscriptionHome.png"}
            />
          </motion.div>
        )}
        {activeComponent === 3 && (
          <motion.div
            key="component3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SharingBox
              title="Connecting Readers, One Swap at a Time"
              image={"sharingHome.png"}
            />
          </motion.div>
        )}
        {activeComponent === 4 && (
          <motion.div
            key="component4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DonationBox
              title="With love and kindness, we join renowned charities in Sri Lanka, gifting books to those in need."
              image={bookgirl}
              mainButton="Donate"
              route="/Don_home"
              mainButton1="Request for Donation"
              route1="/DonationRequest"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Box
          m={"auto"}
          mt={2}
          w="80%"
          borderRadius="2xl"
          boxShadow="sm"
          bgGradient="linear(to left, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))"
          // filter="blur(8px)"
          // backdropFilter="blur(8px)"
          p={10}
          
        >
          <Center >
            <Heading
              alignSelf={"center"}
              fontWeight={"light"}
              size={"sm"}
              fontFamily={"Montserrat"}
              // backdropFilter={'blur(8px)'}
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
            flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
            zIndex={-1000}
          >
            {Object.keys(itemBoxDetails).map((item) => (
              <Link to={itemBoxDetails[item].link} key={item}>
                <HomeItemBox
                  key={item}
                  header={itemBoxDetails[item].header}
                  bgColor={itemBoxDetails[item].bgColor}
                  icon={itemBoxDetails[item].icon}
                />
              </Link>
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
              Shop Now
            </Heading>
          </Center>
          <Flex
            gap={10}
            alignItems={"center"}
            justifyContent={"left"}
            w={"100%"}
            mt={10}
            flexWrap={{ base: "wrap", md: "wrap", lg: "wrap" }}
          >
            {books.map((book,index) => (
              <BookCard
                key={book.id}
                id={book.id}
                name={book.title}
                author={book.author}
                price={book.price}
                stock={book.stock}
                description={book.description}
                ISBN={book.ISBN}
                typesAvailable={book.typesAvailable}
                genre={book.genre}
                language={book.language}
                featuredCategory={book.featuredCategory}
                imageURL={book.image}
                rating={book.averageRating}
              />
            ))}
          </Flex>
          <Features />
        </Box>
      </motion.div>
    </>
  );
}

export default Home;
