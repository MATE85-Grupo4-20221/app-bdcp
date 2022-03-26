import { SearchIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  theme,
} from '@chakra-ui/react'
import React from 'react'

export interface ClassCardProps { }

const CardClass: React.FC<ClassCardProps> = () => (
  <ChakraProvider theme={theme}>
    <Flex justify='space-evenly' direction='column'>
      <Box w={'20vw'}>
        <InputGroup>
          <Input type='tel' placeholder='Código ou nome da disciplina' />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </Box>
      <LinkBox as='article' maxW='sm' p='3' borderWidth='1px' rounded='md'>
        <LinkOverlay href='#' />
        <Flex align='center'>
          <Box>
            <Heading size='md' my='2' color='#72A2FF'>
              Código
            </Heading>
            <Text mb='3'>Nome</Text>
          </Box>
          <Spacer />
          <Box as='a' color='black' href='#' fontWeight='bold'>
            <ViewIcon w='7' h='7' />
          </Box>
        </Flex>
      </LinkBox>
    </Flex>
  </ChakraProvider>
)

export default CardClass
