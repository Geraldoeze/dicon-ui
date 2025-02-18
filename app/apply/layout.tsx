import { montserrat } from '@/fonts'
import '.././globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        
        {children}
       
      </body>
    </html>
  )
}