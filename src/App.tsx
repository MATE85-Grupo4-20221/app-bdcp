import 'styles/fonts'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from 'contexts/auth'
import { AppRoutes } from 'routes'
import { theme } from 'styles'
import store from 'store'

const App = () => (
  <Router>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ChakraProvider>
    </ReduxProvider>
  </Router>
)

export default App
