import { FacultyForm } from "../../_components/FacultyForm";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faculty = await prisma.faculty.findUnique({ where: { id } });

  if (!faculty) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/people" className="text-sm text-gray-500 hover:text-cherry">← Back to People</Link>
        <h1 className="text-3xl font-display font-bold">Edit: {faculty.name}</h1>
      </div>
      <FacultyForm initialData={faculty} />
    </div>
  );
}