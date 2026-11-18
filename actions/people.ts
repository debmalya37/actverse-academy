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

// --- FACULTY ACTIONS ---
export async function deleteFaculty(id: string) {
  await checkAdmin();
  await prisma.faculty.delete({ where: { id } });
  revalidatePath("/admin/people");
}

export async function upsertFaculty(formData: FormData, existingId?: string) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const facebookUrl = formData.get("facebookUrl") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const orderStr = formData.get("order") as string;
  const order = orderStr ? parseInt(orderStr, 10) : 99;
  const isActive = formData.get("isActive") === "on";

  const data = { name, role, bio, instagramUrl, facebookUrl, linkedinUrl, order, isActive };

  if (existingId) {
    await prisma.faculty.update({ where: { id: existingId }, data });
  } else {
    await prisma.faculty.create({ data });
  }

  revalidatePath("/admin/people");
  redirect("/admin/people");
}

// --- ALUMNI ACTIONS ---
export async function deleteAlumni(id: string) {
  await checkAdmin();
  await prisma.alumni.delete({ where: { id } });
  revalidatePath("/admin/people");
}

export async function upsertAlumni(formData: FormData, existingId?: string) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const courseTaken = formData.get("courseTaken") as string;
  const testimonial = formData.get("testimonial") as string;
  const workingIn = formData.get("workingIn") as string;
  const isActive = formData.get("isActive") === "on";

  const data = { name, courseTaken, testimonial, workingIn, isActive };

  if (existingId) {
    await prisma.alumni.update({ where: { id: existingId }, data });
  } else {
    await prisma.alumni.create({ data });
  }

  revalidatePath("/admin/people");
  redirect("/admin/people");
}