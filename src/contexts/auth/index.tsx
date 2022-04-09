import React, { useContext, useEffect, useState } from 'react'

import { api } from 'services'

export interface AuthContextData {
  isLoading: boolean
  isAuthenticated: boolean
  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

const STORAGE_TOKEN_KEY = 'MATE85/token'

const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [token, setToken] = useState<string>()

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })

    setToken(response.data.token)
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
    if (isLoading) return

    if (token) localStorage.setItem(STORAGE_TOKEN_KEY, token)
    else localStorage.removeItem(STORAGE_TOKEN_KEY)

    const interceptorId = api.interceptors.request.use(config => {
      if (config.headers)
        config.headers.Authorization = token ? 'Bearer ' + token : false

      return config
    })

    return () => api.interceptors.request.eject(interceptorId)
  }, [token])

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
