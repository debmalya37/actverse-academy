import { FacultyForm } from "../../_components/FacultyForm";
import Link from "next/link";

export default function NewFacultyPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/people" className="text-sm text-gray-500 hover:text-cherry">← Back to People</Link>
        <h1 className="text-3xl font-display font-bold">Add Faculty Member</h1>
      </div>
      <FacultyForm />
    </div>
  );
}