import {
  Box,
  Divider,
  HStack,
  Link,
  List,
  ListItem,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { NavLink as RouterLink, NavLinkProps, Outlet } from 'react-router-dom'

import { ClassCard } from 'components/ClassCard'
import { Search } from 'components/Search'
import { SubHeader } from 'components/SubHeader'

export interface ComponentListPageProps {}

const ComponentListPage: React.FC<ComponentListPageProps> = () => {
  return (
    <VStack flex={1} alignItems='stretch' spacing={0}>
      <SubHeader />

      <Divider borderColor='gray.200' borderBottomWidth={2} />

      <HStack flex={1} alignItems='stretch'>
        <VStack px={8} py={8} minW='540px' alignItems='stretch' spacing={8}>
          <Box>
            <Search />
          </Box>

          <List spacing={5}>
            <ListItem>
              <Link
                as={RouterLink}
                to='/disciplinas/mata02'
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                {
                  (({ isActive }) => (
                    <ClassCard
                      active={isActive}
                      code='MATA02'
                      name='Cálculo A'
                    />
                  )) as NavLinkProps['children']
                }
              </Link>
            </ListItem>
          </List>
        </VStack>

        <Divider
          borderColor='gray.200'
          orientation='vertical'
          borderLeftWidth={2}
        />

        <Box py={8} flex={1}>
          <Outlet />
        </Box>
      </HStack>
    </VStack>
  )
}

export default ComponentListPage
