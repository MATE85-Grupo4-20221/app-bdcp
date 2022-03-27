import { ViewIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export interface ClassCardProps {
  active: boolean
  code: string
  name: string
}

export const ClassCard: React.FC<ClassCardProps> = ({ active, code, name }) => {
  return (
    <Flex
      px='6'
      py='6'
      align='center'
      borderWidth={3}
      rounded='md'
      aria-current={active ? 'page' : 'false'}
      _hover={{ borderColor: 'primary.500' }}
      _activeLink={{
        borderColor: 'primary.500',
        boxShadow: '0 4px 20px 0 rgba(58, 125, 255, 0.3)',
      }}
    >
      <Box flex={1}>
        <Heading size='lg' color='primary.300' fontSize='2xl' lineHeight={1}>
          {code}
        </Heading>

        <Text color='black' fontWeight='medium'>
          {name}
        </Text>
      </Box>

      <Box color='black' fontWeight='bold'>
        <ViewIcon w='7' h='7' />
      </Box>
    </Flex>
  )
}
