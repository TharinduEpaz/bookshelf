import { Checkbox, Flex, Select,Spacer,Text} from '@chakra-ui/react'
import React from 'react'


function Filter() {
  return (
    <Flex gap={10} alignItems={'center'}>
    
    <Text fontWeight={'bold'}>Filter by </Text>
      <Select placeholder='category' w={'100'} size={'sm'} borderRadius={5} borderColor={'blue.200'}>
        <option value='option1'>Min to Max</option>
        <option value='option2'>Max to Min</option>
      </Select>
     
      <Spacer></Spacer>
      <Text fontWeight={'bold'}>Sort by </Text>
      <Select placeholder='Best Match' w={'100'} size={'sm'} borderRadius={5} borderColor={'blue.200'}>
        <option value='option1'>Min to Max</option>
        <option value='option2'>Max to Min</option>
      </Select>


    </Flex>
  )
}

export default Filter