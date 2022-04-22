import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  Text,
  Box,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ComponentForm } from 'components/ComponentForm'
import { ComponentFormValues } from 'components/ComponentForm/types'
import { formatPrerequirements } from 'components/ComponentForm/utils'
import { AppError } from 'errors'
import { api } from 'services'

export const ComponentAddPage: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const handleAdd = async (data: ComponentFormValues) => {
    try {
      await api.post('components', {
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
        description: 'Disciplina criada com sucesso!',
        status: 'success',
      })

      navigate(`/disciplinas/${data.code}/editar`, { replace: true })
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })
    }
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
      </Breadcrumb>

      <Box py={8}>
        <Heading color='black'>Adicionar disciplina</Heading>
        <Text color='black'>Crie uma nova disciplina.</Text>
      </Box>

      <ComponentForm onSubmit={handleAdd} />
    </Container>
  )
}
