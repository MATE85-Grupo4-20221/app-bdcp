import { Box, Button, Flex, Heading, Text, } from '@chakra-ui/react'
import React from 'react'

export interface SubHeaderProps {}

const SubHeader: React.FC<SubHeaderProps> = () => {
  return (
    <Flex h={'13vh'} justifyContent={'space-between'} alignItems={'center'}>
      <Box>
        <Heading>Disciplinas</Heading>
        <Text>Encontre o conteúdo programático das disciplinas.</Text>
      </Box>
      <Box>
        <Button>Adicionar disciplina</Button>
      </Box>
    </Flex>
  )
}

export default SubHeader
