import {
  Button,
  Heading,
  VStack,
  Text,
  useToast,
  Flex,
  HStack,
  Box,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'
import { ComponentWorkload } from 'types'
import { EditForm } from 'components/EditForm'

interface EditFormValues {
  code: string
  name: string
  department: string
  semester: string
  kind: string
}

export interface ComponentEditPageProps {
  code: string
  name: string
  // department: string
  // semester: string
  // kind: string
  // workload: ComponentWorkload
  // program: string
  // syllabus: string
}

const EditSchema = Yup.object().shape({
  code: Yup.string(),
  name: Yup.string(),
  department: Yup.string(),
  semester: Yup.string(),
  kind: Yup.string(),
})

export const ComponentEditPage: React.FC<ComponentEditPageProps> = ({
  code,
  name,
}) => {
  return (
    <HStack flex={1} alignItems='stretch' overflow='hidden' spacing={0}>
      <Box py={8} px={8} pb={4}>
        <Heading>Editar disciplina - {code}</Heading>
        <Text>Altere o conteúdo da disciplina.</Text>
      </Box>
      <Box>
        <EditForm />
      </Box>
    </HStack>
  )
}
