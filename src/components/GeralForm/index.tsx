import {
  Box,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export interface GeralFormProps {
  code: string
  name: string
  department: string
  semester: string
  kind: string
}

const validCode = /^[a-zA-Z]{4}\d{2}/
const validSemester = /^\d{4}\.[12]/

export const GeralForm: React.FC<GeralFormProps> = ({
  code,
  name,
  department,
  semester,
  kind,
}) => {
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newDepartment, setNewDepartment] = useState('')
  const [newSemester, setNewSemester] = useState('')
  const [newKind, setNewKind] = useState('')

  return (
    <VStack>
      <Stack direction={'row'} alignContent='stretch'>
        <Box
          px={6}
          py={4}
          flex={1}
          borderColor=''
          borderWidth={0}
          borderRadius={16}
        >
          <Heading color='gray.700' fontSize='sm'>
            Código
          </Heading>
          <Input
            name='code'
            variant='filled'
            placeholder={code}
            onChange={e => {
              if (validCode.test(e.target.value)) {
                setNewCode(e.target.value)
              }
            }}
          />
        </Box>
        <Box
          px={6}
          py={4}
          flex={1}
          borderColor=''
          borderWidth={0}
          borderRadius={16}
        >
          <Heading color='gray.700' fontSize='sm'>
            Nome
          </Heading>
          <Input
            name='name'
            variant='filled'
            placeholder={name}
            onChange={e => setNewName(e.target.value)}
          />
        </Box>
        <Box
          px={6}
          py={4}
          flex={1}
          borderColor=''
          borderWidth={0}
          borderRadius={16}
        >
          <Heading color='gray.700' fontSize='sm'>
            Departamento
          </Heading>
          <Input
            name='department'
            variant='filled'
            placeholder={department}
            onChange={e => setNewDepartment(e.target.value)}
          />
        </Box>
        <Box
          px={6}
          py={4}
          flex={1}
          borderColor=''
          borderWidth={0}
          borderRadius={16}
        >
          <Heading color='gray.700' fontSize='sm'>
            Semestre Vigente
          </Heading>
          <Input
            name='semester'
            variant='filled'
            placeholder={semester}
            onChange={e => {
              if (validSemester.test(e.target.value)) {
                setNewSemester(e.target.value)
              }
            }}
          />
        </Box>
        <Box
          px={6}
          py={4}
          flex={1}
          borderColor=''
          borderWidth={0}
          borderRadius={16}
        >
          <Heading color='gray.700' fontSize='sm'>
            Modalidade
          </Heading>
          <Input
            name='kind'
            variant='filled'
            placeholder={kind}
            onChange={e => setNewKind(e.target.value)}
          />
        </Box>
      </Stack>
    </VStack>
  )
}
