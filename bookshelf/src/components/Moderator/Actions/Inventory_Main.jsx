import { Td, HStack } from '@chakra-ui/react'
import React from 'react'
import AddBookModal from './ViewBookModal'
import DeleteBookModal from './DeleteBookModal'

export default function Inventory_Main(id) {
  return (
    <>
    <Td>
        <HStack>
            <AddBookModal id={id.id} />
            {/* <EditBookModal /> */}
            <DeleteBookModal id={id.id} />
        </HStack>
    </Td>
    </>
  )
}
