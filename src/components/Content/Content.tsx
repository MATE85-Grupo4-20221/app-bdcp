import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export interface ContentProps {
  dept: string
  hours: string
  semester: string
  curriculum: string
  program: string
}

const Content = ({
  dept,
  hours,
  semester,
  curriculum,
  program,
}: ContentProps) => {
  return (
    <Box>
      <Flex direction='column'>
        <Flex>
          <Box border='solid #ECECEC' borderRadius='16px'>
            <Heading color='gray.700'>Departamento</Heading>
            <Text>{dept}</Text>
          </Box>
          <Box border='solid #ECECEC' borderRadius='16px'>
            <Heading color='gray.700'>Carga horária</Heading>
            <Text>{hours}</Text>
          </Box>
          <Box border='solid #ECECEC' borderRadius='16px'>
            <Heading color='gray.700'>Semestre Vigente</Heading>
            <Text>{semester}</Text>
          </Box>
        </Flex>
        <Box border='solid #ECECEC' borderRadius='16px'>
          <Heading color='gray.700'>Ementa</Heading>
          <Text>{curriculum}</Text>
        </Box>
        <Box border='solid #ECECEC' borderRadius='16px'>
          <Heading color='gray.700'>Conteúdo Programático</Heading>
          <Text>{program}</Text>
        </Box>
      </Flex>
    </Box>
  )
}
export default Content
