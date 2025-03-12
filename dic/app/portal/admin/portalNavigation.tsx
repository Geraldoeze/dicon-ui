"use client"

import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Menu, 
  LogOut, 
  BookOpen, 
  Users, 
  ClipboardList, 
  Pencil, 
  HelpCircle, 
  ArrowLeft,
  X,
  Timer
} from "lucide-react";
import { Breadcrumbs } from "../breadcrumb";
import Link from 'next/link';
import Image from 'next/image';
import { AuthService} from '@/services/auth/auth.service'
import { useUser } from '@/app/userContext';
interface Breadcrumb {
  label: string;
  href: string;
}

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: Breadcrumb[];
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

const navItems = [
  { title: "Overview", icon: <BookOpen className="w-5 h-5" />, href: "/portal/admin/overview" },
  { title: "Applications", icon: <Users className="w-5 h-5" />, href: "/portal/admin/applications" },
  { title: "Classes", icon: <Timer className='w-5 h-5'/>, href:'/portal/admin/timetable'},
  { title: "Courses", icon: <Timer className='w-5 h-5'/>, href:'/portal/admin/courses'},
  { title: "Staffs", icon: <ClipboardList className="w-5 h-5" />, href: "/portal/admin/staffs" },
  { title: "Students", icon: <Pencil className="w-5 h-5" />, href: "/portal/admin/students"}

];

export function Layout({ children, breadcrumbs }: LayoutProps) {

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50 md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 border-r-0">
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar className="w-60 lg:w-80" />
      )}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Header breadcrumbs={breadcrumbs} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function Sidebar({ className, isMobile }: SidebarProps) {
    const { user} = useUser();
  return (
    <div className={cn("bg-[#080825] text-white h-full relative", className)}>
      {isMobile && (
        <SheetClose className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </Button>
        </SheetClose>
      )}
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <Link href="/portal/amin/profile" className="flex flex-col items-center space-y-3">
            <div className="relative w-20 h-20">
              <Image 
                src={user?.photo_url || "/male.png"} 
                alt={user?.first_name || "User"}
                width={80} 
                height={80} 
                className="rounded-full object-cover border-2 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-center my-2">
              <h2 className="text-lg font-semibold">{user?.first_name || "Loading..."}</h2>
              <p className="text-sm text-gray-400">{user?.account_type || "User"}</p>
            </div>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="py-6">
            <h3 className="text-xs uppercase text-gray-400 font-semibold px-2 mb-4">Menu</h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start text-base gap-3 py-6 hover:bg-white/10 hover:text-white transition-colors"
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 hover:bg-white/10 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Support
          </Button>
          <Link href="/">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 hover:bg-white/10 transition-colors"
            
          >
            <ArrowLeft className="w-5 h-5" />
            Return to website
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Header({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const { user } = useUser();
  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <p className="text-gray-700 hidden lg:block">Welcome, {user?.first_name || "User"}</p>
         
          <Button onClick={handleLogout} variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
            <LogOut className="h-5 w-5" />
          </Button>
         
        </div>
      </div>
    </header>
  );
}

export default Layout;