import {
  AccordionButton,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export interface AccordionItemProps extends ChakraAccordionItemProps {
  label: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <ChakraAccordionItem {...props}>
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
