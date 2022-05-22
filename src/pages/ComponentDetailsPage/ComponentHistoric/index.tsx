import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SelectInput } from 'components/SelectInput'
import { ComponentLog, ListData } from 'types'
import { formatDate } from 'utils/date'

export interface ComponentHistoricProps {
  logs: ListData<ComponentLog>
  hasPrevious: boolean
  hasNext: boolean
  onPreviousPage: () => void
  onNextPage: () => void
  onTypeChange: (type: ComponentLog['type']) => void
}

const logLabelMap = {
  approval: 'Aprovação',
  creation: 'Criação',
  update: 'Atualização',
}

export const ComponentHistoric: React.FC<ComponentHistoricProps> = ({
  logs,
  hasPrevious,
  hasNext,
  onPreviousPage,
  onNextPage,
  onTypeChange,
}) => {
  const form = useForm()

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
          <option value='update'>Atualização</option>
        </SelectInput>
      </Box>

      <Box
        h='100%'
        color='black'
        sx={{
          '.table-cell': {
            width: '25%',
            marginRight: '16px',
          },
          '.table-row': {
            display: 'flex',
            flexFlow: 'row wrap',
            marginBottom: '16px',
          },
        }}
      >
        <Box className='table-row' overflowY='scroll'>
          <Heading className='table-cell' size='sm'>
            Nome
          </Heading>
          <Heading className='table-cell' size='sm'>
            Operação
          </Heading>
          <Heading className='table-cell' size='sm'>
            Data
          </Heading>
        </Box>

        <Box h='60%' mb={4} overflowY='scroll'>
          {logs.results.map(log => (
            <Box key={log.id} className='table-row'>
              <Box className='table-cell'>
                <Text>{log.user.name}</Text>
              </Box>
              <Box className='table-cell'>
                <Text>{logLabelMap[log.type]}</Text>
              </Box>
              <Box className='table-cell'>
                <Text>{formatDate(log.createdAt)}</Text>
              </Box>
            </Box>
          ))}
        </Box>

        <Box>
          <HStack justifyContent='flex-end'>
            <IconButton
              disabled={!hasPrevious}
              icon={<MdChevronLeft />}
              aria-label='Anterior'
              onClick={onPreviousPage}
            />
            <IconButton
              disabled={!hasNext}
              icon={<MdChevronRight />}
              aria-label='Próximo'
              onClick={onNextPage}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}
