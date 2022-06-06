import {
  Box,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import React from 'react'

export interface InviteModalProps {
  link: string
  open: boolean
  onClose(): void
}

export const InviteModal: React.FC<InviteModalProps> = ({
  link,
  open,
  onClose,
}) => {
  const { hasCopied, onCopy } = useClipboard(link)

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Convite gerado!</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box>
            <Text mb={4}>
              Envie o link abaixo para que o novo usuário possa se cadastrar.
            </Text>
            <Link color='primary.500' href={link} isExternal>
              {link}
            </Link>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme='blue' onClick={onCopy}>
            {hasCopied ? 'Copiado!' : 'Copiar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
