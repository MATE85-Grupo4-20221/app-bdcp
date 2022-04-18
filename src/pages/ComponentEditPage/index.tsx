import { Container, Heading, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { ComponentForm } from 'components/ComponentForm'
import { ComponentFormValues } from 'components/ComponentForm/types'

export const ComponentEditPage: React.FC = () => {
  const { componentCode } = useParams()

  if (!componentCode) {
    return null
  }

  const handleEdit = (data: ComponentFormValues) => {
    console.log('DATA', data)
  }

  return (
    <Container maxW='container.xl'>
      <Box py={8}>
        <Heading>Editar disciplina - {componentCode.toUpperCase()}</Heading>
        <Text>Altere o conteúdo da disciplina.</Text>
      </Box>

      <ComponentForm onSubmit={handleEdit} />
    </Container>
  )
}
