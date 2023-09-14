import { Td, HStack } from '@chakra-ui/react'
import React from 'react'
import AddBookModal from './AddBookModal'

export default function Inventory_Main(id) {
  return (
    <>
    <Td>
        <HStack>
            <AddBookModal id={id.id}/>
            {/* <EditBookModal />
            <DeleteBookModal /> */}
        </HStack>
    </Td>
    </>
  )
}
