import React from 'react'
import { Box, Heading, HStack, useRadio, useRadioGroup } from '@chakra-ui/react'

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
    const { bookType, setBookType } = props

    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
         
          borderRadius='100'
          boxShadow='md'
          _checked={{
            bg: 'blue.200',
            color: 'blue.800',
            fontWeight: 'bold',
      
          }}
          _focus={{
            
          }}
          px={5}
          py={3}
          onClick={console.log(bookType)}
        >
          {props.children}
        </Box>
      </Box>
    )
  }
  export function RadioSet(props) {
    const {options,bookType, setBookType} = props
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'react',
    })
  
    const group = getRootProps()
  
    return (
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} bookType={bookType} setBookType={setBookType} {...radio}>
              {value}
            </RadioCard>
          )
        })}

      </HStack>
    )
  }
  export default RadioSet;
  