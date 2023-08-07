import { Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'

function DonationCategories() {
  return (
    
    <UnorderedList styleType={'none'} m={5}>
      <ListItem fontWeight={'bold'} mb={5}>Categories</ListItem>
      <ListItem>
        <UnorderedList styleType={'none'} fontSize={'sm'}>
          <ListItem><Link>Donation for children</Link></ListItem>
          <ListItem><Link>For schools</Link></ListItem>
          <ListItem><Link>Unprivileged youth</Link></ListItem>
          <ListItem><Link>School Items</Link></ListItem>
          <ListItem><Link>Child Services</Link></ListItem>
        </UnorderedList>
        </ListItem>

    </UnorderedList>

  )
}

export default DonationCategories
