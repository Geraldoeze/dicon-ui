import { montserrat } from '@/fonts'
import '.././globals.css'
import Navigation from './home/navigation'
import Footer from './home/footer'
import { LoaderProvider } from '../loaderContext'
import GlobalLoader from '@/components/ui/GlobalLoader'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <LoaderProvider>
        <GlobalLoader/>
        <Navigation/>
        {children}
        <Footer/>
        </LoaderProvider>
      </body>
    </html>
  )
}