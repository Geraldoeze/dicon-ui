import localFont from 'next/font/local'

// Load Montserrat from local files
export const montserrat = localFont({
  src: [
    {
      path: './Montserrat[wght].ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Montserrat[wght].ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ]
})