import { HStack, Td } from '@chakra-ui/react'
import React from 'react'
import ViewOrder from './ViewOrder'
import DeleteOrder from './DeleteOrder'

export default function Order_Main(id) {
  return (
    <>
        <Td>
            <HStack>
                <ViewOrder id={id.id} />
                <DeleteOrder id={id.id} />
            </HStack>
        </Td>
    </>
  )
}
