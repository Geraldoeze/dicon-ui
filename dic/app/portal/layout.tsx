import { montserrat } from '@/fonts'
import '.././globals.css'
import { Providers } from '../providers'
//import Navigation from './student/portalNavigation'


export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <main className={montserrat.className}>
        <section className='overflow-x-hidden scroll-smooth scroll-none'>
        {/* <Navigation /> */}
        <Providers>
        {children}
        </Providers>
        </section>
      </main>
    
  )
}