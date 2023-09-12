import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  
} from "@chakra-ui/react";
import Search from "../../components/Sharing/Search";
import Filter from "../../components/Sharing/Filter";
import ShareBookDetails from "../../components/Sharing/ShareBookDetails";
import { Link } from 'react-router-dom'

function ShareBook() {
  const bookDetails = {
    book1: {
      id: '1',
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
    },
    book2: {
      id: '2',
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
    },
    book3: {
      id: '3',
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
    },
    book4: {
      id: '4',
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
    },
  }
  return (
    <Box
      border={"1px"}
      borderRadius={"10"}
      borderColor={"blue.200"}
      padding={10}
    >
      <Grid
        templateRows="50px 50px repeat(8, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
        h={"100%"}
      >
        <GridItem rowSpan={1} colSpan={5}>
          <Search />
        </GridItem>
        <GridItem rowSpan={1} colSpan={5} p={2}>
          <Filter />
        </GridItem>

        <GridItem
          rowSpan={8}
          colSpan={5}
        >
          {Object.keys(bookDetails).map((item) => (
            // <Link to={`/shareBook/${bookDetails[item].id}`}
            //   key={bookDetails[item].id}>
              <ShareBookDetails
                name={bookDetails[item].title}
                author={bookDetails[item].author}
                
                imageURL={bookDetails[item].image}
              />
          
            // </Link>
          ))}
          
          </GridItem>
      </Grid>
    </Box>
  );
}
export default ShareBook;
