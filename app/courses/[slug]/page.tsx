import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { AdmissionsNotes } from "@/components/admissions-notes";
import { danceForms, formatFee, PHONE } from "@/lib/site-data";
import { GoKwikButton } from "@/components/gokwik-button";
import prisma from "@/lib/prisma";
export const instant = false;
// Generate dynamic SEO metadata based on the database
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ 
    where: { slug, isActive: true } 
  });
  
  if (!course) {
    return { title: "Course not found — Actverse Academy" };
  }

  const description = course.seoDescription || `${course.name}: ${course.duration}, full-payment fee ${formatFee(course.fee)} plus applicable taxes. Enquire with Actverse Academy admissions.`;
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
    }
  };
}

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch course and order the attached syllabus modules
  const course = await prisma.course.findUnique({
    where: { slug, isActive: true },
    include: {
      syllabusModules: {
        orderBy: { order: 'asc' }
      }
    }
  });
  
  if (!course) {
    notFound(); 
  }

  return (
    <SiteShell>
      <section className="bg-cherry py-16 text-bone md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Link href="/courses" className="text-sm text-champagne">← All courses</Link>
          <p className="label-mono mt-8 text-champagne">{course.category} / Actverse Academy</p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl">{course.name}</h1>
          <p className="mt-6 max-w-2xl text-lg text-bone/90">{course.blurb}</p>
        </div>
      </section>
      
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="mb-12">
              <p className="label-mono text-cherry">Duration</p>
              <p className="mt-3 font-display text-3xl font-semibold">{course.duration}</p>
              
              <p className="label-mono mt-8 text-cherry">Full-payment fee</p>
              <p className="mt-3 font-display text-4xl font-semibold">{formatFee(course.fee)}</p>
              <p className="mt-3 text-sm text-muted-foreground">Taxes applicable as per government norms.</p>
            </div>

            {course.description && (
              <div className="mb-12">
                <h2 className="text-2xl mb-4 font-display font-bold">About the Course</h2>
                <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {course.description}
                </div>
              </div>
            )}

            {/* Dynamic Syllabus Rendering */}
            {course.syllabusModules.length > 0 && (
              <div>
                <h2 className="text-2xl mb-6 font-display font-bold">Curriculum</h2>
                <div className="space-y-6">
                  {course.syllabusModules.map((module) => (
                    <div key={module.id} className="border-l-2 border-cherry pl-6 py-2">
                      <h3 className="text-xl font-bold text-cherry-deep mb-2">{module.title}</h3>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{module.description}</p>
                      {module.practicalActivities && (
                        <p className="text-sm bg-gray-50 p-3 rounded text-gray-700">
                          <strong className="text-gray-900">Practical:</strong> {module.practicalActivities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-24 bg-paper p-8 rounded-xl border border-paper-foreground/10">
              <h2 className="text-3xl">Your next step</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">Speak with our admissions team about the curriculum, upcoming batches and available offers for this program.</p>
              
              {course.category === "DANCE" && (
                <div className="mt-6">
                  <h3 className="text-xl">Choose your dance form</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{danceForms.join(" · ")}</p>
                </div>
              )}
              
              <div className="mt-8 flex flex-col gap-3">
                {/* Dynamically show GoKwik Checkout if Fee is present, otherwise fallback to WhatsApp */}
                {course.fee ? (
                  <GoKwikButton courseName={course.name} fee={course.fee} />
                ) : (
                  <Button asChild className="h-12 bg-cta text-primary-foreground hover:bg-cherry w-full">
                    <a href={`https://wa.me/91${PHONE}?text=${encodeURIComponent("Hi Actverse! I’d like to enquire about " + course.name + ".")}`} target="_blank" rel="noreferrer">
                      Enquire on WhatsApp <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="h-12 w-full">
                  <a href={`tel:+91${PHONE}`}><Phone className="mr-2 w-4 h-4" />Call admissions</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16"><AdmissionsNotes /></div>
      </section>
    </SiteShell>
  );
}