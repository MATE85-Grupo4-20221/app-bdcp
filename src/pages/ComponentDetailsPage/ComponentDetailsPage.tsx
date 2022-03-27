import { Box } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

export interface ComponentDetailsPageProps {}

const ComponentDetailsPage: React.FC<ComponentDetailsPageProps> = () => {
  const { componentId } = useParams()

  return <Box>Disciplina {componentId}</Box>
}

export default ComponentDetailsPage
