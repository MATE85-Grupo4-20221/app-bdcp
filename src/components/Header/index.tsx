import { Button, Heading, HStack } from '@chakra-ui/react'
import React from 'react'

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <HStack as='nav' h='80px' px='8' flexShrink={0} bgColor='primary.500'>
      <Heading flex={1} color='white' size='md'>
        Grupo 4
      </Heading>

      <Button colorScheme='white'>Entrar</Button>
    </HStack>
  )
}