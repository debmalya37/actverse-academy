"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMAIL, PHONE, WHATSAPP_URL } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Helper to determine if a link is active
  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image 
            src="/logo.png" 
            alt="Actverse Academy Logo" 
            width={180} 
            height={100} 
            className="h-16 w-auto md:h-20"
            priority
          />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-md md:flex">
          <Link href="/" className={isActive("/", true) ? "text-cherry font-semibold" : "hover:text-cherry transition-colors"}>
            Home
          </Link>
          <Link href="/about" className={isActive("/about") ? "text-cherry font-semibold" : "hover:text-cherry transition-colors"}>
            About Us
          </Link>
          <Link href="/courses" className={isActive("/courses") ? "text-cherry font-semibold" : "hover:text-cherry transition-colors"}>
            Courses
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="h-10 bg-cta px-4 text-primary-foreground hover:bg-cherry">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Enquire <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            aria-label={open ? "Close menu" : "Open menu"} 
            aria-expanded={open} 
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="flex flex-col gap-4 border-t border-border px-5 py-5 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className={isActive("/", true) ? "text-cherry font-semibold" : ""}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className={isActive("/about") ? "text-cherry font-semibold" : ""}>
            About Us
          </Link>
          <Link href="/courses" onClick={() => setOpen(false)} className={isActive("/courses") ? "text-cherry font-semibold" : ""}>
            Courses
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.5fr_1fr_1.5fr]">
        <div>
          <Link href="/" className="inline-block transition-opacity hover:opacity-80">
            <Image 
              src="/logo.png" 
              alt="Actverse Academy Logo" 
              width={200} 
              height={67} 
              className="h-32 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-muted-foreground leading-relaxed">
            Today’s dreamers.<br />
            Tomorrow’s superstars.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-4">
          <h4 className="font-display text-lg font-bold text-cherry">Quick Links</h4>
          <Link href="/" className="hover:text-cherry transition-colors">Home</Link>
          <Link href="/about" className="hover:text-cherry transition-colors">About Us</Link>
          <Link href="/courses" className="hover:text-cherry transition-colors">Courses & Fees</Link>
        </nav>
        <div className="space-y-4 text-sm">
          <h4 className="font-display text-lg font-bold text-cherry">Contact Us</h4>
          <a className="flex items-center gap-3 hover:text-cherry transition-colors" href={`tel:+91${PHONE}`}>
            <Phone className="h-4 w-4 text-cherry" />+91 {PHONE}
          </a>
          <a className="flex items-center gap-3 break-all hover:text-cherry transition-colors" href={`mailto:${EMAIL}`}>
            <Mail className="h-4 w-4 shrink-0 text-cherry" />{EMAIL}
          </a>
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cherry" />
            <p className="leading-relaxed">
              Bungalow No. 39, 
<br />
              35/2, D-Mart lane, Aram Nagar Part 2, Jeet Nagar, <br />
              Versova, Andheri West, Mumbai, Maharashtra 400061
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-5 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Actverse Academy. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-cherry transition-colors">Privacy Policy</Link>
          <Link href="/refund-policy" className="hover:text-cherry transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) { 
  return (
    <div className="overflow-x-clip">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  ); 
}