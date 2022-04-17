import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import React from 'react'

export interface FormItemProps {
  name: string
  childComp?: React.ReactNode
}

export const FormItem: React.FC<FormItemProps> = ({ name, childComp }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            {name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>{childComp}</AccordionPanel>
    </AccordionItem>
  )
}
