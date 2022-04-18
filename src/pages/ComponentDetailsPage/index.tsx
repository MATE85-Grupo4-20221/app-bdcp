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
} from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

import { useAuth } from 'contexts/auth'
import { Component } from 'types'
import { getStudentWorkload } from 'utils/component'
import { ComponentOverview as Overview } from './ComponentOverview'
import { ComponentHistoric as Historic } from './ComponentHistoric'

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
  const navigate = useNavigate()
  const { component } = useDetails()

  const direction = useBreakpointValue<StackDirection>({
    base: 'column',
    md: 'row',
  })
  const isMd = useBreakpointValue({ base: true, lg: false })

  if (!component) return null

  const studentWorkload = getStudentWorkload(component.workload)

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
          <Heading color='black'>{component.code}</Heading>
          <Text color='black' fontSize='xl' fontWeight='medium'>
            {component.name}
          </Text>
        </Box>

        <HStack hidden={!auth.isAuthenticated}>
          <Link to={`/disciplinas/${component.code}/editar`}>
            <Button colorScheme='yellow'>Editar</Button>
          </Link>
          <Button colorScheme='red'>Exportar</Button>
        </HStack>
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
          <Tab>Histórico</Tab>
        </TabList>

        <TabPanels h='100%' pb={8} overflowY='scroll'>
          <TabPanel h='100%' px={8}>
            <Overview
              department={component.department}
              studentWorkload={studentWorkload}
              semester={component.semester}
              program={component.program}
              syllabus={component.syllabus}
            />
          </TabPanel>

          <TabPanel h='100%' px={8}>
            {!!component.logs && <Historic logs={component.logs} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

const useDetails = () => useOutletContext<{ component?: Component }>()
