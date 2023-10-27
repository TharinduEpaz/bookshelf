import { Alert, Flex } from '@chakra-ui/react'
import React from 'react'

const PaymentSuccess = () => {
  return (
    <Flex mb={'100vh'} direction={'column'}>
        <Alert>
            Payment Completed successfully
        </Alert>
    </Flex>
  )
}

export default PaymentSuccess