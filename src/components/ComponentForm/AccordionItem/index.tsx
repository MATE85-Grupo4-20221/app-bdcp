import {
  AccordionButton,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export interface AccordionItemProps {
  label: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  label,
  children,
}) => {
  return (
    <ChakraAccordionItem>
      <AccordionButton py={4}>
        <Text flex='1' color='black' fontSize='xl' textAlign='left'>
          {label}
        </Text>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel>{children}</AccordionPanel>
    </ChakraAccordionItem>
  )
}
