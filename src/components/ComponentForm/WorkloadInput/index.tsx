import { Heading, Box, HStack } from '@chakra-ui/react'
import React from 'react'

import { NumberInput, NumberInputProps } from 'components/NumberInput'

export const WorkloadInput = (props: NumberInputProps) => {
  return (
    <Box>
      <Heading pb={2} color='gray.700' fontSize='sm'>
        {props.label}
      </Heading>

      <HStack alignItems='flex-end'>
        <HStack>
          <NumberInput
            {...props}
            name={`${props.name}.theory`}
            label='Teórica'
          />
          <NumberInput
            {...props}
            name={`${props.name}.practice`}
            label='Prática'
          />
          <NumberInput
            {...props}
            name={`${props.name}.theoryPractice`}
            label='Teórica/Prática'
          />
          <NumberInput
            {...props}
            name={`${props.name}.internship`}
            label='Estágio'
          />
          <NumberInput
            {...props}
            name={`${props.name}.practiceInternship`}
            label='Prática/Estágio'
          />
        </HStack>
      </HStack>
    </Box>
  )
}
