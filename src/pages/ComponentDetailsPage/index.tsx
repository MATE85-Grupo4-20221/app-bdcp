import { Box } from '@chakra-ui/react'
import React from 'react'
import { useOutletContext } from 'react-router-dom'

import { Component } from 'types'

export interface ComponentDetailsPageProps {}

export const ComponentDetailsPage: React.FC<ComponentDetailsPageProps> = () => {
  const { component } = useDetails()

  if (!component) return null

  return <Box>Disciplina {component.id}</Box>
}

const useDetails = () =>
  useOutletContext<{ component: Component | undefined }>()
