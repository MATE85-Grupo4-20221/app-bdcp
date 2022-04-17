import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export interface PreFormProps {
  code: string
  number: string
  buttonType: string
}

const validCode = /^[a-zA-Z]{4}\d{2}$/
const validNumber = /^\d{0,4}$/

export const PreForm: React.FC<PreFormProps> = ({
  code,
  number,
  buttonType,
}) => {
  const [newCode, setNewCode] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newButtonType, setNewButtonType] = useState('')

  return (
    <VStack>
      <HStack>
        <Stack>
          <Heading color='gray.700' fontSize='sm'>
            Número do curso
          </Heading>
          <Input variant='filled' />
        </Stack>
        <Stack>
          <Heading color='gray.700' fontSize='sm'>
            Código do curso
          </Heading>
          <HStack>
            <Input variant='filled' />
            {buttonType === 'del' ? (
              <IconButton
                icon={<CloseIcon />}
                aria-label='Delete'
                bg='#DB4343'
                color='white'
              />
            ) : (
              <IconButton
                icon={<AddIcon />}
                aria-label='Adicionar Pré-Requisito'
                bg='#3A7DFF'
                color='white'
              />
            )}
          </HStack>
        </Stack>
      </HStack>
    </VStack>
  )
}
