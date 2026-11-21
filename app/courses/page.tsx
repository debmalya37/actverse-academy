import { SiteShell } from "@/components/site-shell";
import { CourseList } from "@/components/course-list";
import { AdmissionsNotes } from "@/components/admissions-notes";
import screen from "@/assets/screen.jpg";
import prisma from "@/lib/prisma";
import { connection } from "next/server";
// export const dynamic = "force-dynamic";
export const instant = false;
export const metadata = {
  title: "Acting Courses & Fees — Actverse Academy",
  description: "Explore Actverse Academy’s foundation programs, acting diplomas, workshops and dance training.",
};

export default async function Courses() {
  await connection();
  // Fetch active courses from the database
  const dbCourses = await prisma.course.findMany({
    where: { isActive: true },
    select: { slug: true, name: true, category: true, duration: true, fee: true, blurb: true },
    orderBy: { createdAt: "asc" } // You can also add an 'order' field to the model to control display order
  });

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-cherry py-24 text-bone md:py-32">
        <img src={screen.src} alt="A camera and performer on a film set" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-cherry/60" />
        <div className="relative mx-auto max-w-7xl px-5">
          {/* <p className="label-mono text-champagne">Scene 02 · Courses</p> */}
          <h1 className="mt-5 text-4xl md:text-6xl">Actverse Academy — <br />Your Story Starts Here.</h1>
          <p className="mt-6 max-w-xl text-lg text-bone/90">Foundation programs, professional diplomas, workshops and movement training. Choose your next step.</p>
        </div>
      </section>
      
      <section className="mx-auto max-w-7xl px-5 py-16">
        <CourseList courses={dbCourses} />
        <div className="mt-16"><AdmissionsNotes /></div>
      </section>
    </SiteShell>
  );
}