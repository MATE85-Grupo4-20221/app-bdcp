import 'styles/fonts'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { AuthProvider } from 'contexts/auth'
import { AppRoutes } from 'routes'
import { theme } from 'styles'
import store from 'store'

const App = () => (
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  </ReduxProvider>
)

export default App
