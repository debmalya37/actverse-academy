"use client";

import { useRef } from "react";
import { addSyllabusModule, deleteSyllabusModule } from "@/actions/syllabus";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, GripVertical } from "lucide-react";

type SyllabusModule = {
  id: string;
  title: string;
  description: string;
  practicalActivities: string | null;
  order: number;
};

export function SyllabusManager({ courseId, modules = [] }: { courseId: string, modules: SyllabusModule[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  // Sort modules by order
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  const handleAdd = async (formData: FormData) => {
    await addSyllabusModule(formData);
    formRef.current?.reset(); // Clear the form after submission
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100 mt-8">
      <h2 className="text-xl font-bold text-cherry border-b pb-4">Syllabus & Curriculum Builder</h2>
      
      {/* Existing Modules List */}
      <div className="space-y-4">
        {sortedModules.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No syllabus modules added yet.</p>
        ) : (
          sortedModules.map((mod) => (
            <div key={mod.id} className="flex gap-4 p-4 border rounded-md bg-gray-50 group">
              <div className="text-gray-400 mt-1 cursor-grab"><GripVertical className="w-5 h-5" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-cherry text-white text-xs font-bold px-2 py-1 rounded">Order: {mod.order}</span>
                  <h3 className="font-bold text-lg">{mod.title}</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">{mod.description}</p>
                {mod.practicalActivities && (
                  <p className="text-xs text-gray-500 font-mono bg-white p-2 border rounded">
                    <strong>Practical:</strong> {mod.practicalActivities}
                  </p>
                )}
              </div>
              <div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={async () => await deleteSyllabusModule(mod.id, courseId)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Module Form */}
      <form ref={formRef} action={handleAdd} className="mt-8 bg-paper p-6 rounded-md border border-gray-200">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4 text-cherry"/> Add New Module</h3>
        <input type="hidden" name="courseId" value={courseId} />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold mb-1 text-gray-600">Module Title (e.g., 'Week 1 - Break the Hesitation') *</label>
            <input name="title" required className="w-full border rounded p-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Display Order *</label>
            <input name="order" type="number" defaultValue={sortedModules.length + 1} required className="w-full border rounded p-2 text-sm" />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold mb-1 text-gray-600">Description / Topics Covered *</label>
            <textarea name="description" required className="w-full border rounded p-2 text-sm h-16" />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold mb-1 text-gray-600">Practical Activities (Optional)</label>
            <textarea name="practicalActivities" className="w-full border rounded p-2 text-sm h-12" placeholder="e.g., Icebreakers, acting games..." />
          </div>
        </div>
        
        <Button type="submit" className="bg-cherry hover:bg-cherry-deep text-white">
          Save Module
        </Button>
      </form>
    </div>
  );
}