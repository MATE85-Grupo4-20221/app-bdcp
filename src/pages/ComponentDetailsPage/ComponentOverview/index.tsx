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
  isActive?: boolean
  department?: string
  semester?: string
  modality?: string
  program?: string
  objective?: string
  syllabus?: string
  methodology?: string
  learningAssessment?: string
  bibliography?: string
  prerequeriments?: string[]
  studentWorkload?: number
  teacherWorkload?: number
  moduleWorkload?: number
}

export const ComponentOverview: React.FC<ComponentOverviewProps> = ({
  isActive = false,
  department,
  semester,
  modality,
  program,
  objective,
  syllabus,
  methodology,
  learningAssessment,
  bibliography,
  prerequeriments,
  studentWorkload,
  teacherWorkload,
  moduleWorkload,
}) => {
  const direction = useBreakpointValue<StackDirection>({
    base: 'column',
    xl: 'row',
  })

  const spacing = useBreakpointValue({ base: 4, xl: 6 })

  return (
    <VStack
      pb={8}
      spacing={spacing}
      alignItems='stretch'
      overflowY='scroll'
      h='100%'
    >
      <Stack direction={direction} spacing={spacing} alignContent='stretch'>
        <DataCard
          label='Departamento'
          description={department}
          isActive={isActive}
        />
        <DataCard
          label='Semestre vigente'
          description={semester}
          isActive={isActive}
        />
      </Stack>

      <Stack direction={direction} spacing={spacing} alignContent='stretch'>
        <DataCard
          label='Carga horária do aluno'
          description={`${studentWorkload} horas`}
          isActive={isActive}
        />
        <DataCard
          label='Carga horária do professor'
          description={`${teacherWorkload} horas`}
          isActive={isActive}
        />
        <DataCard
          label='Carga horária do módulo'
          description={`${moduleWorkload} horas`}
          isActive={isActive}
        />
      </Stack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Pré-requisitos'
          description={prerequeriments?.join(' ')}
          isActive={isActive}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Modalidade'
          description={modality}
          isActive={isActive}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Ementa' description={program} isActive={isActive} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Objetivo'
          description={objective}
          isActive={isActive}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Conteúdo programático'
          description={syllabus}
          isActive={isActive}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Metodologia'
          description={methodology}
          isActive={isActive}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Avaliação de aprendizagem'
          description={learningAssessment}
          isActive={isActive}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Bibliografia'
          description={bibliography}
          isActive={isActive}
        />
      </HStack>
    </VStack>
  )
}
