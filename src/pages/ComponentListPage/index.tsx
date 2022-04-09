import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  List,
  VStack,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { useState, useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Outlet, useParams } from 'react-router-dom'

import { Search } from 'components/Search'
import { SubHeader } from 'components/SubHeader'
import { api } from 'services'
import { Component, ListData } from 'types'

import { ComponentListItem } from './ComponentListItem'

export interface ComponentListPageProps {}

interface ComponentListFilter {
  page: number
  limit: number
  search?: string
}

const initialFilter: ComponentListFilter = {
  page: 0,
  limit: 10,
}

export const ComponentListPage: React.FC<ComponentListPageProps> = () => {
  const { componentCode } = useParams()

  const [isLoadingComponents, setLoadingComponents] = useState(true)
  const [components, setComponents] = useState<ListData<Component>>({
    results: [],
    total: 0,
  })

  const [searchText, setSearchText] = useState(
    componentCode?.toUpperCase() || ''
  )

  const [filter, setFilter] = useState<ComponentListFilter>({
    ...initialFilter,
    search: searchText,
  })

  const [selectedComponent, setSelectedComponent] = useState<Component>()

  const debouncedSetFilter = useMemo(() => debounce(setFilter, 300), [])

  const getComponents = async () => {
    const response = await api.get<ListData<Component>>(`/components`, {
      params: {
        page: filter.page,
        limit: filter.limit,
        filter: filter.search,
      },
    })

    setComponents({
      results: filter.page
        ? [...components.results, ...response.data.results]
        : response.data.results,
      total: response.data.total,
    })
  }

  const loadMore = () => setFilter({ ...filter, page: filter.page + 1 })

  useEffect(() => {
    getComponents().finally(() => setLoadingComponents(false))
  }, [filter])

  useEffect(() => {
    if (searchText === undefined) {
      return
    }

    const updatedFilter = {
      ...initialFilter,
      search: searchText || undefined,
    }

    debouncedSetFilter(updatedFilter)
  }, [searchText])

  return (
    <VStack flex={1} alignItems='stretch' spacing={0}>
      <SubHeader />

      <Divider borderColor='gray.200' borderBottomWidth={2} />

      <HStack flex={1} alignItems='stretch' overflow='hidden' spacing={0}>
        <VStack w='100%' h='100%' maxW='540px' alignItems='stretch' spacing={0}>
          <Box my={8} mx={8}>
            <Search value={searchText} onChangeValue={setSearchText} />
          </Box>

          <List
            id='component-list'
            px={8}
            pb={8}
            spacing={5}
            h='100%'
            overflowY='scroll'
          >
            <InfiniteScroll
              dataLength={components.results.length} // This is important field to render the next data
              next={loadMore}
              hasMore={
                isLoadingComponents ||
                components.results.length < components.total
              }
              scrollThreshold={0.9}
              loader={
                <Flex py={6} flex={1} justifyContent='center'>
                  <CircularProgress color='primary.500' isIndeterminate />
                </Flex>
              }
              scrollableTarget='component-list'
              style={{ overflow: 'hidden' }}
            >
              {components.results.map(component => (
                <ComponentListItem
                  key={component.code}
                  component={component}
                  onSelectComponent={setSelectedComponent}
                />
              ))}
            </InfiniteScroll>
          </List>
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
