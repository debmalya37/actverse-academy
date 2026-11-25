import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { EMAIL, PHONE, WHATSAPP_URL } from "@/lib/site-data";
import prisma from "@/lib/prisma";
import { connection } from "next/server";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export const instant = false;

export const metadata = {
  title: "Contact Us — Actverse Academy",
  description:
    "Get in touch with Actverse Academy in Versova, Mumbai for acting courses, dance training, batch schedules, and admissions enquiries.",
};

function FinalCTA() {
  return (
    <section className="relative flex min-h-[360px] w-full flex-col justify-between overflow-hidden bg-ink text-bone sm:min-h-[440px] md:min-h-[520px] lg:min-h-[580px]">
      {/* Full-bleed background artwork */}
      <Image
        src="/gala.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="object-cover object-top sm:object-top md:object-top"
      />

      {/* Light top vignette + stronger bottom scrim so text pops without hiding the center/top art */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/30 to-ink/85"
        aria-hidden
      />

      {/* Top filmstrip */}
      {/* <div className="filmstrip relative z-10 w-full" aria-hidden /> */}

      {/* Positioned toward the bottom so the ACTVERSE ACADEMY banner & central figure stay clear */}
      {/* <Reveal className="relative z-10 mx-auto mt-auto w-full max-w-5xl px-5 pb-8 pt-16 text-center sm:px-8 sm:pb-10 md:pb-12">
        <h2 className="text-3xl leading-[1.02] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl lg:text-7xl">
          Lights. Camera. <em className="text-champagne">Enrol.</em>
        </h2>
      </Reveal> */}

      {/* Bottom filmstrip */}
      {/* <div className="filmstrip relative z-10 w-full" aria-hidden /> */}
    </section>
  );
}
export default async function ContactPage() {
  await connection();

  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true },
  });

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-cherry py-12 text-bone md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="label-mono text-champagne">Admissions · Contact Us</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Let’s talk about your <em>dream</em>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-bone/90 sm:text-lg md:mt-6">
            Fill out the enquiry form below or reach out to our admissions desk
            directly. We’ll help you pick the right programme for your goals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
          {/* Left: Direct Contact Info */}
          <div className="space-y-8 lg:sticky lg:top-28">
            <div>
              <p className="label-mono text-cherry">Reach Us Directly</p>
              <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                Actverse Academy, Mumbai
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Visit our Versova campus or connect with admissions over phone
                or WhatsApp for batch timings, fees, and accommodation support.
              </p>
            </div>

            <div className="space-y-5 border-y border-border py-6 text-sm sm:text-base">
              <a
                href={`tel:+91${PHONE}`}
                className="flex items-center gap-3.5 transition-colors hover:text-cherry"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cherry/10 text-cherry">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 {PHONE}</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3.5 break-all transition-colors hover:text-cherry"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cherry/10 text-cherry">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cherry/10 text-cherry">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Campus Address</p>
                  <p className="mt-0.5 leading-relaxed text-foreground/90">
                    Bungalow No. 39, 35/2, D-Mart lane, Aram Nagar Part 2, Jeet
                    Nagar, Versova, Andheri West, Mumbai, Maharashtra 400061
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-12 w-full sm:w-auto"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 text-cherry" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Right: Enquiry Form */}
          <ContactForm courses={courses} />
        </div>
      </section>
          <FinalCTA />
    </SiteShell>
  );
}