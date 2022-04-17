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
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export interface TextFormProps {
  name: string
  content: string
}

export const TextForm: React.FC<TextFormProps> = ({ name, content }) => {
  const [newName, setNewName] = useState('')
  const [newContent, setNewContent] = useState('')

  return (
    <VStack>
      <Box
        px={6}
        py={4}
        flex={1}
        borderColor=''
        borderWidth={0}
        borderRadius={16}
      >
        <Heading color='gray.700' fontSize='sm'>
          {name}
        </Heading>
        <Textarea placeholder={content} />
      </Box>
    </VStack>
  )
}
