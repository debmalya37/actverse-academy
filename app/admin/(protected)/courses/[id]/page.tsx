import { CourseForm } from "../_components/CourseForm";
import { SyllabusManager } from "../_components/SyllabusManager";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch the course AND its syllabus modules
  const course = await prisma.course.findUnique({ 
    where: { id },
    include: {
      syllabusModules: true
    }
  });

  if (!course) notFound();

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="text-sm text-gray-500 hover:text-cherry">← Back to Courses</Link>
        <h1 className="text-3xl font-display font-bold">Edit Course: {course.name}</h1>
      </div>
      
      {/* Basic Details & SEO Form */}
      <CourseForm initialData={course} />
      
      {/* Syllabus Builder */}
      <SyllabusManager courseId={course.id} modules={course.syllabusModules} />
    </div>
  );
}