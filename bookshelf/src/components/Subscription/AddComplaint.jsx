import React from 'react'

import { Text,Box,Button } from "@chakra-ui/react";

function AddComplaint() {
  return (
    <Box padding={5}>
      <Text fontSize={'2xl'} fontWeight={'extrabold'}>
        Add a Complaint
      </Text>
      <Text fontSize={'xl'} padding={4}>
            You can add complaints to bookshelf admin about any issue you have been faced. 
      </Text>

          <Button
              color={'#3182CE'}
              variant={'outline'}
              border={'1px'}
              borderRadius={10}
              marginLeft={5}>
              Add a Complaint
          </Button>
    </Box>
  )
}

export default AddComplaint
