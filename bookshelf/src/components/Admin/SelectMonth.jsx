import React from 'react'
import { Checkbox, Flex, Select,Spacer,Text} from '@chakra-ui/react'

export default function SelectMonth() {
  return (

    <Flex gap={10} alignItems={'center'}>

      <Select placeholder='January' w={'100'} size={'sm'} borderRadius={5} borderColor={'blue.200'} pl={10}>
        <option value='option1'>February</option>
        <option value='option2'>March</option>
        <option value='option3'>April</option>
        <option value='option4'>May</option>
        <option value='option5'>June</option>
        <option value='option6'>July</option>
        <option value='option7'>August</option>
        <option value='option8'>Sepetember</option>
        <option value='option8'>October</option>
        <option value='option8'>November</option>
        <option value='option8'>December</option>
      </Select>

    </Flex>
    
  )
}
