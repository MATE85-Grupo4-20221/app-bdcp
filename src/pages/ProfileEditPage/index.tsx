import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  Box,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { AppError } from 'errors'
import { api } from 'services'

interface UserUpdateEmailFormValues {
  email: string
}

interface UserUpdatePasswordFormValues {
  password: string
  confirmPassword: string
}

const userUpdateEmailSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
})

const userUpdatePasswordSchema = Yup.object().shape({
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

export const ProfileEditPage: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const emailForm = useForm<UserUpdateEmailFormValues>({
    mode: 'onChange',
    resolver: yupResolver(userUpdateEmailSchema),
  })

  const passwordForm = useForm<UserUpdatePasswordFormValues>({
    mode: 'onChange',
    resolver: yupResolver(userUpdatePasswordSchema),
  })

  const handleEmailUpdate = async ({ email }: UserUpdateEmailFormValues) => {
    try {
      setLoading(true)

      await api.put('/users/update/email', { email })

      toast({
        position: 'top',
        description: 'Email alterado com sucesso',
        status: 'success',
      })
      navigate('/perfil', { replace: true })
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

  const handlePasswordUpdate = async ({
    password,
  }: UserUpdatePasswordFormValues) => {
    try {
      setLoading(true)

      await api.put('/users/update/password', { password })

      toast({
        position: 'top',
        description: 'Senha alterada com sucesso',
        status: 'success',
      })
      navigate('/perfil', { replace: true })
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
    <Container maxW='container.xl'>
      <Breadcrumb
        pt={8}
        color='gray.700'
        fontWeight='medium'
        fontSize='sm'
        separator={<ChevronRightIcon color='gray.700' />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/disciplinas'>
            Disciplinas
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box py={8}>
        <Heading color='black'>Informações do Perfil</Heading>
      </Box>

      <Tabs size='lg' variant='unstyled' orientation='vertical'>
        <TabList w='20%'>
          <Tab _selected={{ color: 'white', bg: 'primary.600' }}>
            Alterar Email
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'primary.600' }}>
            Alterar Senha
          </Tab>
        </TabList>
        <TabPanels w='80%' px='20%'>
          <TabPanel>
            <Flex
              as='form'
              gap={4}
              direction='column'
              alignItems='center'
              onSubmit={emailForm.handleSubmit(handleEmailUpdate)}
            >
              <Input
                name='email'
                label='Email'
                placeholder='Email'
                control={emailForm.control}
              />

              <Button
                type='submit'
                disabled={loading}
                isLoading={loading}
                colorScheme='primary'
                mt={8}
                size='lg'
              >
                Confirmar alteração de Email
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              as='form'
              gap={4}
              direction='column'
              alignItems='center'
              onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}
            >
              <Input
                name='password'
                type='password'
                label='Nova Senha'
                placeholder='Senha'
                control={passwordForm.control}
              />

              <Input
                name='confirmPassword'
                type='password'
                label='Confirmar Nova Senha'
                placeholder='Confirmar senha'
                control={passwordForm.control}
              />

              <Button
                type='submit'
                disabled={loading}
                isLoading={loading}
                colorScheme='primary'
                mt={8}
                size='lg'
              >
                Confirmar alteração de Senha
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
