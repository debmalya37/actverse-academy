import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { Reveal } from "@/components/ui/reveal";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

export const instant = false;

export const metadata = {
  title: "About Us | Actverse Academy",
  description:
    "Discover the vision behind Actverse Academy, meet our expert faculty, and learn how we nurture the next generation of superstars in Mumbai.",
};

const Label = ({
  n,
  t,
  tone = "text-gold",
}: {
  n: string;
  t: string;
  tone?: string;
}) => (
  <p className={`label-mono ${tone}`}>
    Scene {n} · {t}
  </p>
);

export default async function AboutPage() {
  await connection();
  const team = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="grain relative flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        {/* HERO SECTION — Philosophy */}
        <section className="relative bg-ink py-10 text-bone sm:py-14 lg:flex lg:min-h-[calc(100vh-5rem)] lg:items-center lg:py-10">
  <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
    <Reveal>
      <h1 className="max-w-5xl text-3xl leading-[1.08] tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
        IT’S TIME TO SHINE{" "}
        <span className="mt-1 block font-display italic text-champagne lg:mt-0.5">
          WITH ACTVERSE ACADEMY
        </span>
      </h1>
    </Reveal>

    <div className="mt-6 grid grid-cols-1 gap-6 border-t hairline pt-6 sm:mt-8 sm:pt-8 md:grid-cols-2 md:gap-10 lg:mt-8 lg:gap-14 lg:pt-7">
      <Reveal className="space-y-4 lg:space-y-4">
        <p className="text-base leading-relaxed text-bone/90 lg:text-[1.0625rem] lg:leading-7">
          Every superstar begins with a dream. Every award-winning performance
          starts with a first step. At{" "}
          <strong className="font-semibold text-bone">Actverse Academy</strong>,
          we help young dreamers discover their talent, build confidence, and
          take their first steps towards the exciting world of cinema, acting,
          and creative expression.
        </p>
        <p className="text-base leading-relaxed text-bone/85 lg:text-[1.0625rem] lg:leading-7">
          For aspiring actors, we provide a space to learn the craft, explore
          characters, experience the camera, and master the art of performance.
          For students discovering their strengths, we nurture creativity,
          communication, self-awareness, and confidence.
        </p>
      </Reveal>

      <Reveal className="flex flex-col justify-between space-y-5 lg:space-y-4">
        <p className="text-base leading-relaxed text-bone/85 lg:text-[1.0625rem] lg:leading-7">
          From mastering the camera and bringing characters to life to preparing
          for auditions and owning the spotlight, we nurture the skills,
          creativity, and courage that help talent grow. We create an
          environment where every individual&apos;s uniqueness is valued, and
          hidden abilities are encouraged to flourish.
        </p>
        <div className="border-l-2 border-champagne/60 pl-4 sm:pl-5">
          <p className="font-display text-xl font-semibold leading-snug text-champagne sm:text-2xl lg:text-[1.45rem]">
            Find yourself with Actverse Academy.
            <span className="mt-0.5 block text-bone">
              Because it’s TIME TO SHINE.
            </span>
          </p>
        </div>
      </Reveal>
    </div>
  </div>
</section>

        {/* FOUNDER'S VISION */}
        <section className="border-y border-bone/10 bg-cherry-deep py-12 text-bone sm:py-16 md:py-16 lg:py-16">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal>
              {/* <Label n="02" t="Founder's Vision" tone="text-champagne/80" /> */}
              <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed text-bone/95 sm:mt-8 sm:text-2xl md:text-3xl md:leading-snug lg:text-3xl lg:leading-snug">
                &ldquo;My vision is to discover and nurture the next generation
                of stars—training aspiring actors, creating real opportunities,
                and helping their talent shine on screen. I believe a director’s
                responsibility extends beyond making films: it is to recognise
                potential, open doors, and shape the future of cinema by
                building a universe of skilled, confident performers.&rdquo;
              </blockquote>
              <div className="mt-7 flex items-center justify-center gap-3 sm:mt-9">
                <span className="h-px w-8 bg-champagne/40" aria-hidden />
                <p className="font-mono text-lg tracking-[0.2em] text-champagne uppercase sm:text-md">
                  Koushish Varade
                </p>
                <span className="h-px w-8 bg-champagne/40" aria-hidden />
              </div>
            </Reveal>
          </div>
        </section>

        {/* FACULTY SECTION (Dynamic from DB) */}
        <section className="bg-paper py-12 text-paper-foreground sm:py-14 md:py-14 lg:py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal className="max-w-full">
              {/* <Label n="03" t="The Mentors" tone="text-cherry" /> */}
              <h2 className="mt-3 text-3xl leading-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
                Guidance from the <span className="text-gold-deep">Industry</span>.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {team.map((member) => (
                <Reveal key={member.id} className="group flex flex-col">
                  <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-lg border border-border/60 bg-muted">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                          No Photo
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cherry">
                      {member.role}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {member.name}
                    </h3>
                    {member.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-paper-foreground/75 sm:text-base">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {(member.instagramUrl ||
                    member.facebookUrl ||
                    member.linkedinUrl) && (
                    <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-4">
                      {member.instagramUrl && (
                        <a
                          href={member.instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} on Instagram`}
                          className="text-paper-foreground/50 transition-colors hover:text-cherry"
                        >
                          <InstagramIcon className="h-5 w-5" />
                        </a>
                      )}
                      {member.facebookUrl && (
                        <a
                          href={member.facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} on Facebook`}
                          className="text-paper-foreground/50 transition-colors hover:text-cherry"
                        >
                          <FacebookIcon className="h-5 w-5" />
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="text-paper-foreground/50 transition-colors hover:text-cherry"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION & CONTACT SECTION */}
        <section className="bg-ink py-12 text-bone sm:py-20 md:py-24 lg:py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal>
              {/* <Label n="04" t="Visit Us" tone="text-champagne" /> */}
              <h2 className="mt-3 text-3xl leading-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
                Find your <em className="text-champagne">stage</em>.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-2 lg:gap-12">
              <Reveal>
                <div className="flex h-full flex-col justify-between space-y-6 rounded-xl border border-bone/15 bg-bone/[0.04] p-6 sm:space-y-8 sm:p-8 lg:p-10">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bone/10 text-champagne">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-bone sm:text-2xl">
                        Academy Location
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-bone/80 sm:text-base">
                        Bungalow No. 39,
                        <br />
                        35/2, D-Mart lane, Aram Nagar Part 2, Jeet Nagar,
Versova, Andheri West, 
                        <br />
                        Mumbai, Maharashtra 400061
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-bone/60 italic sm:text-sm">
                        Actverse Academy is situated in the heart of the Dream
                        City — Versova. Reaching the academy is convenient and
                        hassle-free via Mumbai’s local trains, metro, buses, and
                        cabs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-bone/10 pt-6 sm:pt-7">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bone/10 text-champagne">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-bone sm:text-2xl">
                        Phone &amp; WhatsApp
                      </h3>
                      <a
                        href="tel:+919004316169"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-bone/80 transition-colors hover:text-champagne sm:text-base"
                      >
                        +91 9004316169
                        <ArrowUpRight className="h-4 w-4 opacity-70" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-bone/10 pt-6 sm:pt-7">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bone/10 text-champagne">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-bone sm:text-2xl">
                        Email Admissions
                      </h3>
                      <a
                        href="mailto:info.actverse@gmail.com"
                        className="mt-1.5 inline-flex items-center gap-1.5 break-all text-sm text-bone/80 transition-colors hover:text-champagne sm:text-base"
                      >
                        info.actverse@gmail.com
                        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="h-[320px] w-full overflow-hidden rounded-xl border border-bone/15 bg-muted sm:h-[380px] lg:h-full lg:min-h-[440px]">
                <iframe
                  title="Actverse Academy Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15079.805178663884!2d72.80556105!3d19.13168865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b61ca018742d%3A0x6bba2236a54ec235!2sAram%20Nagar%20Part%202%2C%20Versova%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400061!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale transition-all duration-700 hover:grayscale-0"
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

// --- Custom SVG Brand Icons ---
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}