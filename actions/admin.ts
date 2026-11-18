"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Helper to ensure only admins can run these actions
async function checkAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

// --- DASHBOARD ANALYTICS ---
export async function getDashboardStats() {
  await checkAdmin();
  
  const totalLeads = await prisma.lead.count();
  const newLeads = await prisma.lead.count({ where: { status: "NEW" } });
  const totalCourses = await prisma.course.count();
  
  // Group leads by status for the pie chart
  const leadsByStatus = await prisma.lead.groupBy({
    by: ['status'],
    _count: { status: true }
  });

  return { totalLeads, newLeads, totalCourses, leadsByStatus };
}

// --- LEADS MANAGEMENT ---
export async function getLeads(statusFilter?: string) {
  await checkAdmin();
  return await prisma.lead.findMany({
    where: statusFilter && statusFilter !== "ALL" ? { status: statusFilter } : {},
    orderBy: { createdAt: "desc" }
  });
}

export async function updateLeadStatus(id: string, status: string) {
  await checkAdmin();
  await prisma.lead.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/leads");
}

// --- COURSE MANAGEMENT (Basic Template) ---
export async function getCourses() {
  await checkAdmin();
  return await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { syllabusModules: true }
  });
}

export async function deleteCourse(id: string) {
  await checkAdmin();
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
}