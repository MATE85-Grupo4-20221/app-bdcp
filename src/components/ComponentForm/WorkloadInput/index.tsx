import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Heading,
  Box,
  HStack,
  ButtonGroup,
  useEditable,
  IconButton,
} from '@chakra-ui/react'
import React from 'react'
import { useWatch } from 'react-hook-form'

import { Input } from 'components/Input'
import { NumberInput, NumberInputProps } from 'components/NumberInput'

import { WorkloadValues } from '../types'

export const WorkloadInput = (props: NumberInputProps) => {
  const { isEditing, onSubmit, onCancel, onEdit } = useEditable()

  const workload = useWatch({
    control: props.control,
    name: props.name,
  }) as WorkloadValues

  const workloadTotal =
    Number(workload.theory) +
    Number(workload.practice) +
    Number(workload.theoryPractice) +
    Number(workload.internship) +
    Number(workload.practiceInternship)

  return (
    <Box>
      <Heading pb={2} color='gray.700' fontSize='sm'>
        {props.label}
      </Heading>

      <HStack alignItems='flex-end'>
        {isEditing ? (
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
        ) : (
          <Input
            name={`${props.name}.total`}
            label='Total'
            value={`${workloadTotal} horas`}
            control={props.control}
            isDisabled
          />
        )}

        {isEditing ? (
          <ButtonGroup>
            <IconButton
              w='52px'
              h='52px'
              colorScheme='success'
              icon={<CheckIcon />}
              onClick={onSubmit}
              aria-label='Confirmar'
            />
            <IconButton
              w='52px'
              h='52px'
              colorScheme='red'
              icon={<CloseIcon />}
              onClick={onCancel}
              aria-label='Cancelar'
            />
          </ButtonGroup>
        ) : (
          <ButtonGroup justifyContent='center'>
            <IconButton
              w='52px'
              h='52px'
              colorScheme='yellow'
              icon={<EditIcon />}
              onClick={onEdit}
              aria-label='Editar'
            />
          </ButtonGroup>
        )}
      </HStack>
    </Box>
  )
}
