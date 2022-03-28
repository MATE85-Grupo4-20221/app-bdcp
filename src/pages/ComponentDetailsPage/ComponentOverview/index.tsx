import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'

import { DataCard } from 'components/DataCard'

export interface ComponentOverviewProps {
  dept: string
  hours: string
  semester: string
  curriculum: string
  program: string
}

export const ComponentOverview: React.FC<ComponentOverviewProps> = ({
  dept,
  hours,
  semester,
  curriculum,
  program,
}) => {
  return (
    <VStack spacing={8} alignItems='stretch'>
      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Departamento' description={dept} />
        <DataCard label='Carga horária' description={hours} />
        <DataCard label='Semestre vigente' description={semester} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Ementa' description={curriculum} />
      </HStack>

      <HStack spacing={8} alignContent='stretch'>
        <DataCard label='Conteúdo programático' description={program} />
      </HStack>
    </VStack>
  )
}
