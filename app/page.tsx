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
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-cta text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6">
        <MessageCircle className="h-6 w-6" />
      </a>
      
      <div className="fixed inset-x-0 bottom-0 z-40 grid w-full grid-cols-2 gap-2 border-t hairline bg-background p-3 md:hidden">
        <a href="#demo" className="btn-gold flex items-center justify-center text-center">Enquire Now</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline-gold flex items-center justify-center gap-2">
          <MessageCircle className="h-4 w-4" />WhatsApp
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" aria-label="Actverse Academy emotions banner" className="overflow-hidden bg-cherry-deep">
      <Image src={emotionsBanner} alt="The nine emotions of acting — Joy, Sadness, Anger, Fear, Surprise, Disgust, Trust, Anticipation and Love — performed by Actverse actors"
        width={1600} height={596} fetchPriority="high" className="mx-auto block h-auto max-h-[70svh] w-full object-contain" />
      <div className="grid h-1.5 grid-cols-9" aria-hidden>
        <span className="bg-joy-bright" /><span className="bg-sadness-bright" /><span className="bg-anger-bright" /><span className="bg-fear-bright" /><span className="bg-surprise-bright" /><span className="bg-disgust-bright" /><span className="bg-trust-bright" /><span className="bg-anticipation-bright" /><span className="bg-love-bright" />
      </div>
    </section>
  );
}

function Tagline() {
  return (
    <section id="tagline" aria-labelledby="tagline-h" className="scroll-mt-24 border-b border-border pt-12 pb-8 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center gap-4 "><span className="h-px w-10 bg-cherry" aria-hidden /><Label n="01" t="Time to shine"  tone="text-cherry" /></div>
        <div className="mt-6 grid gap-7 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
          <h1 id="tagline-h" className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl">Today’s dreamers.<br /><em className="text-cherry">Tomorrow’s<br className="hidden xl:block" /> superstars.</em></h1>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">At Actverse Academy, we help young dreamers discover their talent, build confidence, and take their first steps towards cinema, acting, and creative expression.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="h-12 bg-cta text-primary-foreground hover:bg-cherry"><a href="#courses">Explore Courses <ArrowUpRight /></a></Button>
              <Button asChild variant="outline" className="h-12"><Link href="/about">About the academy</Link></Button>
            </div>
          </div>
        </div>
        <figure className="mt-9 md:mt-12">
          <Image src={rehearsal} alt="Illustrative acting rehearsal with performers exploring a scene and fellow actors observing" loading="lazy" width={1600} height={912} className="aspect-4/3 w-full object-cover sm:aspect-16/7" />
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-xs text-muted-foreground"><span>Expression. Connection. Possibility.</span><span>Acting · Camera craft · Creative expression</span></figcaption>
        </figure>
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-5 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-cherry" />Versova, Mumbai</span>
          <nav aria-label="Homepage sections" className="flex flex-wrap gap-6 font-medium text-cherry">
            <a href="#courses" className="hover:underline">Courses & fees</a>
            <a href="#faculty" className="hover:underline">Our team</a>
            <a href="#demo" className="hover:underline">Admissions</a>
          </nav>
        </div>
      </div>
    </section>
  );
}

const EMOTIONS = [
  { name: "Joy", words: "Happiness · Energy · Positivity", c: "var(--joy)" },
  { name: "Sadness", words: "Emotion · Depth · Humanity", c: "var(--sadness)" },
  { name: "Anger", words: "Intensity · Passion · Power", c: "var(--anger)" },
  { name: "Fear", words: "Vulnerability · Realism · Suspense", c: "var(--fear)" },
  { name: "Surprise", words: "Curiosity · Awareness · Drama", c: "var(--surprise)" },
  { name: "Disgust", words: "Judgement · Boundaries · Reality", c: "var(--disgust)" },
  { name: "Trust", words: "Connection · Warmth · Relationships", c: "var(--trust)" },
  { name: "Anticipation", words: "Focus · Excitement · Preparation", c: "var(--anticipation)" },
  { name: "Love", words: "Compassion · Empathy · Belonging", c: "var(--love)" },
] as const;

function Emotions() {
  return (
    <section id="emotions" aria-labelledby="emo-h" className="w-full bg-paper py-20 text-paper-foreground md:py-28"
      style={{ "--border": "oklch(0.16 0.01 50 / 15%)", "--card": "var(--paper)" } as React.CSSProperties}>
      <Reveal className="mx-auto w-full max-w-7xl px-5">
        <Label n="03" t="The actor's palette" tone="text-love" />
        <h2 id="emo-h" className="mt-4 w-full max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">Nine emotions. One <em className="!text-gold-deep">instrument</em> — you.</h2>
        <p className="mt-5 w-full max-w-xl text-base text-paper-foreground/70 sm:text-lg">
          Explore the emotions that bring characters to life — a palette of expression, connection and individuality.
        </p>
      </Reveal>
      <Reveal className="mx-auto mt-12 w-full max-w-7xl px-5">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-paper-foreground/15 sm:aspect-[16/9] lg:aspect-[21/9]">
  <Image 
    src={emotionsBanner2} 
    alt="The nine emotions of acting"
    fill
    className="object-cover object-top" 
  />
</div>
      </Reveal>
      <div className="mx-auto mt-6 grid w-full max-w-7xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {EMOTIONS.map((e, i) => (
          <Reveal key={e.name}>
            <div className="emotion-card w-full p-6" style={{ "--e": e.c, background: `color-mix(in oklab, ${e.c} 7%, var(--paper))` } as React.CSSProperties}>
              <div className="flex items-baseline justify-between">
                <span className="label-mono" style={{ color: e.c }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="h-2.5 w-2.5 rotate-45" style={{ background: e.c }} aria-hidden />
              </div>
              <h3 className="mt-4 text-3xl" style={{ color: e.c }}>{e.name}</h3>
              <p className="label-mono mt-3 break-words" style={{ color: `color-mix(in oklab, ${e.c} 70%, var(--paper-foreground))` }}>{e.words}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stages() {
  const items = [
    { k: "Theatre", img: theatre, alt: "Actors rehearsing on a wooden stage", d: "Breath, presence and the discipline of a live house. Learn to hold a room of three hundred people without a retake.", n: "A" },
    { k: "Screen", img: screen, alt: "Actress on a film set", d: "Film, OTT and ads. Learn to think in frames, hit marks and make the camera believe you.", n: "B" },
  ];
  return (
    <section aria-labelledby="stage-h" className="w-full py-20 md:py-28">
      <Reveal className="mx-auto w-full max-w-7xl px-5">
        <Label n="04" t="Choose your stage" tone="text-trust" />
        <h2 id="stage-h" className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">Two crafts. One <em className="!text-cherry">spotlight</em>.</h2>
      </Reveal>
      <div className="mt-12 grid w-full grid-cols-1 md:grid-cols-2">
        {items.map((s) => (
          <Link key={s.k} href="/courses" className="group relative block aspect-square w-full overflow-hidden border-y hairline sm:aspect-[4/3] md:aspect-[4/5] md:border-x">
            <Image src={s.img} alt={s.alt} fill className="bw-to-color object-cover transition-all duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 w-full p-6 sm:p-8 md:p-10">
              <p className="label-mono text-gold">Roll {s.n}</p>
              <h3 className="mt-2 text-5xl uppercase tracking-tight text-bone sm:text-6xl md:text-7xl">{s.k}</h3>
              <p className="mt-3 w-full max-w-md text-base text-bone/80 sm:text-lg">{s.d}</p>
              <span className="label-mono mt-5 inline-flex items-center gap-2 text-champagne">
                Explore our courses <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
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
    <section className="w-full bg-ink py-20 text-bone md:py-28">
      <Reveal className="mx-auto w-full max-w-7xl px-5">
        <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">Why Choose Actverse Academy?</h2>
        <p className="mt-2 text-lg italic text-bone/80">More Than Acting. A Complete Performer Development Experience.</p>
        
        <div className="mt-10 rounded-2xl border border-border/40 bg-ink p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col">
                <feature.icon className="h-7 w-7 text-amber-500" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl font-semibold text-bone">{feature.title}</h3>
                <p className="mt-2 text-base text-bone/70">{feature.desc}</p>
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
    <section id="courses" className="mx-auto w-full max-w-7xl px-5 py-20 md:py-28">
      <Label n="02" t="Courses" tone="text-cherry" />
      <h2 className="mb-10 mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">Our <em className="!text-cherry">Courses</em>.</h2>
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
    <section aria-labelledby="method-h" className="w-full bg-ink py-20 text-bone md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5">
        <Reveal>
          <Label n="05" t="The Method" tone="text-surprise-bright" />
          <h2 id="method-h" className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">From read-through to <em>premiere</em>.</h2>
        </Reveal>
        <ol className="relative mt-14 grid w-full gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px w-full bg-gold-cta/40 md:block" aria-hidden />
          {steps.map(([t, s, d, c], i) => (
            <Reveal key={t}>
              <li className="relative w-full border-l hairline pl-6 md:border-l-0 md:pl-0">
                <span className="absolute -left-[7px] top-0 h-3.5 w-3.5 rotate-45 md:left-0" style={{ background: c }} />
                <p className="label-mono pt-0 text-champagne/70 md:pt-8">Reel 0{i + 1} · {s}</p>
                <h3 className="mt-2 text-2xl sm:text-3xl">{t}</h3>
                <p className="mt-3 text-base text-bone/75 sm:text-lg">{d}</p>
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
    <section id="faculty" className="mx-auto w-full max-w-7xl px-5 py-20 md:py-28">
      <Label n="06" t="Founders & faculty" tone="text-fear" />
      <h2 className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">People who nurture <em className="!text-cherry">talent</em>.</h2>
      
      <div className="mt-12 grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {team.map(p => (
          <Reveal key={p.id}>
            <div className="group flex w-full flex-col">
              <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
                {p.image ? (
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-sm uppercase tracking-widest">No Photo</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-cherry">{p.role}</p>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl">{p.name}</h3>
            </div>
          </Reveal>
        ))}
      </div>
      
      <Button asChild variant="outline" className="mt-12 h-12 w-full border-border text-foreground hover:bg-cherry hover:text-white sm:w-auto">
        <Link href="/about">Meet our full team <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </section>
  );
}

function DemoForm() {
  return (
    <section id="demo" className="w-full bg-card py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5">
        <Label n="10" t="Admissions" tone="text-anger" />
        <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Let’s talk about your <em className="text-cherry">dream</em>.</h2>
        <p className="mt-5 w-full max-w-xl text-base text-muted-foreground sm:text-lg">Ask our admissions team about courses, schedules and special offers.</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 w-full bg-cta text-primary-foreground hover:bg-cherry sm:w-auto">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" />WhatsApp admissions</a>
          </Button>
          <Button asChild variant="outline" className="h-12 w-full border-border sm:w-auto">
            <a href={`tel:+91${PHONE}`}>Call +91 {PHONE}</a>
          </Button>
        </div>
        <a className="mt-6 block w-full break-all text-sm font-semibold text-cherry transition-colors hover:text-cherry-deep" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </section>
  );
}

function FAQ({ faqs }: { faqs: any[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-h" className="w-full bg-paper py-20 text-paper-foreground md:py-28">
      <div className="mx-auto w-full max-w-4xl px-5">
        <Reveal>
          <Label n="12" t="Fees & FAQ" tone="text-sadness" />
          <h2 id="faq-h" className="mt-4 text-4xl leading-tight sm:text-5xl md:text-6xl">Questions from the <em className="!text-gold-deep">wings</em>.</h2>
        </Reveal>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id} className="border-b border-paper-foreground/15">
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:text-gold-cta-deep hover:no-underline sm:text-2xl">{f.question}</AccordionTrigger>
              <AccordionContent className="whitespace-pre-wrap text-base text-paper-foreground/70 sm:text-lg">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
 
function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-28 text-center text-bone md:py-40">
      <div className="filmstrip absolute inset-x-0 top-0 w-full" aria-hidden />
      <Reveal className="mx-auto w-full max-w-4xl px-5">
        <p className="label-mono text-gold">Final scene</p>
        <h2 className="mt-6 text-5xl leading-[0.95] sm:text-7xl md:text-8xl">Lights. Camera. <em>Enrol.</em></h2>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className="btn-gold flex w-full items-center justify-center text-center sm:w-auto">Enquire with Admissions</a>
          <Button asChild variant="outline" className="h-12 w-full border-bone/50 bg-transparent text-bone hover:bg-cherry hover:border-cherry hover:text-bone sm:w-auto">
            <Link href="/courses">See all courses</Link>
          </Button>
        </div>
      </Reveal>
      <div className="filmstrip absolute inset-x-0 bottom-0 w-full" aria-hidden />
    </section>
  );
}