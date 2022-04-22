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
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ComponentForm } from 'components/ComponentForm'
import { ComponentFormValues } from 'components/ComponentForm/types'
import {
  getComponentFormDefaultValues,
  formatPrerequirements,
} from 'components/ComponentForm/utils'
import { AppError } from 'errors'
import { api } from 'services'
import { Component } from 'types'

export const ComponentEditPage: React.FC = () => {
  const toast = useToast()
  const { componentCode } = useParams()

  const [isLoadingComponent, setLoadingComponent] = useState(true)
  const [component, setComponent] = useState<Component>()

  const defaultValues = useMemo(
    () => getComponentFormDefaultValues(component),
    [component]
  )

  const getComponentByCode = async () => {
    const response = await api.get<Component>(`/components/${componentCode}`)

    setComponent(response.data)
  }

  const handleEdit = async (data: ComponentFormValues) => {
    if (!component) return

    try {
      // TODO: Handle when componentCode changes
      await api.put(`/components/${component.id}`, {
        code: data.code,
        name: data.name,
        department: data.department,
        semester: data.semester,
        modality: data.modality,
        program: data.program,
        objective: data.objective,
        syllabus: data.syllabus,
        methodology: data.methodology,
        learningAssessment: data.learningAssessment,
        bibliography: data.bibliography,
        prerequeriments: formatPrerequirements(data.prerequeriments),
        workload: {
          studentTheory: data.studentWorkload.theory,
          studentPractice: data.studentWorkload.practice,
          studentTheoryPractice: data.studentWorkload.theoryPractice,
          studentInternship: data.studentWorkload.internship,
          studentPracticeInternship: data.studentWorkload.practiceInternship,

          teacherTheory: data.teacherWorkload.theory,
          teacherPractice: data.teacherWorkload.practice,
          teacherTheoryPractice: data.teacherWorkload.theoryPractice,
          teacherInternship: data.teacherWorkload.internship,
          teacherPracticeInternship: data.teacherWorkload.practiceInternship,

          moduleTheory: data.moduleWorkload.theory,
          modulePractice: data.moduleWorkload.practice,
          moduleTheoryPractice: data.moduleWorkload.theoryPractice,
          moduleInternship: data.moduleWorkload.internship,
          modulePracticeInternship: data.moduleWorkload.practiceInternship,
        },
      })

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

  if (!component) {
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

      <ComponentForm defaultValues={defaultValues} onSubmit={handleEdit} />
    </Container>
  )
}
