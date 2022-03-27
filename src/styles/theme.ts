import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      '#root': {
        height: '100%',
      },
    },
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    mono: 'Roboto, monospace',
  },
  colors: {
    black: '#464646',
    background: '#F3F3F3',
    gray: {
      100: '#F6F6F6',
      200: '#ECECEC',
      300: '#D6D6D6',
      500: '#BCBCBC',
      700: '#9A9A9A',
    },
    primary: {
      300: '#72A2FF',
      500: '#3A7DFF',
    },
    secondary: {
      500: '#F2CA80',
      700: '#9C762F',
    },
    success: {
      500: '#3AFFA1',
    },
    yellow: {
      500: '#FFD43A',
    },
    red: {
      500: '#DB4343',
    },
  },
})

export { theme }
