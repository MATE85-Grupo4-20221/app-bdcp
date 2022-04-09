import axios, { AxiosError } from 'axios'

import { env } from 'config/env'
import { AppError } from 'errors'

const api = axios.create({
  baseURL: env.API_URL,
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const message = error.response?.data?.message ?? 'Erro interno no servidor.'
    const statusCode = error.response?.status ?? 500

    return Promise.reject(new AppError(message, statusCode))
  }
)

export { api }
