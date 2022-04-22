import {
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput as ChakraNumberInput,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputField as ChakraNumberInputField,
  NumberInputStepper as ChakraNumberInputStepper,
  NumberIncrementStepper as ChakraNumberIncrementStepper,
  NumberDecrementStepper as ChakraNumberDecrementStepper,
} from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface NumberInputProps
  extends Omit<ChakraNumberInputProps, 'name' | 'defaultValue'>,
    UseControllerProps<any> {
  label?: string
  placeholder?: string
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  rules,
  control,
  label,
  placeholder,
  ...props
}) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  })

  return (
    <FormControl isInvalid={invalid}>
      {label && (
        <FormLabel
          _invalid={{ color: 'red' }}
          htmlFor={name}
          color='gray.700'
          fontSize={14}
        >
          {label}
        </FormLabel>
      )}

      {/* <ChakraNumberInput
        {...field}
        id={name}
        placeholder={placeholder}
        size='lg'
        variant='filled'
        py={6}
        bgColor='gray.100'
        {...props}
      /> */}

      <ChakraNumberInput
        {...field}
        id={name}
        placeholder={placeholder}
        size='lg'
        variant='filled'
        bgColor='gray.100'
        {...props}
      >
        <ChakraNumberInputField py={6} />
        <ChakraNumberInputStepper>
          <ChakraNumberIncrementStepper />
          <ChakraNumberDecrementStepper />
        </ChakraNumberInputStepper>
      </ChakraNumberInput>

      {invalid && <FormHelperText color='red'>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
