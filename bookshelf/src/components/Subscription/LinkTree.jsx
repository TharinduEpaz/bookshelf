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
                <BreadcrumbLink href="/subscriptions">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
        <BreadcrumbLink href="/selectSubscription">Subscription</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Select Book</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
  )
}

export default LinkTree;