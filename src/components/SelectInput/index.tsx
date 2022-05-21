import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface SelectInputProps
  extends Omit<ChakraSelectProps, 'name' | 'defaultValue'>,
    UseControllerProps<any> {
  label?: string
  placeholder?: string
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  rules,
  control,
  label,
  placeholder,
  children,
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

      <ChakraSelect
        {...field}
        id={name}
        placeholder={placeholder}
        size='lg'
        variant='filled'
        bgColor='gray.100'
        {...props}
      >
        {children}
      </ChakraSelect>

      {invalid && <FormHelperText color='red'>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
