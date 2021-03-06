import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface InputProps
  extends Omit<ChakraInputProps, 'name' | 'defaultValue'>,
    UseControllerProps<any> {
  type?: React.HTMLInputTypeAttribute
  label?: string
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({
  name,
  rules,
  control,
  type = 'text',
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

      <ChakraInput
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        size='lg'
        variant='filled'
        py={6}
        bgColor='gray.100'
        {...props}
      />

      {invalid && <FormHelperText color='red'>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
