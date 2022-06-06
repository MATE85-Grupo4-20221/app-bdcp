import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { MdChevronLeft, MdChevronRight, MdDelete } from 'react-icons/md'

import { ListData, User } from 'types'
import { formatDate } from 'utils/date'

import { RemoveUserDialog } from './RemoveUserDialog'

export interface UsersTableProps {
  users: ListData<User>
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onRemoveUser: (user: User) => Promise<void>
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  onRemoveUser,
}) => {
  const hasPreviousPage = currentPage >= 1
  const hasNextPage = currentPage + 1 < totalPages

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Box
        overflow='hidden'
        color='black'
        borderWidth={1}
        borderRadius={4}
        sx={{
          '.table-cell': {
            width: '150px',
          },
          '.table-row': {
            display: 'flex',
            flexFlow: 'row wrap',
          },
        }}
      >
        <Flex borderBottomWidth={1} py={4} px={4}>
          <Heading width={300} size='sm'>
            Nome
          </Heading>
          <Heading width={300} size='sm'>
            E-mail
          </Heading>
          <Heading width={150} size='sm'>
            Data
          </Heading>
          <Heading minW={150} flexGrow={1} size='sm'></Heading>
        </Flex>

        <Box maxH='300px' overflow='auto'>
          {users.results.map(user => (
            <Box key={user.id}>
              <Flex py={4} px={4} alignItems='center'>
                <Box width={300}>
                  <Text>{user.name}</Text>
                </Box>
                <Box width={300}>
                  <Text>{user.email}</Text>
                </Box>
                <Box width={150}>
                  <Text>{formatDate(user.createdAt)}</Text>
                </Box>
                <HStack minW={150} flexGrow={1} justifyContent='flex-end'>
                  <IconButton
                    aria-label='Editar'
                    icon={<MdDelete color='black' size={20} />}
                    onClick={onOpen}
                  />
                </HStack>
              </Flex>

              <Divider />

              <RemoveUserDialog
                username={user.name}
                open={isOpen}
                onClose={onClose}
                onRemove={() => onRemoveUser(user)}
              />
            </Box>
          ))}
        </Box>

        <Box borderTopWidth={1} px={4} py={4}>
          <HStack justifyContent='flex-end'>
            <Box>
              {totalPages > 0 && (
                <Text>
                  {currentPage + 1} de {totalPages}
                </Text>
              )}
            </Box>

            <IconButton
              disabled={!hasPreviousPage}
              icon={<MdChevronLeft />}
              aria-label='Anterior'
              onClick={() => onPageChange(currentPage - 1)}
            />
            <IconButton
              disabled={!hasNextPage}
              icon={<MdChevronRight />}
              aria-label='Próximo'
              onClick={() => onPageChange(currentPage + 1)}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}
