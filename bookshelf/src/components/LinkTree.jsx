import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs";
import { Link } from 'react-router-dom';


const LinkTree = (props) => {
  const {productName} = props
  return (
    <Breadcrumb
              spacing="8px"
              separator={<BsChevronRight color="gray.500" />}
            >
              <BreadcrumbItem>
              <Link to={'/'}>
                Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
              <Link to={'/shop'}>
                Shop
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="">{productName}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
  )
}

export default LinkTree;