import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export interface ComponentHistoricProps {}

export const ComponentHistoric: React.FC<ComponentHistoricProps> = () => {
  return (
    <VStack spacing={0} alignItems='stretch'>
      <HStack spacing={4} alignItems='flex-start'>
        <VStack pt={2} spacing={2}>
          <Box w={6} h={6} bgColor='primary.500' borderRadius={12} />

          <Divider
            minHeight={94}
            borderColor='gray.200'
            orientation='vertical'
            borderLeftWidth={4}
          />
        </VStack>

        <Box
          px={6}
          py={4}
          borderColor='gray.200'
          borderWidth={3}
          borderRadius={16}
        >
          <Text color='black' fontSize='lg'>
            <Heading as='span' color='black' fontSize='lg'>
              Elen Deise Assis Barbosa{' '}
            </Heading>
            aprovou alteração da disciplina.
          </Text>
          <Text color='gray.500' fontSize='sm' fontWeight='semibold'>
            21/03/2022 às 18:30
          </Text>
        </Box>
      </HStack>

      <HStack spacing={4} alignItems='flex-start'>
        <VStack pt={2}>
          <Box w={6} h={6} bgColor='primary.500' borderRadius={12} />

          <Divider
            minHeight={94}
            borderColor='gray.200'
            orientation='vertical'
            borderLeftWidth={4}
          />
        </VStack>

        <Box
          px={6}
          py={4}
          borderColor='gray.200'
          borderWidth={3}
          borderRadius={16}
        >
          <Text color='black' fontSize='lg'>
            <Heading as='span' color='black' fontSize='lg'>
              Elen Deise Assis Barbosa{' '}
            </Heading>
            aprovou alteração da disciplina.
          </Text>
          <Text color='gray.500' fontSize='sm' fontWeight='semibold'>
            21/03/2022 às 18:30
          </Text>
        </Box>
      </HStack>
    </VStack>
  )
}
