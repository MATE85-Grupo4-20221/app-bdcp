import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  List,
  VStack,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { Search } from 'components/Search'
import { SubHeader } from 'components/SubHeader'
import { api } from 'services'
import { Component, ListData } from 'types'

import { ComponentListItem } from './ComponentListItem'

export interface ComponentListPageProps {}

export const ComponentListPage: React.FC<ComponentListPageProps> = () => {
  const { componentCode } = useParams()

  const [isLoadingComponents, setLoadingComponents] = useState(true)
  const [components, setComponents] = useState<Component[]>([])

  const [searchText, setSearchText] = useState(
    componentCode?.toUpperCase() || ''
  )
  const [selectedComponent, setSelectedComponent] = useState<Component>()

  const getComponents = async () => {
    const response = await api.get<ListData<Component>>(`/components`, {
      params: {
        filter: searchText,
      },
    })

    setComponents(response.data.results)
  }

  useEffect(() => {
    if (isLoadingComponents) return

    setLoadingComponents(true)

    getComponents().finally(() => setLoadingComponents(false))
  }, [searchText])

  useEffect(() => {
    getComponents().finally(() => setLoadingComponents(false))
  }, [])

  return (
    <VStack flex={1} alignItems='stretch' spacing={0}>
      <SubHeader />

      <Divider borderColor='gray.200' borderBottomWidth={2} />

      <HStack flex={1} alignItems='stretch' overflow='hidden' spacing={0}>
        <VStack h='100%' minW='540px' alignItems='stretch' spacing={0}>
          <Box my={8} mx={8}>
            <Search value={searchText} onChangeValue={setSearchText} />
          </Box>

          {isLoadingComponents ? (
            <Flex flex={1} justifyContent='center'>
              <CircularProgress color='primary.500' isIndeterminate />
            </Flex>
          ) : (
            <List h='100%' px={8} pb={8} spacing={5} overflowY='scroll'>
              {components.map(component => (
                <ComponentListItem
                  key={component.code}
                  component={component}
                  onSelectComponent={setSelectedComponent}
                />
              ))}
            </List>
          )}
        </VStack>

        <Divider
          borderColor='gray.200'
          orientation='vertical'
          borderLeftWidth={2}
        />

        <Outlet context={{ component: selectedComponent }} />
      </HStack>
    </VStack>
  )
}
