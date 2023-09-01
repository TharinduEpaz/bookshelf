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
import { PiHandHeartDuotone } from "react-icons/pi";
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
			height={425}
		>
			{children}
		</Box>
	);
}

function BookReder() {
	const [subscriptionType, setSubscriptionType] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = React.useRef()

	//get subscription details
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

	//add subscription user
	
	const addSubscriptionUser = async () => {
			try {
				const response = await axios.post(
					"http://localhost:3000/api/v1/subscriptions/addSubscription",
					{
						subscriptionType: "Book Lover"
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
		};
		
	

	

	return (
		<div>
			<PriceWrapper>
				<Box position="relative" boxSize={430}>
					<Box
						position="absolute"
						top="-16px"
						left="80%"
						style={{ transform: "translate(-50%)" }}
					>
						<Text
							textTransform="uppercase"
							bg={useColorModeValue("red.300", "red.700")}
							px={3}
							py={1}
							color={useColorModeValue("gray.900", "gray.300")}
							fontSize="xl"
							fontWeight="600"
							rounded="xl"
						>
							Popular
						</Text>
					</Box>
					<Box py={7} px={12}>
						<Grid templateColumns="auto 1fr" gap={4}>
							{/* First column with icon */}
							<GridItem marginTop={6}>
								{/* Add your desired icon from the react-icons library */}
								<PiHandHeartDuotone size={50} color="red" />
							</GridItem>

							{/* Second column (spanning two rows) */}
							<GridItem textAlign={"start"}>
								{subscriptionType.length > 0 ? (
									<>
										<Text fontWeight="500" fontSize="3xl">
											{subscriptionType[1].firstName}
										</Text>
										<Text fontSize="4xl" fontWeight="900">
											{subscriptionType[1].LastName}
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
						<List spacing={"14"} textAlign="start" px={12}>
							<ListItem fontSize={18}>
								<ListIcon
									as={FaCheckCircle}
									color="green.500"
								/>
								{subscriptionType.length > 0 ? (
									<Text as={"b"}>
										{subscriptionType[1].book_count} book
										every for{" "}
										{subscriptionType[1].time_period}
									</Text>
								) : (
									<Text> </Text>
								)}
							</ListItem>
							<ListItem>
								<ListIcon
									as={FaCheckCircle}
									color="green.500"
								/>
								Time extensions.
							</ListItem>
							<ListItem>
								<ListIcon
									as={FaCheckCircle}
									color="green.500"
								/>
								Money Back Gurantee.
							</ListItem>
						</List>
						<Box w="80%" pt={7}>
							{/* <RouterLink to="/selectBookWorm"> */}
							<Button
								ml={5}
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
													{subscriptionType[1].firstName}
													{" "}
													{subscriptionType[1].LastName} {" "}
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
										<RouterLink to={'/selectBookLover'} onClick={addSubscriptionUser}>
											<Button colorScheme='purple' ml={3}>
												Yes
											</Button>
										</RouterLink>

									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</Box>
					</VStack>
				</Box>
			</PriceWrapper>
		</div>
	);
}

export default BookReder;
