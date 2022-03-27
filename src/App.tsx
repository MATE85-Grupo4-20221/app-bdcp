import 'styles/fonts'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

import { AppRoutes } from './routes'
import { theme } from './styles'

const App = () => (
  <ChakraProvider theme={theme}>
    <AppRoutes />
  </ChakraProvider>
)

export default App
