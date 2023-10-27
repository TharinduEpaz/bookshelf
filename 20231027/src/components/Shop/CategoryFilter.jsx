import { Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'

function CategoryFilter() {
  return (
    
    <UnorderedList styleType={'none'} m={5}>
      <ListItem fontWeight={'bold'} mb={5}>Category</ListItem>
      <ListItem>
        <UnorderedList styleType={'none'} fontSize={'sm'}>
          <ListItem><Link>Best Sellers</Link></ListItem>
          <ListItem><Link>Self Help and Development</Link></ListItem>
          <ListItem><Link>Philosophy</Link></ListItem>
          <ListItem><Link>Arts and Photography</Link></ListItem>
          <ListItem><Link>Health and Fitness</Link></ListItem>
          <ListItem><Link>Romance</Link></ListItem>
          <ListItem><Link>Sports</Link></ListItem>
          <ListItem><Link>Business  & Economy</Link></ListItem>
          <ListItem><Link>Collections</Link></ListItem>
          <ListItem><Link>Fiction</Link></ListItem>
          <ListItem><Link>Science Fiction</Link></ListItem>
        </UnorderedList>
        </ListItem>
        <ListItem fontWeight={'bold'} mb={5} mt={5}>Language</ListItem>
      <ListItem>
        <UnorderedList styleType={'none'} fontSize={'sm'}>
          <ListItem><Link>English</Link></ListItem>
          <ListItem><Link>Sinhala</Link></ListItem>
          <ListItem><Link>Tamil</Link></ListItem>
          <ListItem><Link>Other</Link></ListItem>
        </UnorderedList>

      </ListItem>
    </UnorderedList>

  )
}

export default CategoryFilter