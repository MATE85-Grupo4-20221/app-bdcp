import { Heading, HStack } from '@chakra-ui/react'
import React from 'react'

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <HStack as='nav' h='80px' px='8' flexShrink={0} bgColor='primary.500'>
      <Heading size='md'>Grupo 4</Heading>
    </HStack>
  )
}

export default Header
