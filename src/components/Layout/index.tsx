import { Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from 'components/Header'

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  return (
    <VStack h='100%' alignItems='stretch' spacing={0}>
      <Header />

      <Flex as='main' h='calc(100% - 80px)'>
        <Outlet />
      </Flex>
    </VStack>
  )
}
