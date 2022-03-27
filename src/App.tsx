import 'styles/fonts'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

import Routes from 'routes'
import { theme } from 'styles'

const App = () => (
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>
)

export default App
