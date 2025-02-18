import { montserrat } from '@/fonts'
import '../.././globals.css'
import Layout from './portalNavigation';


const breadcrumbs = [
  { label: "DIC", href: "/" },
  { label: "Staff Portal", href: "/portal/staff/" }
];


export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <main className={montserrat.className}>
        <section className='overflow-x-hidden scroll-smooth scroll-none'>
        <Layout breadcrumbs={breadcrumbs}>
          <div className="bg-slate-50">
        {children}
        </div>
        </Layout>
        </section>
      </main>
  
  )
}