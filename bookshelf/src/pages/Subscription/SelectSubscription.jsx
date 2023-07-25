import React from "react";
import Packages from "../../components/Subscription/Packages";

import {
	Box,
	Text,
	VStack,
} from "@chakra-ui/react";

function SelectSubscription() {
	return (
		<div>
			<Box
				m="auto"
				mt={10}
				w={1400}
				h={800}
				boxShadow="sm"
				backgroundColor="white"
				borderRadius={10}
				p={4} >

				<VStack spacing={2} textAlign="center">
					<Text as="h1" fontSize="4xl">
						Delve into a world of{" "}
						<strong>captivating subscriptions,</strong> <br />
						perfectly <strong>suited to fulfill</strong> your
						insatiable <strong>craving</strong> for books
					</Text>
					<Text fontSize="lg" color={"black"}>
						get a book once or twice a month for a price lesser than
						20% of the real price.
					</Text>
				</VStack>

                <Packages/>
			</Box>
		</div>
	);
}

export default SelectSubscription;
