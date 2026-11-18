"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function deleteCourse(id: string) {
  await checkAdmin();
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
}

export async function upsertCourse(formData: FormData, existingId?: string) {
  await checkAdmin();

  // Extract form data
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string).toLowerCase().replace(/\s+/g, '-');
  const category = formData.get("category") as "ACTING" | "WORKSHOPS" | "DANCE";
  const duration = formData.get("duration") as string;
  const feeStr = formData.get("fee") as string;
  const fee = feeStr ? parseInt(feeStr, 10) : null;
  const blurb = formData.get("blurb") as string;
  const description = formData.get("description") as string;
  const tagsStr = formData.get("tags") as string;
  const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : [];
  const seoTitle = formData.get("seoTitle") as string;
  const seoDescription = formData.get("seoDescription") as string;
  const seoKeywords = formData.get("seoKeywords") as string;
  const isActive = formData.get("isActive") === "on";

  const data = {
    name, slug, category, duration, fee, blurb, description, 
    tags, seoTitle, seoDescription, seoKeywords, isActive
  };

  if (existingId) {
    await prisma.course.update({ where: { id: existingId }, data });
  } else {
    await prisma.course.create({ data });
  }

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}