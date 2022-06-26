import { Button, Heading, VStack, Text, useToast, Flex } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Input } from 'components/Input'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'

interface ResetPasswordFormValues {
  email: string
}

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido.').required('Campo obrigatório.'),
})

export const ForgotPasswordPage: React.FC = () => {
  const auth = useAuth()
  const toast = useToast()

  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema),
  })

  const handleResetPassword = async ({ email }: ResetPasswordFormValues) => {
    try {
      setLoading(true)
      await auth.resetPassword(email)
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
          Esqueci minha senha
        </Heading>
        <Text fontSize='lg'>
          Digite o e-mail cadastrado para receber uma nova senha
        </Text>
      </VStack>

      <Flex
        as='form'
        gap={4}
        direction='column'
        alignItems='stretch'
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <Input
          name='email'
          type='email'
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
          Enviar nova senha
        </Button>
      </Flex>
    </VStack>
  )
}
