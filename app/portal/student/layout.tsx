import { Montserrat } from 'next/font/google'
import '../.././globals.css'
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SiteHeader } from "@/components/ui/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"


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
           
      <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex ">
        
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
          {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
        
        </main>
      </body>
    </html>
  )
}