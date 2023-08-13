import React,{ useEffect, useState } from "react";

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
} from "@chakra-ui/react";

import { FaCheckCircle } from "react-icons/fa";
import { PiHandHeartDuotone } from "react-icons/pi"; 
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";


interface Subscription {
	firstName: string;
	LastName: string;
	time_period: number;
	book_count: number;
}

function PriceWrapper({ children }: { children: React.ReactNode }) {
	
	return (
		<Box
			mb={4}
			shadow="base"
			borderWidth="1px"
			alignSelf={{ base: "center", lg: "flex-start" }}
			// borderColor={useColorModeValue("gray.200", "gray.500")}
			borderColor={"blue.200"}
			borderRadius={"xl"}
			height={425}
		>
			{children}
		</Box>
	);
}

function BookReder() {
	const [subscriptionType, setSubscriptionType] = useState<Subscription[]>(
		[]
	);

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
											{subscriptionType[2].firstName}
										</Text>
										<Text fontSize="4xl" fontWeight="900">
											{subscriptionType[2].LastName}
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
									<Text as={'b'}>
										{subscriptionType[2].book_count} book
										every for{" "}
										{subscriptionType[2].time_period}
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
							<RouterLink to="/selectBookLover">
								<Button
									ml={5}
									colorScheme="purple"
									w={130}
									borderRadius={100}
								>
									Select
								</Button>
							</RouterLink>
						</Box>
					</VStack>
				</Box>
			</PriceWrapper>
		</div>
	);
}

export default BookReder;
