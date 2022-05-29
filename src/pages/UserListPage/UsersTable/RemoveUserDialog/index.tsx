import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import React from 'react'

export interface RemoveUserDialogProps {
  username: string
  open: boolean
  onClose: () => void
  onRemove: () => Promise<void>
}

export const RemoveUserDialog: React.FC<RemoveUserDialogProps> = ({
  username,
  open,
  onClose,
  onRemove,
}) => {
  const [loading, setLoading] = React.useState(false)

  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>

  const handleRemove = async () => {
    setLoading(true)

    await onRemove().finally(() => {
      setLoading(false)
      onClose()
    })
  }

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Remover usuário {username}
          </AlertDialogHeader>

          <AlertDialogBody>
            {`Você tem certeza que deseja remover o usuário ${username}?`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} disabled={loading} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme='red'
              disabled={loading}
              isLoading={loading}
              onClick={handleRemove}
              ml={3}
            >
              Remover
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
