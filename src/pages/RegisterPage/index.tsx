import { Button, Heading, VStack, Text, useToast, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório.'),
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem ser iguais.'
  ),
})

export const RegisterPage: React.FC = () => {
  const auth = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  })

  const handleRegister = async ({
    name,
    email,
    password,
  }: RegisterFormValues) => {
    try {
      setLoading(true)

      await auth.register(name, email, password)

      toast({
        description: 'Cadastro realizado com sucesso!',
        status: 'success',
      })

      navigate('/entrar', { replace: true })
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
      <VStack alignItems='stretch'>
        <Heading className='title' size='2xl'>
          Cadastro
        </Heading>
        <Text fontSize='lg'>Crie sua conta para entrar no sistema.</Text>
      </VStack>

      <Flex
        as='form'
        gap={4}
        direction='column'
        alignItems='stretch'
        onSubmit={handleSubmit(handleRegister)}
      >
        <Input name='name' placeholder='Nome' control={control} />

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

        <Input
          name='confirmPassword'
          type='password'
          placeholder='Confirmar senha'
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
          Cadastrar
        </Button>
      </Flex>

      <Text color='black' fontSize='md' textAlign='center'>
        Já possui conta?{' '}
        <Link to='/entrar'>
          <Heading as='span' color='primary.500' fontSize='md'>
            Faça login.
          </Heading>
        </Link>
      </Text>
    </VStack>
  )
}
