import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { BsChevronRight } from "react-icons/bs";


const LinkTree = () => {
  return (
    <Breadcrumb
              spacing="8px"
              separator={<BsChevronRight color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">Shop</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Product name</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
  )
}

export default LinkTree;