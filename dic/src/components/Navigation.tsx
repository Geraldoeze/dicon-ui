"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pg-program', label: 'Pg Program' },
    { href: '/news-blog', label: 'News & Blog' },
    { href: '/past-commandants', label: 'Past Commandants' },
    { href: '/contact', label: 'Contact Us' }
  ]

  return (
    <nav className="flex space-x-4 p-4 bg-gray-100">
    <Link href="/" >

    </Link>
      {navItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href}
          className={`
            ${pathname === item.href 
              ? 'text-blue-600 font-bold' 
              : 'text-gray-800'}
            hover:text-blue-500 transition-colors
          `}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation