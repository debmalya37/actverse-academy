"use client";

import { upsertCourse } from "@/actions/courses";
import { Button } from "@/components/ui/button";

export function CourseForm({ initialData = null }: { initialData?: any }) {
  const isEditing = !!initialData;

  // Wrapper to pass the ID if we are editing
  const handleSubmit = async (formData: FormData) => {
    await upsertCourse(formData, initialData?.id);
  };

  return (
    <form action={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4 md:col-span-2 border-b pb-6">
          <h2 className="text-xl font-bold text-cherry">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Course Name *</label>
              <input name="name" defaultValue={initialData?.name} required className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">URL Slug *</label>
              <input name="slug" defaultValue={initialData?.slug} required className="w-full border rounded p-2" placeholder="e.g. one-month-foundation" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Category *</label>
              <select name="category" defaultValue={initialData?.category || "ACTING"} className="w-full border rounded p-2">
                <option value="ACTING">Acting</option>
                <option value="WORKSHOPS">Workshops</option>
                <option value="DANCE">Dance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Duration *</label>
              <input name="duration" defaultValue={initialData?.duration} required className="w-full border rounded p-2" placeholder="e.g. 1 Month" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Fee (₹) (Leave blank for 'On Request')</label>
              <input name="fee" type="number" defaultValue={initialData?.fee || ""} className="w-full border rounded p-2" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 md:col-span-2 border-b pb-6">
          <h2 className="text-xl font-bold text-cherry">Course Content</h2>
          <div>
            <label className="block text-sm font-semibold mb-1">Short Blurb * (Displays on course cards)</label>
            <textarea name="blurb" defaultValue={initialData?.blurb} required className="w-full border rounded p-2 h-20" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Detailed Description</label>
            <textarea name="description" defaultValue={initialData?.description || ""} className="w-full border rounded p-2 h-32" />
          </div>
        </div>

        {/* SEO Management */}
        <div className="space-y-4 md:col-span-2 border-b pb-6">
          <h2 className="text-xl font-bold text-cherry">Advanced SEO</h2>
          <div>
            <label className="block text-sm font-semibold mb-1">Tags (Comma separated)</label>
            <input name="tags" defaultValue={initialData?.tags?.join(", ")} className="w-full border rounded p-2" placeholder="acting, camera, mumbai" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">SEO Title</label>
              <input name="seoTitle" defaultValue={initialData?.seoTitle || ""} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">SEO Keywords</label>
              <input name="seoKeywords" defaultValue={initialData?.seoKeywords || ""} className="w-full border rounded p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">SEO Meta Description</label>
            <textarea name="seoDescription" defaultValue={initialData?.seoDescription || ""} className="w-full border rounded p-2 h-20" />
          </div>
        </div>

        {/* Status & Submit */}
        <div className="md:col-span-2 flex items-center justify-between pt-4">
          <label className="flex items-center gap-2 cursor-pointer font-semibold">
            <input type="checkbox" name="isActive" defaultChecked={initialData ? initialData.isActive : true} className="w-5 h-5 accent-cherry" />
            Publish Course (Active)
          </label>
          <Button type="submit" className="bg-cherry hover:bg-cherry-deep text-white px-8">
            {isEditing ? "Update Course" : "Save Course"}
          </Button>
        </div>
      </div>
    </form>
  );
}