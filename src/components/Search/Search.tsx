import { SearchIcon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'

export interface SearchProps {
  value?: string
  onChangeValue?: (value: string) => void
}

const Search: React.FC<SearchProps> = ({ value, onChangeValue }) => {
  return (
    <Box>
      <InputGroup>
        <Input
          h='64px'
          px={6}
          pr={14}
          borderWidth={2}
          borderColor='transparent'
          bgColor='gray.100'
          placeholder='Código ou nome da disciplina'
          value={value}
          onChange={event => onChangeValue?.(event.target.value)}
          _focus={{ borderWidth: 2, borderColor: 'primary.500' }}
        />
        <InputRightElement h='100%' color='gray.500' mr={4}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
export default Search
