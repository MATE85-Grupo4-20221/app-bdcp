import { Button, Heading, Box, VStack, Text, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'

interface LoginFormValues {
  email: string
  password: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
})

export const LoginPage: React.FC = () => {
  const auth = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    try {
      setLoading(true)

      await auth.login(email, password)

      navigate('/', { replace: true })
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack px={12} spacing={8} alignItems='stretch'>
      <Box>
        <Heading className='title' size='2xl'>
          Login
        </Heading>
        <Text fontSize='lg'>Faça login para entrar no sistema.</Text>
      </Box>

      <VStack as='form' spacing={4} alignItems='stretch'>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          control={control}
        />

        <Input
          name='password'
          type='password'
          placeholder='Senha'
          control={control}
        />
      </VStack>
      <Button
        type='submit'
        disabled={loading}
        isLoading={loading}
        onClick={handleSubmit(handleLogin)}
        colorScheme='blue'
        size='lg'
      >
        Entrar
      </Button>
    </VStack>
  )
}