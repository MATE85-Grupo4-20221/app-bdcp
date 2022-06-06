import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  Text,
  Box,
  Flex,
  CircularProgress,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import api from 'api'
import {
  ApproveModalForm,
  ApproveModalFormValues,
} from 'components/ApproveModalForm'
import { ComponentForm } from 'components/ComponentForm'
import { ComponentFormValues } from 'components/ComponentForm/types'
import { getComponentFormDefaultValues } from 'components/ComponentForm/utils'
import { AppError } from 'errors'
import { ComponentDraft } from 'types'

import { formValuesToComponentDraft } from './utils'

export const ComponentEditPage: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { componentCode } = useParams()

  const [isLoadingComponent, setLoadingComponent] = useState(true)
  const [componentDraft, setComponentDraft] = useState<ComponentDraft>()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const defaultValues = useMemo(
    () => getComponentFormDefaultValues(componentDraft),
    [componentDraft]
  )

  const getComponentByCode = async () => {
    if (!componentCode) return

    const componentDraft = await api.componentDraft.getComponentDraftByCode(
      componentCode
    )

    setComponentDraft(componentDraft)
  }

  const handleEdit = async (data: ComponentFormValues) => {
    if (!componentDraft) return

    try {
      // TODO: Handle when componentCode changes
      await api.componentDraft.putComponentDraft(
        componentDraft?.id!,
        formValuesToComponentDraft(data)
      )

      toast({
        description: 'Disciplina salva com sucesso!',
        status: 'success',
      })
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })

      throw err
    }
  }

  const handleEditAndNavigate = async (data: ComponentFormValues) => {
    await handleEdit(data).then(() => navigate(`/disciplinas/${componentCode}`))
  }

  const handleEditAndOpenModal = async (data: ComponentFormValues) => {
    await handleEdit(data).then(onOpen)
  }

  const handlePublish = async (data: ApproveModalFormValues) => {
    try {
      await api.componentDraft.approveComponentDraft(componentDraft?.id!, {
        agreementDate: data.agreementDate,
        agreementNumber: data.agreementNumber,
      })

      toast({
        description: 'Disciplina publicada com sucesso!',
        status: 'success',
      })

      onClose()

      navigate(`/disciplinas/${componentCode}`)
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  useEffect(() => {
    getComponentByCode().finally(() => setLoadingComponent(false))
  }, [])

  if (isLoadingComponent) {
    return (
      <Flex w='full' h='full' alignItems='center' justifyContent='center'>
        <CircularProgress color='primary.500' isIndeterminate />
      </Flex>
    )
  }

  if (!componentDraft) {
    return null
  }

  return (
    <Container maxW='container.xl'>
      <Breadcrumb
        pt={8}
        color='gray.700'
        fontWeight='medium'
        fontSize='sm'
        separator={<ChevronRightIcon color='gray.700' />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/disciplinas'>
            Disciplinas
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/disciplinas/${componentCode}`}>
            {componentCode?.toUpperCase()}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box py={8}>
        <Heading color='black'>
          Editar disciplina - {componentCode?.toUpperCase()}
        </Heading>
        <Text color='black'>Altere o conteúdo da disciplina.</Text>
      </Box>

      <ComponentForm
        defaultValues={defaultValues}
        onCancel={() => navigate(`/disciplinas/${componentCode}`)}
        onSubmit={handleEditAndNavigate}
        onSubmitAndPublish={handleEditAndOpenModal}
      />

      <ApproveModalForm
        open={isOpen}
        onClose={onClose}
        onSubmit={handlePublish}
      />
    </Container>
  )
}
