import {
  Box,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SelectInput } from 'components/SelectInput'
import { ComponentLog, ListData } from 'types'
import { formatDate } from 'utils/date'

export interface ComponentHistoricProps {
  logs: ListData<ComponentLog>
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onTypeChange: (type: ComponentLog['type']) => void
}

const logLabelMap = {
  approval: 'Aprovação',
  creation: 'Criação',
  draft_update: 'Atualização',
}

export const ComponentHistoric: React.FC<ComponentHistoricProps> = ({
  logs,
  currentPage,
  totalPages,
  onPageChange,
  onTypeChange,
}) => {
  const form = useForm()

  const hasPreviousPage = currentPage >= 1
  const hasNextPage = currentPage + 1 < totalPages

  useEffect(() => {
    onTypeChange(form.getValues().type)
  }, [form.watch('type')])

  return (
    <Box h='full'>
      <Box w='fit-content' mb={6}>
        <SelectInput
          name='type'
          label='Tipo de operação'
          control={form.control}
        >
          <option value=''>Todos</option>
          <option value='approval'>Aprovação</option>
          <option value='creation'>Criação</option>
          <option value='draft_update'>Atualização</option>
        </SelectInput>
      </Box>

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
        <Box borderBottomWidth={1} py={4} px={4} className='table-row'>
          <Heading width={300} size='sm'>
            Nome
          </Heading>
          <Heading className='table-cell' size='sm'>
            Operação
          </Heading>
          <Heading className='table-cell' size='sm'>
            Data
          </Heading>
        </Box>

        <Box maxH='300px' overflow='auto'>
          {logs.results.map(log => (
            <Box key={log.id}>
              <Box py={4} px={4} className='table-row'>
                <Box width={300}>
                  <Text>{log.user?.name}</Text>
                </Box>
                <Box className='table-cell'>
                  <Text>{logLabelMap[log.type]}</Text>
                </Box>
                <Box className='table-cell'>
                  <Text>{formatDate(log.createdAt)}</Text>
                </Box>
              </Box>

              <Divider />
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
