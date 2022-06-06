import {
  Container,
  Heading,
  Text,
  Box,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import api from 'api'
import { ListData, ListFilter, User } from 'types'

import { InviteModal } from './InviteModal'
import { UsersTable } from './UsersTable'

export interface UserListFilter extends ListFilter {}

const initialFilter: UserListFilter = {
  page: 0,
  limit: 10,
}

export const UserListPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [inviting, setInviting] = useState(false)
  const [filter, setFilter] = useState<UserListFilter>(initialFilter)

  const [users, setUsers] = useState<ListData<User>>({
    results: [],
    total: 0,
  })

  const [inviteToken, setInviteToken] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getUsers = async () => {
    const users = await api.user.getUsers(filter)

    setUsers({
      results: users.results,
      total: users.total,
    })
  }

  const generateInvite = async () => {
    setLoading(true)

    await api.user
      .generateInvite()
      .then(setInviteToken)
      .then(onOpen)
      .finally(() => setInviting(false))
  }

  const deleteUserById = async (userId: string) => {
    await api.user.deleteUserById(userId)
    await getUsers()
  }

  useEffect(() => {
    if (loading) return

    getUsers().finally(() => setLoading(false))
  }, [filter])

  return (
    <Container maxW='container.xl'>
      <HStack alignItems='center' justifyContent='space-between'>
        <Box py={8}>
          <Heading color='black'>Usuários</Heading>
          <Text color='black'>
            Visualize todos os usuários cadastrados no sistema.
          </Text>
        </Box>

        <Box>
          <Button
            colorScheme='primary'
            disabled={inviting}
            isLoading={inviting}
            onClick={generateInvite}
          >
            Gerar convite
          </Button>
        </Box>
      </HStack>

      <UsersTable
        users={users}
        currentPage={filter.page}
        totalPages={Math.ceil(users.total / filter.limit)}
        onPageChange={page => setFilter({ ...filter, page })}
        onRemoveUser={user => deleteUserById(user.id)}
      />

      <InviteModal
        link={`http://${window.location.host}/cadastrar/${inviteToken}`}
        open={isOpen}
        onClose={onClose}
      />
    </Container>
  )
}
