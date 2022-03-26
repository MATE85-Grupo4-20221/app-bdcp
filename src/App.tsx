import { ChakraProvider, theme } from '@chakra-ui/react'
import React from 'react'
import { Header } from './components/Header'

const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
  </ChakraProvider>
)

export default App
