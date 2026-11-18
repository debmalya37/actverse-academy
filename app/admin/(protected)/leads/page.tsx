import { getLeads, updateLeadStatus } from "@/actions/admin";
import { revalidatePath } from "next/cache";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const currentFilter = status || "ALL";
  const leads = await getLeads(currentFilter);

  // Inline server action to update status
  async function handleStatusChange(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const newStatus = formData.get("status") as string;
    await updateLeadStatus(id, newStatus);
    revalidatePath("/admin/leads");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Lead Management</h1>
        
        {/* Simple Filter */}
        <div className="flex gap-2">
          {["ALL", "NEW", "CONTACTED", "CONVERTED", "LOST"].map((s) => (
            <a 
              key={s} 
              href={`/admin/leads?status=${s}`}
              className={`px-4 py-2 rounded text-sm font-semibold ${currentFilter === s ? 'bg-cherry text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Contact</th>
              <th className="p-4 font-semibold text-gray-600">Course Enquired</th>
              <th className="p-4 font-semibold text-gray-600">Date</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No leads found.</td></tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4 text-sm">
                    {lead.phone}<br/>
                    <span className="text-gray-500">{lead.email}</span>
                  </td>
                  <td className="p-4 text-sm">{lead.course || "General"}</td>
                  <td className="p-4 text-sm text-gray-500">{lead.createdAt.toLocaleDateString()}</td>
                  <td className="p-4">
                    <form action={handleStatusChange} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <select 
                        name="status" 
                        defaultValue={lead.status}
                        className="text-sm border border-gray-300 rounded p-1"
                        onChange={(e) => e.target.form?.requestSubmit()}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="CONVERTED">CONVERTED</option>
                        <option value="LOST">LOST</option>
                      </select>
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