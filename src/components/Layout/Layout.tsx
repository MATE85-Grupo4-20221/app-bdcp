import { Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from 'components/Header'

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <VStack h='100%' alignItems='stretch' spacing={0}>
      <Header />

      <Flex as='main' flex={1}>
        <Outlet />
      </Flex>
    </VStack>
  )
}

export default Layout
