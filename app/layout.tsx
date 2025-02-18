import { montserrat } from '@/fonts'
import './globals.css'
import { Providers } from './providers'
import { UserProvider } from './userContext'
// import Navigation from './home/navigation'
// import Footer from './home/footer'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {/* <Navigation /> */}
        <UserProvider>
        <Providers>
          {children}
        </Providers>
        </UserProvider>
        {/* <Footer/> */}
      </body>
    </html>
  )
}