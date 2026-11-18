import { CourseForm } from "../_components/CourseForm";
import Link from "next/link";

export default function NewCoursePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="text-sm text-gray-500 hover:text-cherry">← Back to Courses</Link>
        <h1 className="text-3xl font-display font-bold">Add New Course</h1>
      </div>
      <CourseForm />
    </div>
  );
}