import { montserrat } from '@/fonts'
import '../.././globals.css'
import Layout from './portalNavigation';


const breadcrumbs = [
  { label: "DIC", href: "/" },
  { label: "Student Portal", href: "/portal/student/" }
];


export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <main className={montserrat.variable}>
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