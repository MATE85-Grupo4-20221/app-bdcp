import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export interface DataCardProps {
  label: string
  description: string
}

export const DataCard: React.FC<DataCardProps> = ({ label, description }) => {
  return (
    <Box
      px={6}
      py={4}
      flex={1}
      borderColor='gray.200'
      borderWidth={3}
      borderRadius={16}
    >
      <Heading color='gray.500' fontSize='sm'>
        {label}
      </Heading>
      <Text color='black' fontSize='lg'>
        {description}
      </Text>
    </Box>
  )
}
