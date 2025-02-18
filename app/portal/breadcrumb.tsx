
interface Breadcrumb {
    label: string;
    href: string;
  }
  
  
  import { Button } from "@/components/ui/button";  
  import { ChevronRight } from "lucide-react";
  import Link from "next/link";
  import React from "react";
  import Image from 'next/image';
  
  interface BreadcrumbsProps {
    items: Breadcrumb[];
  }
  
  export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
      <nav className="flex items-center space-x-1">
          <Image
                src="/logo.png" 
                alt="Defence Intelligence College"
                width={50}
                height={50}
                className="h-6 w-auto"
              />
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            <Button variant="link" asChild className="text-sm underline-none">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </React.Fragment>
        ))}
      </nav>
    );
  }