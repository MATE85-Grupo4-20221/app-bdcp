import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export interface DetailsProps {
  name: string
  code: string
}

const Details = ({ name, code }: DetailsProps) => {
  return (
    <Flex>
      <Flex justify={'space-around'} alignItems={'center'}>
        <Box p={'20px'}>
          <Heading>{code}</Heading>
          <Text>{name}</Text>
        </Box>
        <Box>
          <Button bg='#FFD43A' color='white' borderRadius='16px'>
            Editar
          </Button>
          <Button bg='#DB4343' color='white' borderRadius='16px'>
            Exportar
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Button bg='gray.100' color='gray.500' borderRadius='32px'>
          Visão Geral
        </Button>
        <Button bg='gray.100' color='gray.500' borderRadius='32px'>
          Histórico
        </Button>
      </Flex>
    </Flex>
  )
}
export default Details
