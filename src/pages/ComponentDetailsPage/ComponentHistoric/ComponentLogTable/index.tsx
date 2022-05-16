import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

import {
  Box,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Column, useTable, useFilters, usePagination } from 'react-table'

import { ComponentLogData } from '../types'
import { SelectInput } from 'components/SelectInput'
import { useForm } from 'react-hook-form'

interface ComponentLogFilterFormValues {
  type: string
}

export interface ComponentLogTableProps {
  columns: Column<ComponentLogData>[]
  data: ComponentLogData[]
}

export const ComponentLogTable: React.FC<ComponentLogTableProps> = ({
  columns,
  data,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    pageOptions,
    pageCount,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    rows,
    prepareRow,
    state,
    page,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      pageCount: 2,
      initialState: { pageIndex: 0, pageSize: 1 },
    },
    useFilters,
    usePagination
  )

  const { control, watch } = useForm<ComponentLogFilterFormValues>()

  useEffect(() => {
    const { type } = watch()

    setFilter('type', type)
  }, [watch().type])

  console.log(pageCount, pageOptions, page)

  return (
    <Box>
      <Box w='fit-content' mb={6}>
        <SelectInput name='type' label='Tipo de Operação' control={control}>
          <option></option>
          <option value='approval'>Aprovação</option>
          <option value='creation'>Criação</option>
          <option value='update'>Atualização</option>
        </SelectInput>
      </Box>

      <TableContainer>
        <Table {...getTableProps()} variant='simple'>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup.getHeaderGroupProps().key}
              >
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps()}
                    key={column.getHeaderProps().key}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} key={row.getRowProps().key}>
                  {row.cells.map(cell => (
                    <Td {...cell.getCellProps()} key={cell.getCellProps().key}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={3} textAlign='right'>
                <HStack justifyContent='flex-end'>
                  <IconButton
                    aria-label='Anterior'
                    icon={<ArrowBackIcon />}
                    disabled={!canPreviousPage}
                    onClick={previousPage}
                  />
                  <IconButton
                    aria-label='Próximo'
                    icon={<ArrowForwardIcon />}
                    disabled={!canNextPage}
                    onClick={nextPage}
                  />
                </HStack>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}
