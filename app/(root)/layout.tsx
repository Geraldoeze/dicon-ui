import { montserrat } from '@/fonts'
import '.././globals.css'
import Navigation from './home/navigation'
import Footer from './home/footer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Navigation />
        {children}
        <Footer/>
      </body>
    </html>
  )
}