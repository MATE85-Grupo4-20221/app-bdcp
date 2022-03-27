import { ViewIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export interface ClassCardProps {
  code: string
  name: string
  link: string
}

const ClassCard = ({ code, name, link }: ClassCardProps) => {
  return (
    <LinkBox as='article' maxW='sm' p='3' borderWidth='1px' rounded='md'>
      <LinkOverlay href={link} />
      <Flex align='center'>
        <Box>
          <Heading size='md' my='2' color='#72A2FF'>
            {code}
          </Heading>
          <Text mb='3'>{name}</Text>
        </Box>
        <Spacer />
        <Box as='a' color='black' href='#' fontWeight='bold'>
          <ViewIcon w='7' h='7' />
        </Box>
      </Flex>
    </LinkBox>
  )
}
export default ClassCard
