import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteFaculty, deleteAlumni } from "@/actions/people";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus, Star, Users } from "lucide-react";

export default async function PeopleManagementPage() {
  const [faculty, alumni] = await Promise.all([
    prisma.faculty.findMany({ orderBy: { order: "asc" } }),
    prisma.alumni.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">People Management</h1>

      <Tabs defaultValue="faculty" className="w-full">
        <TabsList className="mb-6 bg-gray-100 p-1">
          <TabsTrigger value="faculty" className="data-[state=active]:bg-white data-[state=active]:text-cherry data-[state=active]:shadow-sm px-6 py-2 rounded-md font-semibold flex items-center gap-2">
            <Users className="w-4 h-4" /> Faculty & Founders
          </TabsTrigger>
          <TabsTrigger value="alumni" className="data-[state=active]:bg-white data-[state=active]:text-cherry data-[state=active]:shadow-sm px-6 py-2 rounded-md font-semibold flex items-center gap-2">
            <Star className="w-4 h-4" /> Alumni & Success Stories
          </TabsTrigger>
        </TabsList>

        {/* --- FACULTY TAB --- */}
        <TabsContent value="faculty" className="space-y-4">
          <div className="flex justify-end">
            <Button asChild className="bg-cherry hover:bg-cherry-deep text-white">
              <Link href="/admin/people/faculty/new"><Plus className="w-4 h-4 mr-2" /> Add Faculty</Link>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm">
                  <th className="p-4 font-semibold text-gray-600">Order</th>
                  <th className="p-4 font-semibold text-gray-600">Name & Role</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">No faculty members found.</td></tr>
                ) : (
                  faculty.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-mono text-gray-500">{member.order}</td>
                      <td className="p-4">
                        <p className="font-bold text-cherry">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </td>
                      <td className="p-4">
                        {member.isActive ? <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Active</span> : <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Hidden</span>}
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm"><Link href={`/admin/people/faculty/${member.id}`}><Edit className="w-4 h-4" /></Link></Button>
                        <form action={async () => { "use server"; await deleteFaculty(member.id); }}>
                          <Button type="submit" variant="destructive" size="sm"><Trash2 className="w-4 h-4" /></Button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* --- ALUMNI TAB --- */}
        <TabsContent value="alumni" className="space-y-4">
          <div className="flex justify-end">
            <Button asChild className="bg-cherry hover:bg-cherry-deep text-white">
              <Link href="/admin/people/alumni/new"><Plus className="w-4 h-4 mr-2" /> Add Alumni</Link>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm">
                  <th className="p-4 font-semibold text-gray-600">Alumni Name</th>
                  <th className="p-4 font-semibold text-gray-600">Course Taken</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alumni.length === 0 ? (
                  <tr><td colSpan={3} className="p-8 text-center text-gray-500">No alumni added yet.</td></tr>
                ) : (
                  alumni.map((alum) => (
                    <tr key={alum.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-bold text-cherry">{alum.name}</p>
                        <p className="text-xs text-gray-500">{alum.workingIn || "No current project listed"}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-700">{alum.courseTaken || "N/A"}</td>
                      <td className="p-4 flex justify-end gap-2">
                        <form action={async () => { "use server"; await deleteAlumni(alum.id); }}>
                          <Button type="submit" variant="destructive" size="sm"><Trash2 className="w-4 h-4" /></Button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}