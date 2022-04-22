import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import logoImage from 'assets/images/computacao-logo.png'
import { useAuth } from 'contexts/auth'

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const auth = useAuth()

  const isXs = useBreakpointValue({ base: true, sm: false })

  return (
    <HStack
      as='nav'
      position='sticky'
      top={0}
      zIndex={10}
      h='80px'
      px='8'
      flexShrink={0}
      justifyContent='space-between'
      bgColor='primary.500'
    >
      <HStack as={Link} to='/' spacing={6} outline='none'>
        <Image w='32px' src={logoImage} alt='Estudantes' />

        <Heading flex={1} color='white' size='md'>
          Conteúdos Programáticos
        </Heading>
      </HStack>

      <Box>
        <Link hidden={!auth.isAuthenticated} to='/disciplinas/adicionar'>
          <Button mr={4} colorScheme='secondary'>
            {isXs ? <AddIcon /> : 'Adicionar disciplina'}
          </Button>
        </Link>

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
