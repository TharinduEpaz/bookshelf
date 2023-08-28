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
                <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
              <Link to={'/shop'}>
                <BreadcrumbLink>Shop</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="">{productName}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
  )
}

export default LinkTree;