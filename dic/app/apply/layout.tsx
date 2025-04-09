import { montserrat } from '@/fonts'
import '.././globals.css'
import { Providers } from  '../providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div lang="en" className={montserrat.className}>
         <Providers>
        {children}
        </Providers>
      </div>
  )
}