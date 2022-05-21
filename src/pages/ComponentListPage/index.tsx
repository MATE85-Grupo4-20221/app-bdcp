import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  HStack,
  List,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { useState, useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Outlet, useParams } from 'react-router-dom'

import api from 'api'
import { Search } from 'components/Search'
import { useAuth } from 'contexts/auth'
import { useDispatch, useSelector } from 'store'
import {
  cleanComponents,
  componentsAdded,
  selectAllComponents,
  selectComponentByCode,
} from 'store/components'
import { ListFilter } from 'types'

import { ComponentListItem } from './ComponentListItem'
import { ComponentPlaceholder } from './ComponentPlaceholder'

export interface ComponentListPageProps {}

interface ComponentListFilter extends ListFilter {
  page: number
  limit: number
  search?: string
}

const initialFilter: ComponentListFilter = {
  page: 0,
  limit: 10,
}

export const ComponentListPage: React.FC<ComponentListPageProps> = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const params = useParams()

  const componentCode = params.componentCode?.toUpperCase() || ''

  const components = useSelector(selectAllComponents)
  const totalComponents = useSelector(state => state.components.total)

  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState(componentCode)
  const [filter, setFilter] = useState<ComponentListFilter>({
    ...initialFilter,
    search: searchText,
  })

  const isMd = useBreakpointValue({ base: true, lg: false })
  const debouncedSetFilter = useMemo(() => debounce(setFilter, 300), [])

  const component = useSelector(state =>
    selectComponentByCode(state, componentCode)
  )

  const getComponents = async () => {
    const response = await api.component.getComponents(filter)

    if (filter.page === 0) {
      dispatch(cleanComponents())
    }

    dispatch(componentsAdded(response))
  }

  const loadMore = () => setFilter({ ...filter, page: filter.page + 1 })

  useEffect(() => {
    getComponents().finally(() => setLoading(false))
  }, [filter])

  useEffect(() => {
    if (loading) return

    setFilter({
      ...initialFilter,
      search: filter.search,
    })
  }, [auth.isAuthenticated])

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
    <HStack flex={1} alignItems='stretch' overflow='hidden' spacing={0}>
      <VStack
        hidden={!((isMd && !componentCode) || !isMd)}
        w={{ base: '100%', lg: '540px' }}
        h='100%'
        alignItems='stretch'
        flexShrink={0}
        spacing={0}
      >
        <Box py={8} px={8} pb={4}>
          <Heading color='black'>Disciplinas</Heading>
          <Text color='black'>
            Encontre o conteúdo programático das disciplinas.
          </Text>
        </Box>

        <Box pt={4} py={8} px={8}>
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
            dataLength={components.length} // This is important field to render the next data
            next={loadMore}
            hasMore={loading || components.length < totalComponents}
            scrollThreshold={0.9}
            loader={
              <Flex py={6} flex={1} justifyContent='center'>
                <CircularProgress color='primary.500' isIndeterminate />
              </Flex>
            }
            scrollableTarget='component-list'
            style={{ overflow: 'hidden' }}
          >
            {totalComponents > 0 ? (
              components.map(component => (
                <ComponentListItem key={component.code} component={component} />
              ))
            ) : (
              <Text textAlign='center'>Nenhuma disciplina encontrada.</Text>
            )}
          </InfiniteScroll>
        </List>
      </VStack>

      <Divider
        borderColor='gray.200'
        orientation='vertical'
        borderLeftWidth={2}
      />

      {((isMd && !!componentCode) || !isMd) && component ? (
        <Outlet
          context={{
            component,
            refreshComponent: () => setFilter({ ...filter }),
          }}
        />
      ) : (
        <ComponentPlaceholder />
      )}
    </HStack>
  )
}
