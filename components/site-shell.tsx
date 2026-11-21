"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMAIL, PHONE } from "@/lib/site-data";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/actverseacademy?rpxt=aGZlcWZ1MXhmNGU5",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594155764002",
    icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/actverse-academy/",
    icon: LinkedInIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCvx_5LuM-brjUJ9GvbKqCeA",
    icon: YouTubeIcon,
  },
] as const;

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
            className="inline-flex h-20 w-48 items-center justify-center overflow-hidden rounded-lg px-6 transition-opacity hover:opacity-95 sm:h-24 sm:w-56 md:h-28 md:w-64"
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
          <div className="mt-5 flex items-center gap-2.5">
            {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Actverse Academy on ${name}`}
                title={name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-cherry hover:bg-cherry hover:text-bone"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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