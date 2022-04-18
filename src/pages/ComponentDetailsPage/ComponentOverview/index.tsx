import {
  HStack,
  Stack,
  StackDirection,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

import { DataCard } from 'components/DataCard'

export interface ComponentOverviewProps {
  department?: string
  studentWorkload: number
  semester?: string
  program?: string
  syllabus?: string
}

export const ComponentOverview: React.FC<ComponentOverviewProps> = ({
  department,
  studentWorkload,
  semester,
  program,
  syllabus,
}) => {
  const direction = useBreakpointValue<StackDirection>({
    base: 'column',
    xl: 'row',
  })

  const spacing = useBreakpointValue({ base: 4, xl: 6 })

  return (
    <VStack pb={8} spacing={spacing} alignItems='stretch'>
      <Stack direction={direction} spacing={spacing} alignContent='stretch'>
        <DataCard label='Departamento' description={department} />
        <DataCard
          label='Carga horária do aluno'
          description={`${studentWorkload} horas`}
        />
        <DataCard label='Semestre vigente' description={semester} />
      </Stack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Ementa' description={program} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Conteúdo programático' description={syllabus} />
      </HStack>
    </VStack>
  )
}
