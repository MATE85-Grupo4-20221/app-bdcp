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

import { Input } from 'components/Input'
import { approveSchema } from './schema'

export interface ApproveModalFormValues {
  agreementDate: Date
  agreementNumber: string
}

export interface ApproveModalFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ApproveModalFormValues) => Promise<void>
}

export const ApproveModalForm: React.FC<ApproveModalFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { control, handleSubmit, formState } = useForm<ApproveModalFormValues>({
    mode: 'onChange',
    resolver: yupResolver(approveSchema),
  })

  const { isSubmitting } = formState

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Publicar disciplina</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={8}>
            <Input
              name='agreementDate'
              label='Data da ATA'
              type='datetime-local'
              control={control}
            />

            <Input
              name='agreementNumber'
              label='Número da ATA'
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
            Publicar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
