import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { ComponentLogData } from 'pages/ComponentDetailsPage/ComponentHistoric/types'
import React, { useMemo } from 'react'
import { Column, FilterProps, useTable } from 'react-table'

import { ComponentLog } from 'types'
import { formatDate } from 'utils/date'

import { ComponentLogTable } from './ComponentLogTable'

export interface ComponentHistoricProps {
  logs: ComponentLog[]
}

const logLabelMap = {
  approval: 'Aprovação',
  creation: 'Criação',
  update: 'Atualização',
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: FilterProps<ComponentLogData>) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export const ComponentHistoric: React.FC<ComponentHistoricProps> = ({
  logs,
}) => {
  const data = useMemo(() => {
    return logs.map<ComponentLogData>(log => ({
      username: log.user.name,
      type: log.type,
      createdAt: log.createdAt,
    }))
  }, [logs])

  const columns: Column<ComponentLogData>[] = [
    {
      Header: 'Nome',
      accessor: 'username',
    },
    {
      Header: 'Operação',
      accessor: 'type',
      Cell: ({ value }) => logLabelMap[value as ComponentLog['type']],
    },
    {
      Header: 'Data',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value),
    },
  ]

  return <ComponentLogTable columns={columns} data={data} />
}
