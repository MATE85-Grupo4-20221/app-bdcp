import { SearchIcon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'

export interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <Box w={'20vw'}>
      <InputGroup>
        <Input type='tel' placeholder='Código ou nome da disciplina' />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
export default Search
