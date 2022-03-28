import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export interface HistoryProps {
  user: string
  action: string
  date: string
}

const History = ({ user, action, date }: HistoryProps) => {
  return (
    <Box>
      <Flex direction='column'>
        <Box p='3' border='solid #ECECEC' borderRadius='16px'>
          <Text>
            {user} {action} da disciplina
          </Text>
          <Text>{date}</Text>
        </Box>
      </Flex>
    </Box>
  )
}
export default History
