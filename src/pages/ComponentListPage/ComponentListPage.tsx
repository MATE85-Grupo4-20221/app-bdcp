import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export interface ComponentListPageProps {}

const ComponentListPage: React.FC<ComponentListPageProps> = () => {
  return (
    <VStack flex={1} alignItems='stretch' spacing={0}>
      <Box bgColor='#FCFCFC' px='8' py='12'>
        <Heading>Disciplinas</Heading>
      </Box>

      <Divider borderColor='gray.200' borderBottomWidth={2} />

      <HStack px={8} flex={1} alignItems='stretch' spacing={8}>
        <VStack py={8}>
          <Link to='/disciplinas/1'>Disciplina 1</Link>
          <Link to='/disciplinas/2'>Disciplina 2</Link>
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
