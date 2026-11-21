"use client";

import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

const EMOTIONS = [
  {
    name: "Joy",
    words: "Happiness · Energy · Positivity",
    quote: "Lightness, warmth, and the spark that draws an audience in.",
    c: "var(--joy)",
    tone: "bg-joy-bright",
  },
  {
    name: "Sadness",
    words: "Emotion · Depth · Humanity",
    quote: "Stillness, vulnerability, and the quiet weight behind unsaid words.",
    c: "var(--sadness)",
    tone: "bg-sadness-bright",
  },
  {
    name: "Anger",
    words: "Intensity · Passion · Power",
    quote: "Conviction, tension, and the pressure beneath a breaking point.",
    c: "var(--anger)",
    tone: "bg-anger-bright",
  },
  {
    name: "Fear",
    words: "Vulnerability · Realism · Suspense",
    quote: "Heightened alertness, instinct, and stepping into the unknown.",
    c: "var(--fear)",
    tone: "bg-fear-bright",
  },
  {
    name: "Surprise",
    words: "Curiosity · Awareness · Drama",
    quote: "Sudden discovery and the raw instant a scene shifts.",
    c: "var(--surprise)",
    tone: "bg-surprise-bright",
  },
  {
    name: "Disgust",
    words: "Judgement · Boundaries · Reality",
    quote: "Instinctive rejection and clear boundaries in character choices.",
    c: "var(--disgust)",
    tone: "bg-disgust-bright",
  },
  {
    name: "Trust",
    words: "Connection · Warmth · Relationships",
    quote: "Openness, steadiness, and genuine connection with scene partners.",
    c: "var(--trust)",
    tone: "bg-trust-bright",
  },
  {
    name: "Anticipation",
    words: "Focus · Excitement · Preparation",
    quote: "Focused expectancy and momentum right before the turn.",
    c: "var(--anticipation)",
    tone: "bg-anticipation-bright",
  },
  {
    name: "Love",
    words: "Compassion · Empathy · Belonging",
    quote: "Empathy, devotion, and the emotional core that stays memorable.",
    c: "var(--love)",
    tone: "bg-love-bright",
  },
] as const;

export function EmotionsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Only mark as in-view when the slider enters the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
          setActiveIndex(0); // Stay positioned on Slide 1 (Joy) when out of view
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance only while the slider is in view (mobile)
  useEffect(() => {
    if (!isInView) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EMOTIONS.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isInView]);

  const current = EMOTIONS[activeIndex];

  return (
    <div ref={containerRef} className="mx-auto mt-8 w-full max-w-7xl px-5 md:mt-10">
      {/* NEW MOBILE SLIDER (< sm): stays at index 0 / Joy until in view */}
      <div className="sm:hidden">
        <div className="overflow-hidden rounded-xl border border-paper-foreground/15 bg-paper">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {EMOTIONS.map((item, idx) => (
              <div key={item.name} className="w-full shrink-0 p-5">
                <div className="flex items-center gap-2.5">
                  <span className={`h-3 w-3 rounded-full ${item.tone}`} aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-wider text-paper-foreground/60">
                    0{idx + 1} / 09
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-paper-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-foreground/75">
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators & manual selection */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-paper-foreground/65">
            {current.name}
          </span>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Emotion slides">
            {EMOTIONS.map((item, idx) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show ${item.name}`}
                aria-selected={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === idx
                    ? "w-6 bg-paper-foreground"
                    : "w-2 bg-paper-foreground/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ORIGINAL DESKTOP / TABLET GRID (>= sm) */}
      <div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {EMOTIONS.map((e, i) => (
          <div key={e.name} className="h-full">
            <Reveal>
              <div
                className="emotion-card h-full w-full p-6"
                style={
                  {
                    "--e": e.c,
                    background: `color-mix(in oklab, ${e.c} 7%, var(--paper))`,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-baseline justify-between">
                  <span className="label-mono" style={{ color: e.c }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rotate-45"
                    style={{ background: e.c }}
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 text-3xl" style={{ color: e.c }}>
                  {e.name}
                </h3>
                <p
                  className="label-mono mt-3 break-words"
                  style={{
                    color: `color-mix(in oklab, ${e.c} 70%, var(--paper-foreground))`,
                  }}
                >
                  {e.words}
                </p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}