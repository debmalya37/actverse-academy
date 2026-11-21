"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMAIL, PHONE } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:px-1 md:py-1">
        {/* Bigger black frame + overflow-hidden with scale crops out excess side padding */}
        {/* Inside SiteHeader */}
<Link
  href="/"
  className="inline-flex h-16 w-36 shrink-0 items-center justify-center overflow-hidden transition-opacity hover:opacity-90 sm:h-18 sm:w-40 md:h-20 md:w-44"
>
  <Image
    src="/logo.png"
    alt="Actverse Academy Logo"
    width={280}
    height={160}
    className="h-full w-full scale-110 object-contain object-center"
    priority
  />
</Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-base md:flex">
          <Link
            href="/"
            className={
              isActive("/", true)
                ? "font-semibold text-cherry"
                : "transition-colors hover:text-cherry"
            }
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={
              isActive("/courses")
                ? "font-semibold text-cherry"
                : "transition-colors hover:text-cherry"
            }
          >
            Courses
          </Link>
          <Link
            href="/about"
            className={
              isActive("/about")
                ? "font-semibold text-cherry"
                : "transition-colors hover:text-cherry"
            }
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={
              isActive("/contact")
                ? "font-semibold text-cherry"
                : "transition-colors hover:text-cherry"
            }
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="h-9 bg-cta px-3 text-sm text-primary-foreground hover:bg-cherry sm:h-10 sm:px-4 sm:text-base"
          >
            <Link href="/contact">
              Enquire <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 shadow-md md:hidden"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`rounded-md py-2.5 text-base ${
              isActive("/", true) ? "font-semibold text-cherry" : "hover:text-cherry"
            }`}
          >
            Home
          </Link>
          <Link
            href="/courses"
            onClick={() => setOpen(false)}
            className={`rounded-md py-2.5 text-base ${
              isActive("/courses") ? "font-semibold text-cherry" : "hover:text-cherry"
            }`}
          >
            Courses
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={`rounded-md py-2.5 text-base ${
              isActive("/about") ? "font-semibold text-cherry" : "hover:text-cherry"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={`rounded-md py-2.5 text-base ${
              isActive("/contact") ? "font-semibold text-cherry" : "hover:text-cherry"
            }`}
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1.5fr] md:gap-10">
        <div className="sm:col-span-2 md:col-span-1">
          <Link
            href="/"
            className="inline-flex h-20 w-48 items-center justify-center overflow-hidden rounded-lg  px-6  transition-opacity hover:opacity-95 sm:h-24 sm:w-56 md:h-28 md:w-64"
          >
            <Image
              src="/logo.png"
              alt="Actverse Academy Logo"
              width={380}
              height={160}
              className="h-full w-full scale-125 object-contain object-center"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
            Today’s dreamers.
            <br />
            Tomorrow’s superstars.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm sm:text-base">
          <h4 className="font-display text-lg font-bold text-cherry">Quick Links</h4>
          <Link href="/" className="w-fit transition-colors hover:text-cherry">
            Home
          </Link>
          <Link href="/about" className="w-fit transition-colors hover:text-cherry">
            About Us
          </Link>
          <Link href="/courses" className="w-fit transition-colors hover:text-cherry">
            Courses & Fees
          </Link>
          <Link href="/contact" className="w-fit transition-colors hover:text-cherry">
            Contact Us
          </Link>
        </nav>

        <div className="space-y-3.5 text-sm sm:text-base">
          <h4 className="font-display text-lg font-bold text-cherry">Contact Us</h4>
          <a
            className="flex w-fit items-center gap-3 transition-colors hover:text-cherry"
            href={`tel:+91${PHONE}`}
          >
            <Phone className="h-4 w-4 shrink-0 text-cherry" />
            +91 {PHONE}
          </a>
          <a
            className="flex w-fit items-center gap-3 break-all transition-colors hover:text-cherry"
            href={`mailto:${EMAIL}`}
          >
            <Mail className="h-4 w-4 shrink-0 text-cherry" />
            {EMAIL}
          </a>
          <div className="flex items-start gap-3 text-muted-foreground">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-cherry" />
            <p className="leading-relaxed">
              Bungalow No. 39,
              <br />
              35/2, D-Mart lane, Aram Nagar Part 2, Jeet Nagar,
              <br />
              Versova, Andheri West, Mumbai, Maharashtra 400061
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-border px-5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center md:mt-12">
        <p>© {new Date().getFullYear()} Actverse Academy. All rights reserved.</p>
        
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