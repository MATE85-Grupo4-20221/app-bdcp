import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'

import { ComponentLog } from 'types'
import { formatDate } from 'utils/date'

export interface ComponentHistoricProps {
  logs: ComponentLog[]
}

const logLabelMap = {
  approval: 'Aprovação',
  creation: 'Criação',
  update: 'Atualização',
}

export const ComponentHistoric: React.FC<ComponentHistoricProps> = ({
  logs,
}) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Operação</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map(log => (
            <Tr key={log.id}>
              <Td>{log.user.name}</Td>
              <Td>{logLabelMap[log.type]}</Td>
              <Td>{formatDate(log.createdAt)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
