
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, MessageSquare, Settings, LogOut, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connection } from "next/server";

// Tell Next.js 16 to block the render until the dynamic auth check completes
export const instant = false;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Await connection to read cookies/headers safely
  await connection();
  
  // 2. Fetch the session
  const session = await auth();

  // 3. Protect the admin routes
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Leads & Enquiries", href: "/admin/leads", icon: Users },
    { name: "Courses & Syllabus", href: "/admin/courses", icon: BookOpen },
    { name: "Faculty & Alumni", href: "/admin/people", icon: Users },
    // { name: "Pages & SEO", href: "/admin/pages", icon: FileText },
    // { name: "FAQs", href: "/admin/faqs", icon: MessageSquare },
    // { name: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-bone flex flex-col">
        <div className="p-6 border-b border-cherry-deep">
          <h2 className="text-xl font-display font-bold text-cherry">Actverse Admin</h2>
          <p className="text-sm text-bone/60">Welcome, {session.user.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-cherry transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-cherry-deep">
          <form action={async () => { "use server"; await signOut(); }}>
            <Button type="submit" variant="ghost" className="w-full justify-start text-bone hover:bg-cherry hover:text-white">
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}