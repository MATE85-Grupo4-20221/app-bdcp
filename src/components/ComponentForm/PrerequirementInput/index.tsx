import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { VStack, HStack, ButtonGroup, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFieldArray } from 'react-hook-form'

import { Input, InputProps } from 'components/Input'
import { NumberInput } from 'components/NumberInput'

export const PrerequirementInput = (props: InputProps) => {
  const [courseNum, setCourseNum] = useState('')
  const [courseCode, setCourseCode] = useState('')

  const { fields, append, remove } = useFieldArray({
    name: props.name,
    control: props.control,
  })

  const handleAppend = () => {
    append({ courseNum, courseCode })

    setCourseNum('')
    setCourseCode('')
  }

  return (
    <VStack alignItems='flex-start'>
      <HStack maxW='500px' alignItems='flex-end'>
        <NumberInput
          name='courseNum'
          label='Núm. do curso'
          value={courseNum}
          onChange={value => setCourseNum(value)}
          control={props.control}
          min={0}
        />

        <Input
          name='courseCode'
          label='Cód. do curso'
          value={courseCode}
          onChange={e => setCourseCode(e.target.value)}
          control={props.control}
        />

        <ButtonGroup justifyContent='center'>
          <IconButton
            w='52px'
            h='52px'
            colorScheme='primary'
            icon={<AddIcon />}
            onClick={handleAppend}
            aria-label='Cancelar'
            isDisabled={!courseNum || !courseCode}
          />
        </ButtonGroup>
      </HStack>

      {fields.map((field, index) => (
        <HStack key={field.id} maxW='500px' alignItems='flex-end'>
          <NumberInput
            name={`${props.name}[${index}].courseNum`}
            control={props.control}
            min={0}
            isDisabled
          />

          <Input
            name={`${props.name}[${index}].courseCode`}
            control={props.control}
            isDisabled
          />

          <ButtonGroup justifyContent='center'>
            <IconButton
              w='52px'
              h='52px'
              colorScheme='red'
              icon={<CloseIcon />}
              onClick={() => remove(index)}
              aria-label='Cancelar'
            />
          </ButtonGroup>
        </HStack>
      ))}
    </VStack>
  )
}
