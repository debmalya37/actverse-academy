import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  GraduationCap,
  Star,
  Home,
  MapPin,
  Check,
  MessageCircle,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { AdmissionsNotes } from "@/components/admissions-notes";
import { danceForms, formatFee, PHONE } from "@/lib/site-data";
import { GoKwikButton } from "@/components/gokwik-button";
import prisma from "@/lib/prisma";

export const instant = false;

const HIGHLIGHTS = [
  { icon: GraduationCap, label: "Valuable Course" },
  { icon: Star, label: "Big Stage" },
  { icon: Home, label: "Easy Accommodation" },
  { icon: MapPin, label: "Prime Location" },
] as const;

const STUDENT_BENEFITS = [
  "Personality Development & Communication",
  "Confidence Building & Public Speaking",
  "Practical Workshops & Group Activities",
  "Certificate of Course Completion",
  "Career Guidance & Industry Insights",
] as const;

// Generate dynamic SEO metadata based on the database
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug, isActive: true },
  });

  if (!course) {
    return { title: "Course not found — Actverse Academy" };
  }

  const description =
    course.seoDescription ||
    `${course.name}: ${course.duration}, full-payment fee ${formatFee(course.fee)} plus applicable taxes. Enquire with Actverse Academy admissions.`;
  const title = course.seoTitle || `${course.name} — Actverse Academy`;

  return {
    title,
    description,
    keywords: course.seoKeywords,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug, isActive: true },
    include: {
      syllabusModules: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="bg-cherry py-12 text-bone md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link
            href="/courses"
            className="inline-flex items-center text-[clamp(0.875rem,1vw,1rem)] font-medium tracking-wide text-champagne/90 transition-colors hover:text-bone"
          >
            ← All courses
          </Link>
          <p className="label-mono mt-6 text-champagne md:mt-8">
            {course.category} · Actverse Academy
          </p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.1] tracking-tight md:mt-4">
            {course.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-bone/90 md:mt-6">
            {course.blurb}
          </p>
        </div>
      </section>

      {/* Minimalist Highlights Strip */}
      <section
        aria-label="Course highlights"
        className="border-b border-border bg-paper/50 text-paper-foreground"
      >
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-8 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon
                  className="h-5 w-5 shrink-0 text-cherry lg:h-6 lg:w-6"
                  strokeWidth={1.75}
                />
                <span className="text-[clamp(0.875rem,1.1vw,1.0625rem)] font-medium tracking-tight text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-20">
          {/* Left Column: Details, Curriculum & Benefits */}
          <div className="space-y-12 md:space-y-16">
            {/* Duration & Fee Bar */}
            <div className="grid grid-cols-2 gap-6 border-y border-border py-6 sm:gap-10 md:py-9">
              <div>
                <p className="label-mono text-cherry">Duration</p>
                <p className="mt-2 font-display text-[clamp(1.25rem,2.2vw,2.125rem)] font-semibold">
                  {course.duration}
                </p>
              </div>
              <div className="border-l border-border pl-6 sm:pl-10">
                <p className="label-mono text-cherry">Full-payment fee</p>
                <p className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2.75rem)] font-semibold">
                  {formatFee(course.fee)}
                </p>
                <p className="mt-1.5 text-[clamp(0.75rem,0.9vw,0.875rem)] text-muted-foreground">
                  Taxes applicable as per govt. norms.
                </p>
              </div>
            </div>

            {/* About the Course */}
            {course.description && (
              <div>
                <h2 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold tracking-tight">
                  About the Course
                </h2>
                <div className="mt-4 max-w-prose whitespace-pre-wrap text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed text-muted-foreground md:mt-5 md:leading-8">
                  {course.description}
                </div>
              </div>
            )}

            {/* Dynamic Syllabus Rendering */}
            {course.syllabusModules.length > 0 && (
              <div className="border-t border-border pt-10 md:pt-14">
                <p className="label-mono text-cherry">Syllabus</p>
                <h2 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold tracking-tight">
                  Curriculum
                </h2>
                <div className="mt-6 space-y-7 md:mt-9 md:space-y-9">
                  {course.syllabusModules.map((module, index) => (
                    <div
                      key={module.id}
                      className="border-l border-cherry/40 pl-4 sm:pl-6 lg:pl-7"
                    >
                      <p className="label-mono text-muted-foreground">
                        Module {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-[clamp(1.125rem,1.5vw,1.5rem)] font-semibold text-foreground">
                        {module.title}
                      </h3>
                      <p className="mt-2 text-[clamp(0.95rem,1.1vw,1.0625rem)] leading-relaxed text-muted-foreground">
                        {module.description}
                      </p>
                      {module.practicalActivities && (
                        <p className="mt-3 rounded-md border border-border/60 bg-paper/60 px-4 py-3 text-[clamp(0.875rem,1vw,0.95rem)] leading-relaxed text-paper-foreground/85">
                          <span className="font-semibold text-foreground">
                            Practical:
                          </span>{" "}
                          {module.practicalActivities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Student Benefits */}
            <div className="border-t border-border pt-10 md:pt-14">
              <p className="label-mono text-cherry">
                Included with every batch
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold tracking-tight">
                Additional Student Benefits
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:mt-8 md:gap-y-5">
                {STUDENT_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cherry/10 text-cherry">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[clamp(0.95rem,1.1vw,1.0625rem)] leading-relaxed text-foreground/90">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Admissions CTA */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-paper p-6 text-paper-foreground sm:p-8 lg:p-10">
              <p className="label-mono text-cherry">Admissions</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-semibold">
                Your next step
              </h2>
              <p className="mt-3 text-[clamp(0.95rem,1.1vw,1.0625rem)] leading-relaxed text-muted-foreground">
                Speak with our admissions team about the curriculum, upcoming
                batches, and available offers for this program.
              </p>

              {course.category === "DANCE" && (
                <div className="mt-6 border-t border-border/70 pt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    Dance forms covered
                  </h3>
                  <p className="mt-2 text-[clamp(0.875rem,1vw,0.95rem)] leading-relaxed text-muted-foreground">
                    {danceForms.join(" · ")}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 lg:mt-8 lg:gap-4">
                {/* {course.fee && (
                  <GoKwikButton courseName={course.name} fee={course.fee} />
                )} */}

                <Button
                  asChild
                  className="h-12 w-full bg-cta text-base text-primary-foreground hover:bg-cherry lg:h-14"
                >
                  <Link href={`/contact?course=${encodeURIComponent(course.name)}`}>
                    Enquire Now <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-full text-base lg:h-14"
                >
                  <a
                    href={`https://wa.me/91${PHONE}?text=${encodeURIComponent(
                      "Hi Actverse! I’d like to enquire about " +
                        course.name +
                        "."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5 text-cherry" />
                    Enquire on WhatsApp
                  </a>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-11 w-full text-base text-muted-foreground hover:text-cherry"
                >
                  <a href={`tel:+91${PHONE}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call +91 {PHONE}
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Admissions Notes */}
        <div className="mt-14 border-t border-border pt-10 md:mt-20 md:pt-14">
          <AdmissionsNotes />
        </div>
      </section>
    </SiteShell>
  );
}