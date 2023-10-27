import { Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'

function DonationCategories() {
  return (
    
    <UnorderedList styleType={'none'} m={5}>
      <ListItem fontWeight={'bold'} mb={5}>Categories</ListItem>
      <ListItem>
        <UnorderedList styleType={'none'} fontSize={'sm'}>
          <ListItem><a href="..\pages\DonationDetails.jsx">Donation for children</a></ListItem>
          <ListItem><a href="..\pages\DonationDetails.jsx">For schools</a></ListItem>
          <ListItem><a href="..\pages\DonationDetails.jsx">Unprivileged youth</a></ListItem>
          <ListItem><a href="..\pages\DonationDetails.jsx">School Items</a></ListItem>
          <ListItem><a href="..\pages\DonationDetails.jsx">Child Services</a></ListItem>
        </UnorderedList>
        </ListItem>

    </UnorderedList>

  )
}

export default DonationCategories
