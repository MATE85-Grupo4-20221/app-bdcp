import { ChakraProvider, theme } from '@chakra-ui/react'
import React from 'react'
import { ClassCard } from './components/ClassCard'
import { Header } from './components/Header'

const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <ClassCard code='MATA01' name='Discreta' link='www.google.com' />
  </ChakraProvider>
)

export default App
