import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  useEditableControls,
  VStack,
  Flex,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export interface HourFormProps {
  studentHours: string
  professorHours: string
  moduleHours: string
}

export const HourForm: React.FC<HourFormProps> = ({
  studentHours,
  professorHours,
  moduleHours,
}) => {
  const [newStudentHours, setNewStudentHours] = useState('')
  const [newProfessorHours, setNewProfessorHours] = useState('')
  const [newModuleHours, setNewModuleHours] = useState('')

  const validaHora = /^\d{1,3}$/

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center'>
        <IconButton
          icon={<CheckIcon />}
          aria-label='Confirmar'
          bg='green.500'
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label='Cancelar'
          bg='#DB4343'
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <ButtonGroup justifyContent='center'>
        <IconButton
          icon={<EditIcon />}
          aria-label='Editar'
          bg='#FFD43A'
          {...getEditButtonProps()}
        />
      </ButtonGroup>
    )
  }

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
            Estudante
          </Heading>
          <Editable defaultValue={studentHours} isPreviewFocusable={false}>
            <HStack>
              <EditablePreview
                bg='#ECECEC'
                textColor='gray.700'
                px={3}
                py={2}
              />
              <Input
                as={EditableInput}
                name='code'
                variant='filled'
                onChange={e => {
                  setNewStudentHours(e.target.value)
                  if (validaHora.test(e.target.value))
                    console.log(e.target.value)
                }}
              />
              <EditableControls />
            </HStack>
          </Editable>
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
            Estudante
          </Heading>
          <Editable defaultValue={professorHours} isPreviewFocusable={false}>
            <HStack>
              <EditablePreview
                bg='#ECECEC'
                textColor='gray.700'
                px={3}
                py={2}
              />
              <Input
                as={EditableInput}
                name='code'
                variant='filled'
                onChange={e => setNewProfessorHours(e.target.value)}
              />
              <EditableControls />
            </HStack>
          </Editable>
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
            Estudante
          </Heading>
          <Editable defaultValue={moduleHours} isPreviewFocusable={false}>
            <HStack>
              <EditablePreview
                bg='#ECECEC'
                textColor='gray.700'
                px={3}
                py={2}
              />
              <Input
                as={EditableInput}
                name='code'
                variant='filled'
                onChange={e => setNewModuleHours(e.target.value)}
              />
              <EditableControls />
            </HStack>
          </Editable>
        </Box>
      </Stack>
    </VStack>
  )
}
