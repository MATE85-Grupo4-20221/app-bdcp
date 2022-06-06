import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '../Input'
import { importComponentsSchema } from './schema'

export interface ImportComponentsModalFormValues {
  courseCode: string
  semester: string
}

export interface ImportComponentsModalFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ImportComponentsModalFormValues) => Promise<void>
}

export const ImportComponentsModalForm: React.FC<
  ImportComponentsModalFormProps
> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, formState } =
    useForm<ImportComponentsModalFormValues>({
      mode: 'onChange',
      resolver: yupResolver(importComponentsSchema),
    })

  const { isSubmitting } = formState

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Importar disciplinas</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={8}>
            <Input
              name='courseCode'
              label='Código do curso'
              placeholder='Ex: 112140'
              control={control}
            />

            <Input
              name='semester'
              label='Semestre vigente'
              placeholder='Ex: 20132'
              control={control}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            colorScheme='primary'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Importar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
