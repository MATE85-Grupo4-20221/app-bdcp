import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export interface DataCardProps {
  label: string
  description?: string
  isActive?: boolean
}

export const DataCard: React.FC<DataCardProps> = ({
  label,
  description,
  isActive = false,
}) => {
  return (
    <Box
      px={6}
      py={4}
      flex={1}
      borderColor={isActive ? 'primary.100' : 'gray.200'}
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
