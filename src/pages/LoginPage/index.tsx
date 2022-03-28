import React, { useState } from 'react'
import { Input, Button, Heading } from '@chakra-ui/react'
import './style.css'
import { api } from 'services/api'

async function login(email: string, password: string) {
  const response = await api.post('/api/auth/login', { email, password })
  console.log(response)
}

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoanding] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoanding(true)
    e.preventDefault()
    console.log({ email, password })
    await login(email, password)
    setLoanding(false)
  }

  return (
    <section>
      <div className='login-card'>
        <div className='form-group'>
          <div>
            <Heading>Login</Heading>
            <p>Faça login para entrar no sistema</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <Input
              name='email'
              type='email'
              placeholder='Digite seu email'
              size='md'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor='password'>Senha</label>
            <Input
              name='password'
              type='password'
              placeholder='Digite sua senha'
              size='md'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              disabled={loading}
              isLoading={loading}
              type='submit'
              colorScheme='blue'
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
