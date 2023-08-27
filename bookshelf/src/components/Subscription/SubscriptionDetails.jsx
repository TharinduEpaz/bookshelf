import React from 'react'
import {
    Box, 
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";

function SubscriptionDetails() {
  return (
    <div>
          <Accordion allowToggle paddingTop={3}>
              <AccordionItem>
                  <h2>
                      <AccordionButton bg={'blue.100'}>
                          <Box as="b" flex='1' textAlign='left' fontSize={'2xl'}>
                              Details
                          </Box>
                          <AccordionIcon as={'b'}/>
                      </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg={'white'}>
                      <Text paddingLeft={10} fontSize={'xl'}>
                        Terms for the book lover subscription package
                      </Text>
                      <UnorderedList paddingLeft={20} fontSize={'lg'}>
                          <ListItem>L1 book for one month</ListItem>
                          <ListItem>20% of the original price of the book</ListItem>
                          <ListItem>Doorstep delivery</ListItem>
                          <ListItem>Please make sure the book has the optimal quality when returned to avoid extra quality check charges</ListItem>
                      </UnorderedList>
                  </AccordionPanel>
              </AccordionItem>
          </Accordion>
    </div>
  )
}

export default SubscriptionDetails
