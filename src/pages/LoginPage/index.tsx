import { Input, Button, Heading, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loginImage from 'assets/images/image.svg'
import { useAuth } from 'contexts/auth'
import { AppError } from 'errors'

import './style.css'

export const LoginPage: React.FC = () => {
  const auth = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    <section>
      <div className='left'>
        <div>
          <Heading className='title' size='2xl'>
            Login
          </Heading>
          <p>Faça login para entrar no sistema</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <Input
            name='email'
            type='email'
            placeholder='Digite seu email'
            size='lg'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Senha</label>
          <Input
            name='password'
            type='password'
            placeholder='Digite sua senha'
            size='lg'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            disabled={loading}
            isLoading={loading}
            type='submit'
            colorScheme='blue'
            size='lg'
          >
            Entrar
          </Button>
        </form>
      </div>
      <div className='right'>
        <img src={loginImage} alt='imagem do login' />
        <Heading className='message'>
          Busque aqui os conteúdos programáticos da UFBA!
        </Heading>
      </div>
    </section>
  )
}
