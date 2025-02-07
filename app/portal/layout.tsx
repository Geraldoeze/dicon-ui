import { Montserrat } from 'next/font/google'
import '.././globals.css'
import Navigation from './portalNavigation'


const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className='overflow-x-hidden scroll-smooth scroll-none'>
        <Navigation />
        {children}
        </main>
      </body>
    </html>
  )
}