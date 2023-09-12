import React from 'react'
import {
	Box,
    Stack,
	useColorModeValue,
} from "@chakra-ui/react";

import BookReader from './BookReader';
import BookLover from './BookLover';
import BookWorm from './BookWorm';

function Packages() {
  return (
		<div>
			<Stack
				direction={{ base: "column", md: "row" }}
				textAlign="center"
				justify="center"
				spacing={{ base: 4, lg: 10 }}
				py={16}
			>
				<BookReader/>

                <BookLover/>

				<BookWorm/>
				
			</Stack>
		</div>
  );
}

export default Packages