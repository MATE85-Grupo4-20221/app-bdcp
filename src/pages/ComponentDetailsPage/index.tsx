import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  TabList,
  Tab as ChakraTab,
  TabPanels,
  TabPanel,
  Tabs,
  Text,
  VStack,
  Stack,
  StackDirection,
  useBreakpointValue,
  Switch,
  useBoolean,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { saveAs } from 'file-saver'

import { useAuth } from 'contexts/auth'
import { useComponentAttrs } from 'hooks/useComponent'
import { Component } from 'types'
import { api } from 'services'
import {
  getStudentWorkload,
  getTeacherWorkload,
  getModuleWorkload,
} from 'utils/component'

import { ComponentOverview as Overview } from './ComponentOverview'
import { ComponentHistoric as Historic } from './ComponentHistoric'
import {
  ApproveModalForm,
  ApproveModalFormValues,
} from 'components/ApproveModalForm'
import { AppError } from 'errors'
import { useDispatch } from 'store'
import { componentChanged } from 'store/components'

const Tab: React.FC = ({ children }) => {
  return (
    <ChakraTab
      color='gray.500'
      _selected={{
        color: 'secondary.700',
        bgColor: 'secondary.500',
      }}
    >
      {children}
    </ChakraTab>
  )
}

export const ComponentDetailsPage: React.FC = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const { component, refreshComponent } = useDetails()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoading, setLoading] = useState(false)
  const [publishedVersion, setPublishedVersion] = useBoolean()

  const direction = useBreakpointValue<StackDirection>({
    base: 'column',
    md: 'row',
  })
  const isMd = useBreakpointValue({ base: true, lg: false })

  const {
    code,
    name,
    department,
    semester,
    modality,
    program,
    objective,
    syllabus,
    methodology,
    learningAssessment,
    bibliography,
    prerequeriments,
    workload,
  } = useComponentAttrs(component, publishedVersion)

  const studentWorkload = getStudentWorkload(workload)
  const teacherWorkload = getTeacherWorkload(workload)
  const moduleWorkload = getModuleWorkload(workload)

  if (!component) return null

  const handlePublish = async (data: ApproveModalFormValues) => {
    try {
      await api.post(`/component-drafts/${component.draft?.id}/approve`, {
        agreementDate: data.agreementDate.toISOString(),
        agreementNumber: data.agreementNumber,
      })

      toast({
        description: 'Disciplina publicada com sucesso!',
        status: 'success',
      })

      refreshComponent?.()

      onClose()
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const exportFile = async () => {
    try {
      setLoading(true)
      const response = await api.get<Buffer>(
        `/components/export/${component.id}`,
        {
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/pdf',
          },
        }
      )
      saveAs(
        new Blob([response.data], { type: 'application/pdf;charset=utf-8' }),
        'componente-curricular.pdf'
      )
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <VStack w='100%' h='100%' spacing={0} alignItems='stretch'>
      <Box hidden={!isMd} pt={4} px={8}>
        <ArrowBackIcon
          cursor='pointer'
          fontSize='2xl'
          onClick={() => navigate('/disciplinas')}
        />
      </Box>

      <Stack
        py={8}
        px={8}
        pb={4}
        direction={direction}
        spacing={6}
        alignItems={{ base: 'flex-start', md: 'center' }}
      >
        <Box flex={1}>
          <Heading color='black'>{code}</Heading>
          <Text color='black' fontSize='xl' fontWeight='medium'>
            {name}
          </Text>
        </Box>

        <VStack
          hidden={!auth.isAuthenticated}
          alignItems='flex-end'
          spacing={2}
        >
          <HStack>
            <Link to={`/disciplinas/${component.code.toLowerCase()}/editar`}>
              <Button colorScheme='yellow'>Editar</Button>
            </Link>
            <Button
              isLoading={isLoading}
              onClick={exportFile}
              colorScheme='red'
            >
              Exportar
            </Button>
            <Button onClick={onOpen} colorScheme='primary'>
              Publicar
            </Button>
          </HStack>

          <HStack>
            <Text>Visualizar versão publicada</Text>
            <Switch onChange={setPublishedVersion.toggle} />
          </HStack>
        </VStack>
      </Stack>

      <Tabs
        as={VStack}
        pt={4}
        flex={1}
        variant='soft-rounded'
        colorScheme='primary'
        spacing={4}
        display='flex'
        alignItems='stretch'
        overflow='hidden'
      >
        <TabList px={8}>
          <Tab>Visão Geral</Tab>
          {auth.isAuthenticated && <Tab>Histórico</Tab>}
        </TabList>

        <TabPanels h='100%' pb={8} overflowY='scroll'>
          <TabPanel h='100%' px={8}>
            <Overview
              department={department}
              semester={semester}
              modality={modality}
              program={program}
              objective={objective}
              syllabus={syllabus}
              methodology={methodology}
              learningAssessment={learningAssessment}
              bibliography={bibliography}
              prerequeriments={prerequeriments.split(',')}
              studentWorkload={studentWorkload}
              teacherWorkload={teacherWorkload}
              moduleWorkload={moduleWorkload}
            />
          </TabPanel>

          <TabPanel h='100%' px={8}>
            {!!component.logs && <Historic logs={component.logs} />}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ApproveModalForm
        open={isOpen}
        onClose={onClose}
        onSubmit={handlePublish}
      />
    </VStack>
  )
}

const useDetails = () =>
  useOutletContext<{
    component?: Component
    refreshComponent?: () => Promise<void>
  }>()
