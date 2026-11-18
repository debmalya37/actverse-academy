"use client";

import { upsertFaculty } from "@/actions/people";
import { Button } from "@/components/ui/button";

export function FacultyForm({ initialData = null }: { initialData?: any }) {
  const isEditing = !!initialData;

  const handleSubmit = async (formData: FormData) => {
    await upsertFaculty(formData, initialData?.id);
  };

  return (
    <form action={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Name *</label>
          <input name="name" defaultValue={initialData?.name} required className="w-full border rounded p-2" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Role / Designation *</label>
          <input name="role" defaultValue={initialData?.role} required className="w-full border rounded p-2" placeholder="e.g. Head Faculty" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Bio *</label>
          <textarea name="bio" defaultValue={initialData?.bio} required className="w-full border rounded p-2 h-32" />
        </div>

        <div className="space-y-4 md:col-span-2 border-t pt-6">
          <h3 className="font-bold text-cherry">Social Links (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Instagram URL</label>
              <input name="instagramUrl" defaultValue={initialData?.instagramUrl || ""} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Facebook URL</label>
              <input name="facebookUrl" defaultValue={initialData?.facebookUrl || ""} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">LinkedIn URL</label>
              <input name="linkedinUrl" defaultValue={initialData?.linkedinUrl || ""} className="w-full border rounded p-2" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between border-t pt-6">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-semibold">
              <input type="checkbox" name="isActive" defaultChecked={initialData ? initialData.isActive : true} className="w-5 h-5 accent-cherry" />
              Active (Visible on site)
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Display Order:</label>
              <input name="order" type="number" defaultValue={initialData?.order || 99} className="border rounded p-1 w-20 text-center" />
            </div>
          </div>
          <Button type="submit" className="bg-cherry hover:bg-cherry-deep text-white px-8">
            {isEditing ? "Update Faculty" : "Save Faculty"}
          </Button>
        </div>

      </div>
    </form>
  );
}