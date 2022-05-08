import { Flex, Heading, Text, Image } from '@chakra-ui/react'
import React from 'react'

import logoImage from 'assets/images/computacao-logo.png'

export const ComponentPlaceholder: React.FC = () => {
  return (
    <Flex w='full' alignItems='center' justifyContent='center'>
      <Flex
        maxW='640px'
        px={8}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Image mt={-16} mb={8} w='120px' src={logoImage} alt='Estudantes' />

        <Heading color='black' fontSize='6xl' textAlign='center'>
          Bem vindo!
        </Heading>
        <Text color='black' fontSize='2xl' textAlign='center'>
          Pesquise uma disciplina ao lado para saber mais sobre seu conteúdo
          programático.
        </Text>
      </Flex>
    </Flex>
  )
}
