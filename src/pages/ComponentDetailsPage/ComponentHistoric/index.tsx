import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import { ComponentLog } from 'types'
import { formatDate } from 'utils/date'

export interface ComponentHistoricProps {
  logs: ComponentLog[]
}

const logLabelMap = {
  approval: 'aprovou alteração desta disciplina.',
  creation: 'criou esta disciplina.',
  update: 'alterou o conteúdo desta disciplina.',
}

export const ComponentHistoric: React.FC<ComponentHistoricProps> = ({
  logs,
}) => {
  return (
    <VStack pb={4} spacing={0} alignItems='stretch'>
      {logs.map(log => (
        <HStack key={log.id} spacing={4} alignItems='flex-start'>
          <VStack pt={2} spacing={2}>
            <Box w={6} h={6} bgColor='primary.500' borderRadius={12} />

            <Divider
              minHeight={94}
              borderColor='gray.200'
              orientation='vertical'
              borderLeftWidth={4}
            />
          </VStack>

          <Box
            px={6}
            py={4}
            borderColor='gray.200'
            borderWidth={3}
            borderRadius={16}
          >
            <Text color='black' fontSize='lg'>
              <Heading as='span' color='black' fontSize='lg'>
                {log.updatedBy}{' '}
              </Heading>
              {logLabelMap[log.type]}
            </Text>
            <Text color='gray.500' fontSize='sm' fontWeight='semibold'>
              {formatDate(log.createdAt)}
            </Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  )
}
