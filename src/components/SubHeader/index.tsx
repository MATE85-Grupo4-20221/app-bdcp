import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'

export interface SubHeaderProps {}

export const SubHeader: React.FC<SubHeaderProps> = () => {
  return (
    <HStack bgColor='#FCFCFC' px='8' py='12'>
      <Box flex={1}>
        <Heading>Disciplinas</Heading>
        <Text>Encontre o conteúdo programático das disciplinas.</Text>
      </Box>
      <Box>
        <Button colorScheme='primary'>Adicionar disciplina</Button>
      </Box>
    </HStack>
  )
}
