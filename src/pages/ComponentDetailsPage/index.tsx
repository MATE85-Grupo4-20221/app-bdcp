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
} from '@chakra-ui/react'
import React from 'react'
import { useOutletContext } from 'react-router-dom'

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
  const { component } = useDetails()

  if (!component) return null

  const studentWorkload = getStudentWorkload(component.workload)

  return (
    <Box>
      <VStack px={8} spacing={8} alignItems='stretch'>
        <HStack alignItems='center'>
          <Box flex={1}>
            <Heading color='black'>{component.code}</Heading>
            <Text color='black' fontSize='xl' fontWeight='medium'>
              {component.name}
            </Text>
          </Box>

          <HStack>
            <Button colorScheme='yellow'>Editar</Button>
            <Button colorScheme='red'>Exportar</Button>
          </HStack>
        </HStack>

        <Tabs
          as={VStack}
          variant='soft-rounded'
          colorScheme='primary'
          spacing={8}
        >
          <TabList>
            <Tab>Visão Geral</Tab>
            <Tab>Histórico</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <Overview
                department={component.department}
                studentWorkload={studentWorkload}
                semester={component.semester}
                program={component.program}
                syllabus={component.syllabus}
              />
            </TabPanel>

            <TabPanel p={0}>
              <Historic logs={component.logs} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
}

const useDetails = () => useOutletContext<{ component?: Component }>()
