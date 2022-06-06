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
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import api from 'api'
import logoImage from 'assets/images/computacao-logo.png'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'
import {
  ImportComponentsModalForm,
  ImportComponentsModalFormValues,
} from '../ImportComponentsModalForm'

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const auth = useAuth()
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const isXs = useBreakpointValue({ base: true, sm: false })

  const importComponents = async (data: ImportComponentsModalFormValues) => {
    try {
      await api.component.importComponents({
        cdCurso: Number(data.courseCode),
        nuPerCursoInicial: Number(data.semester),
      })

      toast({
        description: 'Disciplinas importadas com sucesso!',
        status: 'success',
      })

      onClose()
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

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

        {auth.isAuthenticated && (
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
        )}
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
              <MenuItem onClick={onOpen}>Importar disciplinas</MenuItem>
              <MenuItem as={Link} to='/perfil'>
                Editar perfil
              </MenuItem>
              <MenuItem onClick={auth.logout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <ImportComponentsModalForm
        open={isOpen}
        onClose={onClose}
        onSubmit={importComponents}
      />
    </HStack>
  )
}
