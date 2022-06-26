import { useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'

import { AppError } from 'errors'
import { api } from 'services'
import { User } from 'types'

export interface AuthContextData {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | undefined
  login(email: string, password: string): Promise<void>
  register(
    inviteToken: string,
    name: string,
    email: string,
    password: string
  ): Promise<void>
  resetPassword(email: string): Promise<void>
  logout(): Promise<void>
}

const STORAGE_TOKEN_KEY = 'MATE85/token'

const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const toast = useToast()

  const [isLoading, setLoading] = useState(true)
  const [token, setToken] = useState<string>()
  const [user, setUser] = useState<User>()

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })

    setToken(response.data.token)
  }

  const register = async (
    inviteToken: string,
    name: string,
    email: string,
    password: string
  ) => {
    await api.post(`/users/${inviteToken}`, { name, email, password })
  }

  const resetPassword = async (email: string) => {
    await api.post('/auth/reset-password', { email })
  }

  const logout = async () => {
    setToken(undefined)
  }

  useEffect(() => {
    if (!token) {
      setUser(undefined)
      return
    }

    setLoading(true)

    api
      .get('/auth/user')
      .then(response => {
        setUser(response.data || undefined)
      })
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY)

    if (token) setToken(token)

    setLoading(false)
  }, [])

  useEffect(() => {
    const interceptorId = api.interceptors.request.use(config => {
      const token = localStorage.getItem(STORAGE_TOKEN_KEY)

      if (config.headers)
        config.headers.Authorization = token ? 'Bearer ' + token : false

      return config
    })

    return () => api.interceptors.request.eject(interceptorId)
  }, [])

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      undefined,
      async (error: AppError) => {
        if (error.statusCode === 401) {
          await logout()

          toast({
            position: 'top',
            description: error.message,
            status: 'error',
          })
        }

        return Promise.reject(error)
      }
    )

    return () => api.interceptors.response.eject(interceptorId)
  }, [])

  useEffect(() => {
    if (isLoading) return

    if (token) localStorage.setItem(STORAGE_TOKEN_KEY, token)
    else localStorage.removeItem(STORAGE_TOKEN_KEY)
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated: !!token,
        user,
        login,
        register,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
