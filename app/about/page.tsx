import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { Reveal } from "@/components/ui/reveal";
import prisma from "@/lib/prisma";
import { connection } from "next/server";
export const instant = false;
export const metadata = {
  title: "About Us | Actverse Academy",
  description: "Discover the vision behind Actverse Academy, meet our expert faculty, and learn how we nurture the next generation of superstars in Mumbai.",
};

const Label = ({ n, t, tone = "text-gold" }: { n: string; t: string; tone?: string }) => (
  <p className={`label-mono ${tone}`}>Scene {n} · {t}</p>
);

export default async function AboutPage() {
  await connection();
  // Fetch active faculty from the database ordered by their assigned sequence
  const team = await prisma.faculty.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" }
  });

  return (
    // 1. Added max-w-[100vw] and flex layout to lock the viewport width
    <div className="grain relative flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
      <SiteHeader />
      
      {/* 2. Added overflow-x-hidden to main to trap Reveal animations */}
      <main className="flex-1 overflow-x-hidden">
        {/* HERO SECTION - Bio 1 & 2 */}
        <section className="relative bg-ink py-20 text-bone md:py-32 md:pt-40">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal>
              <Label n="01" t="Our Philosophy" tone="text-champagne" />
              <h1 className="mt-6 text-5xl leading-tight sm:text-6xl md:text-8xl">
                ITS TIME TO SHINE
<br /><em className="text-6xl text-amber-200"> WITH ACTVERSE ACADEMY</em>
              </h1>
            </Reveal>

            <div className="mt-16 grid gap-10 border-t hairline pt-12 md:grid-cols-2 md:gap-20">
              <Reveal>
                <p className="text-lg leading-relaxed text-bone/80 md:text-xl">
                  Every superstar begins with a dream. Every award-winning performance starts with a first step. 
                  At <strong className="text-bone">Actverse Academy</strong>, we help young dreamers discover their talent, 
                  build confidence, and take their first steps towards the exciting world of cinema, acting, and creative expression.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-bone/80 md:text-xl">
                  For aspiring actors, we provide a space to learn the craft, explore characters, experience the camera, 
                  and master the art of performance. For students discovering their strengths, we nurture creativity, 
                  communication, self-awareness, and confidence.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-lg leading-relaxed text-bone/80 md:text-xl">
                  From mastering the camera and bringing characters to life to preparing for auditions and owning the spotlight, 
                  we nurture the skills, creativity, and courage that help talent grow. We create an environment where every 
                  individual's uniqueness is valued, and hidden abilities are encouraged to flourish.
                </p>
                <p className="mt-8 font-display text-2xl text-cherry md:text-3xl">
                  Find yourself with Actverse Academy. <br className="hidden md:block" />Because it’s TIME TO SHINE.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOUNDER's VISION */}
        <section className="bg-cherry-deep py-20 text-bone md:py-28">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <Reveal>
              <Label n="02" t="Founder's Vision" tone="text-champagne/70" />
              <blockquote className="mt-8 font-display text-2xl leading-snug md:text-3xl md:leading-tight">
                "My vision is to discover and nurture the next generation of stars—training aspiring actors, creating real opportunities, and helping their talent shine on screen. I believe a director’s responsibility extends beyond making films: it is to recognise potential, open doors, and shape the future of cinema by building a universe of skilled, confident performers."
              </blockquote>
              <p className="mt-8 font-mono text-sm tracking-widest text-gold-cta uppercase">
                — Koushish Varade
              </p>
            </Reveal>
          </div>
        </section>

        {/* FACULTY SECTION (Dynamic from DB) */}
        <section className="bg-paper py-20 text-paper-foreground md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal>
              <Label n="03" t="The Mentors" tone="text-cherry" />
              <h2 className="mt-4 text-4xl md:text-6xl">Guidance from the <em className="!text-gold-deep">industry</em>.</h2>
            </Reveal>

            <div className="mt-16 grid gap-y-16 md:grid-cols-3 md:gap-x-12 lg:gap-x-20">
              {team.map((member) => (
                <Reveal key={member.id} className="flex flex-col">
                  <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-md bg-muted md:aspect-square">
                    {member.image ? (
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200">
                        <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold uppercase tracking-wider text-cherry">{member.role}</p>
                    <h3 className="mt-2 font-display text-3xl md:text-4xl">{member.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-paper-foreground/80">
                      {member.bio}
                    </p>
                  </div>
                  {/* Social Links (if any exist in the DB) */}
                  {(member.instagramUrl || member.facebookUrl || member.linkedinUrl) && (
                    <div className="mt-6 flex gap-4 border-t border-border/50 pt-4">
                      {member.instagramUrl && (
                        <a href={member.instagramUrl} target="_blank" rel="noreferrer" className="text-paper-foreground/50 hover:text-cherry transition-colors">
                          <InstagramIcon className="h-5 w-5" />
                        </a>
                      )}
                      {member.facebookUrl && (
                        <a href={member.facebookUrl} target="_blank" rel="noreferrer" className="text-paper-foreground/50 hover:text-cherry transition-colors">
                          <FacebookIcon className="h-5 w-5" />
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="text-paper-foreground/50 hover:text-cherry transition-colors">
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
        <section className="bg-ink py-20 text-bone md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal>
              <Label n="04" t="Visit Us" tone="text-champagne" />
              <h2 className="mt-4 text-4xl md:text-6xl">Find your stage.</h2>
            </Reveal>

            <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-20">
              <Reveal>
                <div className="flex flex-col space-y-8 rounded-lg border border-bone/10 bg-bone/5 p-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-6 w-6 text-gold-cta shrink-0" />
                    <div>
                      <h4 className="font-display text-2xl text-bone">Academy Location</h4>
                      <p className="mt-2 text-bone/70 leading-relaxed">
                        Bunglow number 39, Near Mukesh Chhabra Casting,<br />
                        Aram Nagar 2, Versova, Andheri West,<br />
                        Mumbai 400061
                      </p>
                      <p className="mt-4 text-sm text-bone/50 italic">
                        Actverse Academy is situated in the heart of the Dream City — Versova. 
                        Reaching the academy is convenient and hassle-free via Mumbai’s local trains, metro, buses, and cabs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-bone/10 pt-8">
                    <Phone className="mt-1 h-6 w-6 text-gold-cta shrink-0" />
                    <div>
                      <h4 className="font-display text-2xl text-bone">Phone & WhatsApp</h4>
                      <a href="tel:+919004316169" className="mt-2 block text-bone/70 hover:text-cherry transition-colors">
                        +91 9004316169
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-bone/10 pt-8">
                    <Mail className="mt-1 h-6 w-6 text-gold-cta shrink-0" />
                    <div>
                      <h4 className="font-display text-2xl text-bone">Email Admissions</h4>
                      <a href="mailto:actverseacademy@gmail.com" className="mt-2 block text-bone/70 hover:text-cherry transition-colors break-all">
                        actverseacademy@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="h-full min-h-[400px] w-full overflow-hidden rounded-lg bg-muted">
                {/* Google Maps Embed pointing exactly to Aram Nagar Part 2, Versova */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15079.805178663884!2d72.80556105!3d19.13168865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b61ca018742d%3A0x6bba2236a54ec235!2sAram%20Nagar%20Part%202%2C%20Versova%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400061!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}