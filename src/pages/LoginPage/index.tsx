import { Button, Heading, VStack, Text, useToast, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'
import { Link } from 'react-router-dom'

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

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  })

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    try {
      setLoading(true)

      await auth.login(email, password)
    } catch (err) {
      const error = err as AppError

      toast({
        position: 'top',
        description: error.message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack px={12} spacing={8} alignItems='stretch'>
      <VStack alignItems='stretch'>
        <Heading className='title' size='2xl'>
          Login
        </Heading>
        <Text fontSize='lg'>Faça login para entrar no sistema.</Text>
      </VStack>

      <Flex
        as='form'
        gap={4}
        direction='column'
        alignItems='stretch'
        onSubmit={handleSubmit(handleLogin)}
      >
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

        <Button
          type='submit'
          disabled={loading}
          isLoading={loading}
          colorScheme='primary'
          mt={8}
          size='lg'
        >
          Entrar
        </Button>
        <Link to='/novasenha'>Esqueceu sua senha?</Link>
      </Flex>
    </VStack>
  )
}
