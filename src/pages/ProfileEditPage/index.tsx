import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  Text,
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
  HStack,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { User } from 'types'
import { AppError } from 'errors'
import { api } from 'services'
import { Input } from 'components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface UserUpdateFormValues {
  email: string
  password: string
  confirmPassword: string
}

const UserUpdateSchema = Yup.object().shape({
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

export const ProfileEditPage: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<UserUpdateFormValues>({
    mode: 'onChange',
    resolver: yupResolver(UserUpdateSchema),
  })

  const handleEmailUpdate = async ({ email }: UserUpdateFormValues) => {
    try {
      setLoading(true)

      await api.put('/users/update/email', { email })

      toast({
        description: 'Email alterado com sucesso',
        status: 'success',
      })
      navigate('/perfil', { replace: true })
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

  const handlePasswordUpdate = async ({ password }: UserUpdateFormValues) => {
    try {
      setLoading(true)

      await api.put('/users/update/password', { password })

      toast({
        description: 'Senha alterada com sucesso',
        status: 'success',
      })
      navigate('/perfil', { replace: true })
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
              onSubmit={handleSubmit(handleEmailUpdate)}
            >
              <Input
                name='email'
                label='Email'
                placeholder='Email'
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
              onSubmit={handleSubmit(handlePasswordUpdate)}
            >
              <Input
                name='password'
                type='password'
                label='Nova Senha'
                placeholder='Senha'
                control={control}
              />

              <Input
                name='confirmPassword'
                type='password'
                label='Confirmar Nova Senha'
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
                Confirmar alteração de Senha
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
