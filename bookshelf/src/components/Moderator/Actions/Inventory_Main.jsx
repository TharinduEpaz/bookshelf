import { Td, HStack } from '@chakra-ui/react'
import React from 'react'
import ViewBookModal from './ViewBookModal'
import EditBookModal from './EditBookModal'
import DeleteBookModal from './DeleteBookModal'

export default function Inventory_Main(id) {
  return (
    <>
    <Td>
        <HStack>
            <ViewBookModal id={id.id} />
            <EditBookModal id={id.id} />
            <DeleteBookModal id={id.id} />
        </HStack>
    </Td>
    </>
  )
}
