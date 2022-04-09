import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import React from 'react'
import { Controller, useController, UseControllerProps } from 'react-hook-form'

export interface InputProps extends UseControllerProps<any> {
  type?: React.HTMLInputTypeAttribute
  label?: string
  placeholder?: string
}

const InputController: React.FC<InputProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  rules,
  control,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
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
        <FormLabel _invalid={{ color: 'red' }} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        ref={ref}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        py={6}
        variant='filled'
        bgColor='gray.100'
        size='lg'
      />
      {invalid && <FormHelperText color='red'>{error?.message}</FormHelperText>}
    </FormControl>
  )
}

export const Input = (inputProps: InputProps) => {
  return (
    <Controller
      {...inputProps}
      render={props => <InputController {...inputProps} {...props} />}
    />
  )
}
