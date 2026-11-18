"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function addSyllabusModule(formData: FormData) {
  await checkAdmin();

  const courseId = formData.get("courseId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const practicalActivities = formData.get("practicalActivities") as string;
  const orderStr = formData.get("order") as string;
  const order = orderStr ? parseInt(orderStr, 10) : 0;

  await prisma.syllabusModule.create({
    data: {
      courseId,
      title,
      description,
      practicalActivities,
      order,
    },
  });

  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteSyllabusModule(id: string, courseId: string) {
  await checkAdmin();
  
  await prisma.syllabusModule.delete({
    where: { id },
  });

  revalidatePath(`/admin/courses/${courseId}`);
}