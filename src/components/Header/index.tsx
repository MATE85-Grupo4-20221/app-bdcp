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
import { Link, NavLink } from 'react-router-dom'

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
      <Flex alignItems='center' outline='none'>
        <Flex as={Link} to='/' alignItems='center'>
          <Image w='32px' src={logoImage} alt='Estudantes' />

          <Heading ml={4} color='white' size='md'>
            Conteúdos Programáticos
          </Heading>
        </Flex>

        <HStack mx={16} spacing={8}>
          <NavLink to='/disciplinas'>
            {({ isActive }) => (
              <Box borderBottomWidth={isActive ? 1 : 0}>
                <Heading color='white' fontSize={16}>
                  Disciplinas
                </Heading>
              </Box>
            )}
          </NavLink>
          <NavLink to='/usuarios'>
            {({ isActive }) => (
              <Box borderBottomWidth={isActive ? 1 : 0}>
                <Heading color='white' fontSize={16}>
                  Usuários
                </Heading>
              </Box>
            )}
          </NavLink>
        </HStack>
      </Flex>

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
              <MenuItem>Editar perfil</MenuItem>
              <MenuItem onClick={auth.logout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </HStack>
  )
}
