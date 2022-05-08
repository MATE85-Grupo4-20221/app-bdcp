import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

import authImage from 'assets/images/computacao-logo.png'
import { Header } from 'components/Header'

export interface PublicLayoutProps {}

export const PublicLayout: React.FC<PublicLayoutProps> = () => {
  return (
    <VStack h='100%' alignItems='stretch' spacing={0}>
      <Header />

      <Flex as='main' h='calc(100% - 80px)'>
        <Outlet />
      </Flex>
    </VStack>
  )
}

export interface ProtectedLayoutProps {}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
}) => {
  return (
    <HStack h='100%' spacing={0} alignItems='center'>
      <Box
        w={{
          base: '100%',
          xl: '640px',
          lg: '480px',
        }}
      >
        <Outlet />
      </Box>

      <VStack
        h='100%'
        px={8}
        display={{ base: 'none', lg: 'flex' }}
        flex={1}
        alignItems='center'
        justifyContent='center'
        bgColor='primary.500'
      >
        <Image src={authImage} alt='Estudantes' />
      </VStack>
    </HStack>
  )
}
