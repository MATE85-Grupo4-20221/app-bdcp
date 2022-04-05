import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'

import { DataCard } from 'components/DataCard'

export interface ComponentOverviewProps {
  department: string
  studentWorkload: number
  semester: string
  program: string
  syllabus: string
}

export const ComponentOverview: React.FC<ComponentOverviewProps> = ({
  department,
  studentWorkload,
  semester,
  program,
  syllabus,
}) => {
  return (
    <VStack pb={8} spacing={8} alignItems='stretch'>
      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Departamento' description={department} />
        <DataCard
          label='Carga horária do aluno'
          description={`${studentWorkload} horas`}
        />
        <DataCard label='Semestre vigente' description={semester} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Ementa' description={program} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Conteúdo programático' description={syllabus} />
      </HStack>
    </VStack>
  )
}
