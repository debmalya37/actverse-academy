import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteCourse } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, ListChecks } from "lucide-react";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { syllabusModules: true } } }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Course Management</h1>
        <Button asChild className="bg-cherry hover:bg-cherry-deep text-white">
          <Link href="/admin/courses/new"><Plus className="w-4 h-4 mr-2" /> Add New Course</Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-semibold text-gray-600">Course Name</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Fee / Duration</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No courses found.</td></tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium text-cherry">{course.name}</p>
                    <p className="text-xs text-gray-500">/{course.slug}</p>
                  </td>
                  <td className="p-4 text-sm font-mono text-gray-600">{course.category}</td>
                  <td className="p-4 text-sm">
                    {course.fee ? `₹${course.fee.toLocaleString("en-IN")}` : "On Request"}<br/>
                    <span className="text-gray-500">{course.duration}</span>
                  </td>
                  <td className="p-4 text-sm">
                    {course.isActive ? 
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Active</span> : 
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Draft</span>
                    }
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/courses/${course.id}`}><Edit className="w-4 h-4" /></Link>
                    </Button>
                    <form action={async () => { "use server"; await deleteCourse(course.id); }}>
                      <Button type="submit" variant="destructive" size="sm"><Trash2 className="w-4 h-4" /></Button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}