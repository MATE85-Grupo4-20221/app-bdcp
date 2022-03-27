import { SearchIcon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'

export interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <Box>
      <InputGroup>
        <Input
          h='64px'
          px={6}
          pr={14}
          borderWidth={0}
          bgColor='gray.100'
          placeholder='Código ou nome da disciplina'
        />
        <InputRightElement h='100%' color='gray.500' mr={4}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
export default Search
