import { Button, Heading, VStack, Text, useToast, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'
import { api } from 'services'

interface RegisterFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório.'),
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&:;<>?_\-=+])[0-9a-zA-Z*.!@$%&:;<>?_\-=+]{8,20}$/,
      'A senha deve ter entre 8 e 20 caracters, deve conter um número, uma letra maiúscula, uma letra minúscula e um caracter especial !.*$%&:;<>,.?_+=-'
    )
    .required('Campo obrigatório.'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem ser iguais.'
  ),
})

export const RegisterPage: React.FC = () => {
  const auth = useAuth()
  const toast = useToast()
  const { inviteToken } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  })

  const validateToken = async () => {
    try {
      await api.get(`invite/validate/${inviteToken}`)
      setValid(true)
    } catch (err) {}
  }

  const handleRegister = async ({
    name,
    email,
    password,
  }: RegisterFormValues) => {
    try {
      setLoading(true)
      if (inviteToken !== undefined) {
        await auth.register(inviteToken, name, email, password)
      }
      toast({
        position: 'top',
        description: 'Cadastro realizado com sucesso!',
        status: 'success',
      })

      navigate('/entrar', { replace: true })
    } catch (err) {
      const error = err as AppError

      toast({
        position: 'top',
        description: error.message,
        status: 'error',
      })
    } finally {
      setLoading(false)
      setValid(false)
    }
  }

  useEffect(() => {
    validateToken()
  })

  return (
    <VStack px={12} spacing={8} alignItems='stretch'>
      {valid === true ? (
        <>
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
        </>
      ) : (
        <VStack alignItems='stretch'>
          <Heading className='title' size='2xl'>
            Cadastro
          </Heading>
          <Text fontSize='lg'>Token Invalido ou expirado</Text>
        </VStack>
      )}
    </VStack>
  )
}
