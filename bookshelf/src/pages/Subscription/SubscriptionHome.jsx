import React from "react";
import BlurWhiteBox from "../../components/Subscription/BlureWhiteBox";
import HomeItemBox from "../../components/Home/HomeItemBox";
import { Center, Divider, Flex, Heading } from "@chakra-ui/react";
import books from "../../assets/g.png";
import { FaBookOpen, FaFire, FaHeart } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import BookCard from "../../components/Shop/BookCard"
import { useBooksContext } from "../../context/booksContext"



function SharingHome() {

    const { books } = useBooksContext();

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
    const SubscriptionImage = 'subscriptionHome.png'
    return (
        <>
            <BlurWhiteBox
                title="Indulge in your literary cravings with our carefully curated subscriptions,"
                image={SubscriptionImage}
            />
            <Center>
                <Heading
                    alignSelf={"center"}

                    fontWeight={'light'}
                    size={"sm"}
                    mt={20}
                    letterSpacing={5}

                >

                    FEATURED CATEGORIES
                </Heading>

            </Center>

            <Flex
                gap={10}
                alignItems={"center"}
                justifyContent={"center"}
                w={"100%"}
                mt={20}
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
                    fontWeight={'light'}
                    size={"sm"}
                    mt={20}
                    letterSpacing={5}

                >
                    NEW ARRIVALS
                </Heading>
            </Center>
            <Flex
                ml={200}
                gap={10}
                alignItems={"center"}
                justifyContent={"left"}
                w={"100%"}
                mt={10}
                flexWrap={{ base: "wrap", md: "wrap", lg: "wrap" }}
                
            >
                {books.map((book, index) => (

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
        </>
    );
}

export default SharingHome;
