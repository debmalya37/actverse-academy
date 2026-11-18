"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the shape of the database course records
type Course = {
  slug: string;
  name: string;
  category: string;
  duration: string;
  fee: number | null;
  blurb: string | null;
};

export function CourseList({ courses }: { courses: Course[] }) {
  const [category, setCategory] = useState("All");

  // Safe fee formatter that handles database nulls
  const formatFee = (fee: number | null) => {
    if (!fee) return "On Request";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(fee);
  };

  return (
    <div>
      <div aria-label="Course categories" className="mb-8 flex flex-wrap gap-2">
        {["All", "Acting", "Workshops", "Dance"].map(c => (
          <Button 
            key={c} 
            variant="outline" 
            aria-pressed={category === c} 
            onClick={() => setCategory(c)} 
            className={category === c ? "border-cherry bg-cherry text-primary-foreground hover:bg-cherry hover:text-primary-foreground" : ""}
          >
            {c}
          </Button>
        ))}
      </div>
      <div className="border-t border-border">
        {courses
          // Match the UI state ("Acting") with the Prisma enum ("ACTING")
          .filter(c => category === "All" || c.category.toUpperCase() === category.toUpperCase())
          .map((c, i) => (
          <Link 
            key={c.slug} 
            href={`/courses/${c.slug}`} 
            className="group grid gap-4 border-b border-border py-7 transition-colors hover:bg-card md:grid-cols-[1fr_130px_150px_24px] md:items-center"
          >
            <div>
              <p className="font-mono text-xs text-cherry">
                {String(i + 1).padStart(2,"0")} / {c.category}
              </p>
              <h3 className="mt-2 text-xl md:text-2xl">{c.name}</h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{c.blurb}</p>
            </div>
            <span className="text-sm">{c.duration}</span>
            <span className="font-display text-xl font-semibold text-cherry">
              {formatFee(c.fee)}
              {/* Only show the 'plus taxes' subtext if there is an actual fee */}
              {c.fee && <span className="mt-1 block font-sans text-xs font-normal text-muted-foreground">Full payment · plus taxes</span>}
            </span>
            <ArrowUpRight className="h-5 w-5 text-cherry" />
          </Link>
        ))}
      </div>
    </div>
  );
}