import { CircularProgress, Flex } from '@chakra-ui/react'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'

import { ProtectedLayout, PublicLayout } from 'components/Layout'
import { useAuth } from 'contexts/auth'
import { ComponentListPage, ComponentDetailsPage, LoginPage } from 'pages'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to='/entrar' state={{ from: location }} replace />
  }

  return children
}

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const location = useLocation()

  if (auth.isAuthenticated) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children
}

export const AppRoutes: React.FC = () => {
  const auth = useAuth()

  if (auth.isLoading) {
    return (
      <Flex h='100%' alignItems='center' justifyContent='center'>
        <CircularProgress color='primary.500' isIndeterminate />
      </Flex>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Navigate to='/disciplinas' replace />} />

          <Route path='disciplinas' element={<ComponentListPage />}>
            <Route path=':componentCode' element={<ComponentDetailsPage />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/entrar' element={<LoginPage />} />
          {/* <Route path='/cadastrar' element={<RegisterPage />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}
