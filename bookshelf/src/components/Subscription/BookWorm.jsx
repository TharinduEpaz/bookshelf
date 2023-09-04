import React, { useEffect, useState } from "react";
import {
	Box,
	Text,
	VStack,
	useColorModeValue,
	List,
	ListItem,
	ListIcon,
	Button,
	Grid,
	GridItem,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { GiSandSnake } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

function PriceWrapper({ children }) {
	return (
		<Box
			mb={4}
			shadow="base"
			borderWidth="1px"
			alignSelf={{ base: "center", lg: "flex-start" }}
			borderColor={"blue.200"}
			borderRadius={"xl"}
		>
			{children}
		</Box>
	);
}

function BookReder() {
	const [subscriptionType, setSubscriptionType] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = React.useRef()


	useEffect(() => {
		const getSubscription = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/v1/subscriptions"
				);
				setSubscriptionType(response.data);
			} catch (error) {
				console.error("Error fetching subscription:", error);
			}
		};
		getSubscription();
	}, []);

	async function addSubscriptionUser() {

		try {
			const response = await axios.post(
				"http://localhost:3000/api/v1/subscriptions/addSubscription",
				{
					subscriptionType: "Book Worm"
				},
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);


		} catch (error) {
			console.error("Error fetching subscription:", error);
		}
	}

	return (
		<div>
			<PriceWrapper>
				<Box py={7} px={12}>
					<Grid templateColumns="auto 1fr" gap={4}>
						{/* First column with icon */}
						<GridItem marginTop={6}>
							{/* Add your desired icon from the react-icons library */}
							<GiSandSnake size={50} color="darkgreen" />
						</GridItem>

						{/* Second column (spanning two rows) */}
						<GridItem textAlign={"start"}>
							{/* First row in the second column */}
							{subscriptionType.length > 0 ? (
								<>
									<Text fontWeight="500" fontSize="3xl">
										{subscriptionType[0].firstName}
									</Text>
									<Text fontSize="4xl" fontWeight="900">
										{subscriptionType[0].LastName}
									</Text>
								</>
							) : (
								<Text>Loading subscription data...</Text>
							)}
						</GridItem>
					</Grid>
				</Box>
				<VStack
					bg={useColorModeValue("gray.50", "gray.700")}
					py={4}
					borderBottomRadius={"xl"}
				>
					<List spacing={3} textAlign="start" px={12}>
						<ListItem fontSize={18}>
							<ListIcon as={FaCheckCircle} color="green.500" />
							<b>
								{subscriptionType.length > 0 ? (
									<>
										{subscriptionType[0].book_count} book
										every for{" "}
										{subscriptionType[0].time_period}
									</>
								) : (
									<Text> </Text>
								)}
							</b>
						</ListItem>
						<ListItem>
							<ListIcon as={FaCheckCircle} color="green.500" />
							Time extensions.
						</ListItem>
						<ListItem>
							<ListIcon as={FaCheckCircle} color="green.500" />
							Money Back Guarantee.
						</ListItem>
					</List>
					<Box w="80%" pt={7}>
						{/* <RouterLink to="/selectBookWorm"> */}
							<Button
								ml={5}
								variant={"outline"}
								colorScheme="purple"
								w={130}
								borderRadius={100}
								onClick={onOpen}
							>
								Select
							</Button>
						{/* </RouterLink> */}
						<AlertDialog
							motionPreset='slideInBottom'
							leastDestructiveRef={cancelRef}
							onClose={onClose}
							isOpen={isOpen}
							isCentered
							size={'lg'}
						>
							<AlertDialogOverlay />

							<AlertDialogContent>
								<AlertDialogHeader>Select Subscription?</AlertDialogHeader>
								<AlertDialogCloseButton />
								<AlertDialogBody >
									<Text fontSize={18}>
										Are you sure you want to Select {subscriptionType.length > 0 ? (
											<Text as={'b'} fontSize={20}>
												{subscriptionType[0].firstName}
												{" "}
												{subscriptionType[0].LastName} {" "} 
											</Text>
											
										) : (
											<Text> </Text>
										)}.
										subscription
									</Text>
								</AlertDialogBody>
								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={onClose}>
										No
									</Button>
									<RouterLink to={'/selectBookWorm'}>
										<Button colorScheme='purple' ml={3} onClick={addSubscriptionUser}>
											Yes
										</Button>
									</RouterLink>
									
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</Box>
				</VStack>
			</PriceWrapper>
		</div>
	);
}

export default BookReder;
