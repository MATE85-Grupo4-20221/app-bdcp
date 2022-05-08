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
    <VStack pb={8} spacing={spacing} alignItems='stretch'>
      <Stack direction={direction} spacing={spacing} alignContent='stretch'>
        <DataCard label='Departamento' description={department} />
        <DataCard label='Semestre vigente' description={semester} />
      </Stack>

      <Stack direction={direction} spacing={spacing} alignContent='stretch'>
        <DataCard
          label='Carga horária do aluno'
          description={`${studentWorkload} horas`}
        />
        <DataCard
          label='Carga horária do professor'
          description={`${teacherWorkload} horas`}
        />
        <DataCard
          label='Carga horária do módulo'
          description={`${moduleWorkload} horas`}
        />
      </Stack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Pré-requisitos'
          description={prerequeriments?.join(' ')}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Modalidade' description={modality} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Ementa' description={program} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Objetivo' description={objective} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Conteúdo programático' description={syllabus} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Metodologia' description={methodology} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard
          label='Avaliação de aprendizagem'
          description={learningAssessment}
        />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Bibliografia' description={bibliography} />
      </HStack>
    </VStack>
  )
}
