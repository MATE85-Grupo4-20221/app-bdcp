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
                dept='Matemática'
                curriculum='Alguma ementa'
                semester='2006.2'
                hours='102'
                program='Algum conteudo'
              />
            </TabPanel>

            <TabPanel p={0}>
              <Historic />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
}

const useDetails = () => useOutletContext<{ component?: Component }>()
