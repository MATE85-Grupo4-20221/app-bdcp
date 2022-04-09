import 'styles/fonts'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

import { AuthProvider } from 'contexts/auth'
import { AppRoutes } from './routes'
import { theme } from './styles'

const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </ChakraProvider>
)

export default App
