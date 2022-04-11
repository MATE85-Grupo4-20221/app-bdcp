import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from 'contexts/auth'

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const auth = useAuth()

  return (
    <HStack as='nav' h='80px' px='8' flexShrink={0} bgColor='primary.500'>
      <Heading flex={1} color='white' size='md'>
        Grupo 4
      </Heading>

      <Box>
        <Button hidden={!auth.isAuthenticated} mr={4} colorScheme='secondary'>
          Adicionar disciplina
        </Button>

        {!auth.isAuthenticated ? (
          <Link to='/entrar'>
            <Button colorScheme='white'>Entrar</Button>
          </Link>
        ) : (
          <Button colorScheme='white' onClick={auth.logout}>
            Sair
          </Button>
        )}
      </Box>
    </HStack>
  )
}
