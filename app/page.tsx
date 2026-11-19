import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, MessageCircle, GraduationCap, Clapperboard, 
  Star, Users, Film, Mic, Music, Home, 
  MapPin
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { CourseList } from "@/components/course-list";
import { Reveal } from "@/components/ui/reveal";
import { WHATSAPP_URL, PHONE, EMAIL } from "@/lib/site-data";
import prisma from "@/lib/prisma";
import { EmotionsSlider } from "@/components/emotions-slider";
// Assets
import theatre from "@/assets/theatre.jpg";
import screen from "@/assets/screen.jpg";
import emotionsBanner from "@/assets/emotions-banner.jpg"; 
import emotionsBanner2 from "@/assets/emotions-banner2.jpeg"; 
import rehearsal from "@/assets/rehearsal.png";
import { connection } from "next/server";

export const instant = false;

export const metadata = {
  title: "Actverse Academy — Acting Classes for Stage & Screen in India",
  description: "Discover acting foundation programs, diplomas, workshops and dance training at Actverse Academy in Versova, Mumbai.",
  openGraph: {
    title: "Actverse Academy — Acting Classes for Stage & Screen in India",
    description: "Discover acting foundation programs, diplomas, workshops and dance training at Actverse Academy in Versova, Mumbai.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  }
};

const Label = ({ n, t, tone = "text-gold" }: { n: string; t: string; tone?: string }) => (
  <p className={`label-mono ${tone}`}>Scene {n} · {t}</p>
);

export default async function HomePage() {
  await connection();
  const [dbCourses, dbFaculty, dbFaqs] = await Promise.all([
    prisma.course.findMany({ 
      where: { isActive: true }, 
      orderBy: { createdAt: "asc" }
    }),
    prisma.faculty.findMany({ 
      orderBy: { order: "asc" },
      take: 3 
    }),
    prisma.faq.findMany({ 
      where: { isActive: true }, 
      orderBy: { order: "asc" } 
    }),
  ]);

  return (
    <div className="grain relative flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip pb-20 md:pb-0">
      <div className="label-mono border-b hairline bg-ink py-2.5 text-center text-champagne w-full">
        Today’s dreamers. Tomorrow’s superstars.
      </div>
      <SiteHeader />
      <main className="flex-1 overflow-x-hidden w-full">
        <Hero />
        <Tagline />
        <CallSheet courses={dbCourses} />
        <Stages />
        <Emotions />
        <WhyChooseUs />
        <div className="filmstrip w-full" aria-hidden />
        <Method />
        <Faculty team={dbFaculty} />
        <DemoForm />
        <FAQ faqs={dbFaqs} />
        <FinalCTA />
      </main>
      <SiteFooter />
      
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="fixed  bottom-24 right-4 z-40 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-gold-cta text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6 ">
        <MessageCircle className="h-6 w-6" />
      </a>
      
      <div className="fixed inset-x-0 bottom-0 z-40 grid w-full grid-cols-2 gap-2 border-t hairline bg-background p-3 md:hidden">
        <a href="/contact" className="btn-gold flex items-center justify-center text-center">Enquire Now</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline-gold flex items-center justify-center gap-2">
          <MessageCircle className="h-4 w-4" />WhatsApp
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" aria-label="Actverse Academy emotions banner" className="flex flex-col bg-ink">
      
      {/* MOBILE & TABLET: Taller aspect ratio with object-cover so faces are clear and not microscopic */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:hidden">
        <Image 
          src={emotionsBanner} 
          alt="The nine emotions of acting — Joy, Sadness, Anger, Fear, Surprise, Disgust, Trust, Anticipation and Love"
          fill
          priority 
          className="object-cover object-top" 
        />
      </div>

      {/* DESKTOP: Natural dimensions. Zero horizontal cropping. Scales perfectly without overflowing the screen height */}
      <div className="hidden md:flex relative w-full justify-center bg-ink">
        <Image 
          src={emotionsBanner} 
          alt="The nine emotions of acting — Joy, Sadness, Anger, Fear, Surprise, Disgust, Trust, Anticipation and Love"
          width={1600}
          height={596}
          priority 
          className="w-full h-auto max-h-[80vh] object-contain" 
        />
      </div>

      <div className="grid h-1.5 w-full grid-cols-9" aria-hidden>
        <span className="bg-joy-bright" /><span className="bg-sadness-bright" /><span className="bg-anger-bright" /><span className="bg-fear-bright" /><span className="bg-surprise-bright" /><span className="bg-disgust-bright" /><span className="bg-trust-bright" /><span className="bg-anticipation-bright" /><span className="bg-love-bright" />
      </div>
    </section>
  );
}

function Tagline() {
  return (
    <section id="tagline" aria-labelledby="tagline-h" className="scroll-mt-16 border-b border-border pt-10 pb-8 md:pt-10 md:pb-12">
      <div className="mx-auto max-w-7xl px-5">
        {/* <div className="flex items-center gap-4 "><span className="h-px w-10 bg-cherry" aria-hidden /><Label n="01" t="Time to shine"  tone="text-cherry" /></div> */}
        <div className="mt-6 grid gap-7 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
          <h1 id="tagline-h" className="text-2xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl">Today’s Dreamers.<br /><em className="text-cherry">Tomorrow’s Superstars.</em></h1>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">At Actverse Academy, we help young dreamers discover their talent, build confidence, and take their first steps towards cinema, acting, and creative expression.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="h-12 bg-cta text-primary-foreground hover:bg-cherry"><a href="#courses">Explore Courses <ArrowUpRight /></a></Button>
              <Button asChild variant="outline" className="h-12"><Link href="/about">About the academy</Link></Button>
            </div>
          </div>
        </div>
        <figure className="mt-8 md:mt-12">
          <Image src={rehearsal} alt="Illustrative acting rehearsal with performers exploring a scene and fellow actors observing" loading="lazy" width={1600} height={912} className="aspect-[4/3] w-full object-cover sm:aspect-[16/7]" />
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-xs text-muted-foreground"><span>Expression. Connection. Possibility.</span><span>Acting · Camera craft · Creative expression</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Emotions() {
  return (
    <section id="emotions" aria-labelledby="emo-h" className="w-full bg-paper py-10 text-paper-foreground md:py-10"
      style={{ "--border": "oklch(0.16 0.01 50 / 15%)", "--card": "var(--paper)" } as React.CSSProperties}>
      <Reveal className="mx-auto w-full max-w-7xl px-5">
        {/* <Label n="03" t="The actor's palette" tone="text-love" /> */}
        <h2 id="emo-h" className="w-full max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">Nine emotions. One <em className="!text-gold-deep">instrument</em> — you.</h2>
        <p className="mt-5 w-full max-w-xl text-base text-paper-foreground/70 sm:text-lg md:text-xl">
          Explore the emotions that bring characters to life — a palette of expression, connection and individuality.
        </p>
      </Reveal>
      <Reveal className="mx-auto mt-8 md:mt-12 w-full max-w-7xl px-5">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-paper-foreground/15 sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image 
            src={emotionsBanner2} 
            alt="The nine emotions of acting"
            fill
            className="object-cover object-top" 
          />
        </div>
      </Reveal>
      
      {/* Client Component handling the mobile slider & desktop grid logic */}
      <EmotionsSlider />
      
    </section>
  );
}

function Stages() {
  const items = [
    { k: "Theatre", img: theatre, alt: "Actors rehearsing on a wooden stage", d: "Breath, presence and the discipline of a live house. Learn to hold a room of three hundred people without a retake.", n: "A" },
    { k: "Screen", img: screen, alt: "Actress on a film set", d: "Film, OTT and ads. Learn to think in frames, hit marks and make the camera believe you.", n: "B" },
  ];
  return (
    <section aria-labelledby="stage-h" className="w-full py-10 md:py-12">
      <Reveal className="mx-auto w-full max-w-7xl px-5">
        {/* <Label n="04" t="Choose your stage" tone="text-trust" /> */}
        <h2 id="stage-h" className=" text-4xl leading-tight sm:text-5xl md:text-6xl">Two crafts. One <em className="!text-cherry">spotlight</em>.</h2>
      </Reveal>
      <div className="mt-8 md:mt-12 grid w-full grid-cols-1 md:grid-cols-2">
        {items.map((s) => (
          <Link key={s.k} href="/courses" className="group relative block aspect-square w-full overflow-hidden border-y hairline sm:aspect-[4/3] md:aspect-[4/5] md:border-x">
            <Image src={s.img} alt={s.alt} fill className="bw-to-color object-cover transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 w-full p-6 sm:p-8 md:p-12">
              <p className="label-mono text-gold">Roll {s.n}</p>
              <h3 className="mt-2 text-5xl uppercase tracking-tight text-bone sm:text-6xl md:text-7xl">{s.k}</h3>
              <p className="mt-3 w-full max-w-md text-base text-bone/90 sm:text-lg md:text-xl">{s.d}</p>
              
              {/* Upgraded Button: Distinct shape, border, and hover state so it's instantly recognized as a button */}
              <div className="mt-6 md:mt-8  inline-flex h-12 items-center justify-center gap-2 rounded-md border border-bone/30 bg-bone/10 px-6 font-medium text-bone backdrop-blur-sm transition-all group-hover:bg-bone/40 group-hover:border-cherry group-hover:text-white">
                Explore our courses <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    { icon: GraduationCap, title: "Career-Focused Courses", desc: "1 Month to 3 Years of Structured Acting Programs." },
    { icon: Clapperboard, title: "Live Camera Training", desc: "Practical Screen Acting & Camera Performance." },
    { icon: Star, title: "Big Stage Exposure", desc: "Showcase Your Talent & Build Stage Confidence." },
    { icon: Users, title: "Industry Expert Mentorship", desc: "Learn from Experienced Actors & Mentors." },
    { icon: Film, title: "Film & Production Exposure", desc: "Explore Real-World Filmmaking & Performance." },
    { icon: Mic, title: "Audition & Portfolio Guidance", desc: "Prepare for Auditions & Professional Presentations." },
    { icon: Music, title: "Acting + Dance Training", desc: "Enhance Expressions, Rhythm & Body Movement." },
    { icon: Home, title: "Accommodation Assistance", desc: "Support for Outstation Students Coming to Mumbai." },
  ];

  return (
    <section className="w-full bg-ink py-10 text-bone md:py-12">
      <Reveal className="mx-auto w-full max-w-7xl px-5">
        <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">Why Choose Actverse Academy?</h2>
        <p className="mt-3 text-lg md:text-xl italic text-bone/80">More Than Acting. A Complete Performer Development Experience.</p>
        
        <div className="mt-8 md:mt-10 rounded-2xl border border-border/40 bg-ink p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col">
                <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-amber-500" strokeWidth={1.5} />
                <h3 className="mt-3 md:mt-4 text-xl md:text-2xl font-semibold text-bone">{feature.title}</h3>
                <p className="mt-1 md:mt-2 text-base md:text-lg text-bone/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CallSheet({ courses }: { courses: any[] }) {
  return (
    <section id="courses" className="mx-auto w-full max-w-7xl px-5 py-10 md:py-12">
      {/* <Label n="02" t="Courses" tone="text-cherry" /> */}
      <h2 className="mb-6 md:mb-6 text-4xl leading-tight sm:text-5xl md:text-6xl">Our <em className="!text-cherry">Courses</em>.</h2>
      <CourseList courses={courses} />
    </section>
  );
}


function Method() {
  const steps = [
    ["Pre-production", "Foundation", "Voice, breath, movement and text. We build the instrument before we play it.", "var(--sadness-bright)"],
    ["Rehearsal", "Craft", "Scene work, improvisation and character study with feedback after every run.", "var(--trust-bright)"],
    ["Shoot", "On-camera", "Build confidence in front of the camera and explore the language of screen performance.", "var(--anticipation-bright)"],
    ["Spotlight", "Confidence", "Prepare for auditions and develop the courage to take your next step.", "var(--joy-bright)"],
  ] as const;
  return (
    <section aria-labelledby="method-h" className="w-full bg-ink py-10 text-bone md:py-12">
      <div className="mx-auto w-full max-w-7xl px-5">
        <Reveal>
          {/* <Label n="05" t="The Method" tone="text-surprise-bright" /> */}
          <h2 id="method-h" className=" text-4xl leading-tight sm:text-5xl md:text-6xl">From read-through to <em>premiere</em>.</h2>
        </Reveal>
        <ol className="relative mt-10 md:mt-14 grid w-full gap-8 md:grid-cols-4 md:gap-6">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px w-full bg-gold-cta/40 md:block" aria-hidden />
          {steps.map(([t, s, d, c], i) => (
            <Reveal key={t}>
              <li className="relative w-full border-l hairline pl-6 md:border-l-0 md:pl-0">
                <span className="absolute -left-[7px] top-0 h-3.5 w-3.5 rotate-45 md:left-0" style={{ background: c }} />
                <p className="label-mono pt-0 text-champagne/70 md:pt-8 md:text-sm">Reel 0{i + 1} · {s}</p>
                <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl">{t}</h3>
                <p className="mt-2 md:mt-3 text-base text-bone/75 sm:text-lg md:text-xl">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faculty({ team }: { team: any[] }) {
  return (
    <section id="faculty" className="mx-auto w-full max-w-7xl px-5 py-10 md:py-12">
      {/* <Label n="06" t="Founders & faculty" tone="text-fear" /> */}
      <h2 className=" text-4xl leading-tight sm:text-5xl md:text-6xl">People who nurture <em className="!text-cherry">talent</em>.</h2>
      
      <div className="mt-8 md:mt-12 grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {team.map(p => (
          <Reveal key={p.id}>
            <div className="group flex w-full flex-col">
              <div className="relative mb-4 md:mb-5 aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
                {p.image ? (
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-sm uppercase tracking-widest">No Photo</span>
                  </div>
                )}
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-cherry">{p.role}</p>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl">{p.name}</h3>
            </div>
          </Reveal>
        ))}
      </div>
      
      <Button asChild variant="outline" className="mt-8 md:mt-12 h-12 w-full md:text-lg border-border text-foreground hover:bg-cherry hover:text-white sm:w-auto">
        <Link href="/about">Meet our full team <ArrowUpRight className="ml-2 h-4 w-4 md:h-5 md:w-5" /></Link>
      </Button>
    </section>
  );
}

function DemoForm() {
  return (
    <section id="demo" className="w-full bg-card py-10 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-5">
        {/* <Label n="10" t="Admissions" tone="text-anger" /> */}
        <h2 className="text-4xl leading-tight sm:text-5xl md:text-6xl">Let’s talk about your <em className="text-cherry">dream</em>.</h2>
        <p className="mt-4 md:mt-5 w-full max-w-xl text-base text-muted-foreground sm:text-lg md:text-xl">Ask our admissions team about courses, schedules and special offers.</p>
        <div className="mt-6 md:mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 w-full md:text-lg bg-cta text-primary-foreground hover:bg-cherry sm:w-auto">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" />WhatsApp admissions</a>
          </Button>
          <Button asChild variant="outline" className="h-12 w-full md:text-lg border-border sm:w-auto">
            <a href={`tel:+91${PHONE}`}>Call +91 {PHONE}</a>
          </Button>
        </div>
        <a className="mt-6 block w-full break-all text-sm md:text-base font-semibold text-cherry transition-colors hover:text-cherry-deep" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </section>
  );
}

function FAQ({ faqs }: { faqs: any[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-h" className="w-full bg-paper py-10 text-paper-foreground md:py-12">
      <div className="mx-auto w-full max-w-4xl px-5">
        <Reveal>
          {/* <Label n="12" t="Fees & FAQ" tone="text-sadness" /> */}
          <h2 id="faq-h" className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">Questions from the <em className="!text-gold-deep">wings</em>.</h2>
        </Reveal>
        <Accordion type="single" collapsible className="mt-8 md:mt-10 w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id} className="border-b border-paper-foreground/15">
              <AccordionTrigger className="py-5 md:py-6 text-left font-display text-xl hover:text-gold-cta-deep hover:no-underline sm:text-2xl md:text-3xl">{f.question}</AccordionTrigger>
              <AccordionContent className="whitespace-pre-wrap text-base text-paper-foreground/70 sm:text-lg md:text-xl">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
 
function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-16 text-center text-bone md:py-32">
      <div className="filmstrip absolute inset-x-0 top-0 w-full" aria-hidden />
      <Reveal className="mx-auto w-full max-w-4xl px-5">
        {/* <p className="label-mono text-gold">Final scene</p> */}
        <h2 className="mt-4 md:mt-6 text-5xl leading-[0.95] sm:text-7xl md:text-8xl">Lights. Camera. <em>Enrol.</em></h2>
        <div className="mt-8 md:mt-10 flex w-full flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className="btn-gold flex w-full items-center justify-center text-center sm:w-auto md:text-lg">Enquire with Admissions</a>
          <Button asChild variant="outline" className="h-12 w-full md:text-lg border-bone/50 bg-transparent text-bone hover:bg-cherry hover:border-cherry hover:text-bone sm:w-auto">
            <Link href="/courses">See all courses</Link>
          </Button>
        </div>
      </Reveal>
      <div className="filmstrip absolute inset-x-0 bottom-0 w-full" aria-hidden />
    </section>
  );
}