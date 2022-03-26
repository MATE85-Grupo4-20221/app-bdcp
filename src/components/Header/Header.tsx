import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <Flex h='7vh' bg='#3A7DFF' alignItems='center'>
    <Box>
      <Heading color='white' size='md'>
        Grupo 4
      </Heading>
    </Box>
    <Spacer />
    <Box>
      <Button colorScheme='White' mr='4'>
        Sair
      </Button>
    </Box>
  </Flex>
)

export default Header
