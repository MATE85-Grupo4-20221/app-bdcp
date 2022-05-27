import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { MdPerson } from 'react-icons/md'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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

      <Flex alignItems='center'>
        <Link hidden={!auth.isAuthenticated} to='/disciplinas/adicionar'>
          <Button mr={6} size='sm' colorScheme='secondary'>
            {isXs ? <AddIcon /> : 'Adicionar disciplina'}
          </Button>
        </Link>

        {!auth.isAuthenticated ? (
          <Link to='/entrar'>
            <Button colorScheme='white'>Entrar</Button>
          </Link>
        ) : (
          <Menu>
            <MenuButton>
              <Flex alignItems='center'>
                {/* TODO: Use user profile photo */}
                <Avatar
                  bg='white'
                  color='black'
                  size='sm'
                  icon={<MdPerson fontSize='1.5rem' />}
                />
                <ChevronDownIcon ml={1} color='white' />
              </Flex>
            </MenuButton>

            <MenuList>
              <Link to='/perfil'>
                <MenuItem>Editar perfil</MenuItem>
              </Link>
              <MenuItem onClick={auth.logout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </HStack>
  )
}
