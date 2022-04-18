import {
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface TextareaInputProps
  extends Omit<ChakraTextareaProps, 'name' | 'defaultValue'>,
    UseControllerProps<any> {
  label?: string
  placeholder?: string
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  rules,
  control,
  name,
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

      <ChakraTextarea
        {...field}
        id={name}
        placeholder={placeholder}
        size='lg'
        variant='filled'
        py={3}
        bgColor='gray.100'
        rows={6}
        {...props}
      />

      {invalid && <FormHelperText color='red'>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
