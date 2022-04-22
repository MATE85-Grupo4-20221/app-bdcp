import { useToast } from '@chakra-ui/react'
import { AppError } from 'errors'
import React, { useContext, useEffect, useState } from 'react'

import { api } from 'services'

export interface AuthContextData {
  isLoading: boolean
  isAuthenticated: boolean
  login(email: string, password: string): Promise<void>
  register(name: string, email: string, password: string): Promise<void>
  logout(): Promise<void>
}

const STORAGE_TOKEN_KEY = 'MATE85/token'

const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const toast = useToast()

  const [isLoading, setLoading] = useState(true)
  const [token, setToken] = useState<string>()

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })

    setToken(response.data.token)
  }

  const register = async (name: string, email: string, password: string) => {
    await api.post('/users', { name, email, password })
  }

  const logout = async () => {
    setToken(undefined)
  }

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
      value={{ isLoading, isAuthenticated: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
