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
}

const UserUpdateSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido.'),
  password: Yup.string(),
})

export const ProfileEditPage: React.FC = () => {
  const toast = useToast()
  const { userId } = useParams()

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<UserUpdateFormValues>({
    mode: 'onChange',
    resolver: yupResolver(UserUpdateSchema),
  })

  const handleUserUpdate = async ({
    email,
    password,
  }: UserUpdateFormValues) => {
    try {
      await api.put(`/users/${userId}`, { email, password })

      toast({
        description: 'Disciplina criada com sucesso!',
        status: 'success',
      })
    } catch (err) {
      const error = err as AppError

      toast({
        description: error.message,
        status: 'error',
      })
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
      <Flex
        as='form'
        gap={4}
        direction='column'
        alignItems='stretch'
        onSubmit={handleSubmit(handleUserUpdate)}
      >
        <Input
          name='email'
          label='Email'
          placeholder='Email'
          control={control}
        />
        <Input
          name='password'
          label='Senha'
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
          Atualizar informações
        </Button>
      </Flex>
    </Container>
  )
}
