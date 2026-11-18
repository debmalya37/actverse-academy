"use client";

import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const EMOTIONS = [
  { name: "Joy", words: "Happiness · Energy · Positivity", c: "var(--joy)" },
  { name: "Sadness", words: "Emotion · Depth · Humanity", c: "var(--sadness)" },
  { name: "Anger", words: "Intensity · Passion · Power", c: "var(--anger)" },
  { name: "Fear", words: "Vulnerability · Realism · Suspense", c: "var(--fear)" },
  { name: "Surprise", words: "Curiosity · Awareness · Drama", c: "var(--surprise)" },
  { name: "Disgust", words: "Judgement · Boundaries · Reality", c: "var(--disgust)" },
  { name: "Trust", words: "Connection · Warmth · Relationships", c: "var(--trust)" },
  { name: "Anticipation", words: "Focus · Excitement · Preparation", c: "var(--anticipation)" },
  { name: "Love", words: "Compassion · Empathy · Belonging", c: "var(--love)" },
] as const;

export function EmotionsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    // Only run the auto-scroll on mobile devices
    if (window.innerWidth >= 640) return;

    const interval = setInterval(() => {
      if (scrollRef.current && !isInteracting) {
        const container = scrollRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        // Dynamically grab the exact width of one card + the 16px gap (gap-4)
        const firstCard = container.children[0] as HTMLElement;
        const scrollAmount = firstCard ? firstCard.clientWidth + 16 : clientWidth * 0.75;
        
        // If we reached the end of the scroll, snap back to the start
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll right by exactly one card width
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [isInteracting]);

  return (
    <div 
      ref={scrollRef}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setTimeout(() => setIsInteracting(false), 2000)}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setTimeout(() => setIsInteracting(false), 2000)}
      // ALWAYS GRID: 
      // Mobile uses grid-flow-col for horizontal scroll.
      // Desktop switches to standard grid-cols-2/3.
      className="mx-auto mt-6 grid w-full max-w-7xl gap-4 px-5 pb-6 grid-flow-col auto-cols-[75vw] overflow-x-auto snap-x snap-mandatory sm:grid-cols-2 sm:grid-flow-row sm:auto-cols-auto sm:overflow-visible sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {EMOTIONS.map((e, i) => (
        // Because the parent is purely a grid, we drop the width hacks and just snap the center
        <div key={e.name} className="snap-center h-full">
          <Reveal>
            <div className="emotion-card h-full w-full p-6" style={{ "--e": e.c, background: `color-mix(in oklab, ${e.c} 7%, var(--paper))` } as React.CSSProperties}>
              <div className="flex items-baseline justify-between">
                <span className="label-mono" style={{ color: e.c }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="h-2.5 w-2.5 rotate-45" style={{ background: e.c }} aria-hidden />
              </div>
              <h3 className="mt-4 text-3xl" style={{ color: e.c }}>{e.name}</h3>
              <p className="label-mono mt-3 break-words" style={{ color: `color-mix(in oklab, ${e.c} 70%, var(--paper-foreground))` }}>{e.words}</p>
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}