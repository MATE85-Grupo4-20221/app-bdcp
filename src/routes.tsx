import { CircularProgress, Flex } from '@chakra-ui/react'
import React from 'react'
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'

import { ProtectedLayout, PublicLayout } from 'components/Layout'
import { useAuth } from 'contexts/auth'
import {
  ComponentAddPage,
  ComponentDetailsPage,
  ComponentEditPage,
  ComponentListPage,
  LoginPage,
  RegisterPage,
  UserListPage,
} from 'pages'
import { IRouteState } from 'types'
import { ProfileEditPage } from 'pages/ProfileEditPage'
import { ForgotPasswordPage } from 'pages/FogotPasswordPage'

export const PrivateRoute = () => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to='/entrar' state={{ from: location }} replace />
  }

  return <Outlet />
}

export const ProtectedRoute = () => {
  const auth = useAuth()
  const location = useLocation()

  if (auth.isAuthenticated) {
    // Recover previous location from state
    const routeState = location.state as IRouteState | undefined
    const previousLocation = routeState?.from || '/'

    return <Navigate to={previousLocation} replace />
  }

  return <Outlet />
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
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Navigate to='/disciplinas' replace />} />

        <Route path='disciplinas' element={<ComponentListPage />}>
          <Route path=':componentCode' element={<ComponentDetailsPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='usuarios' element={<UserListPage />} />

          <Route path='disciplinas/adicionar' element={<ComponentAddPage />} />
          <Route
            path='disciplinas/:componentCode/editar'
            element={<ComponentEditPage />}
          />
          <Route path='/perfil' element={<ProfileEditPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path='/entrar' element={<LoginPage />} />
          <Route path='/cadastrar/:inviteToken' element={<RegisterPage />} />
          <Route path='/novasenha' element={<ForgotPasswordPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
