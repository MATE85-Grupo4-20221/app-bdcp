import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Heading } from '@chakra-ui/react'
import './style.css'
import { api } from 'services/api'
import loginImage from '../../assets/images/image.svg'

async function login(email: string, password: string) {
  const response = await api.post('/api/auth/login', { email, password })
  console.log(response)
}

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoanding] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoanding(true)
    e.preventDefault()
    console.log({ email, password })
    await login(email, password)
    setLoanding(false)
    navigate('/', { replace: true })
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
