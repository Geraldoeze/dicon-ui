import { Montserrat } from 'next/font/google'
import '.././globals.css'
import Navigation from './home/navigation'
import Footer from './home/footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navigation />
        {children}
        <Footer/>
      </body>
    </html>
  )
}