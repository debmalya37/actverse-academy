import type { LucideIcon } from "lucide-react";

export interface HighlightItem {
  icon: LucideIcon;
  label: string;
}

interface HighlightStripProps {
  items: readonly HighlightItem[];
  ariaLabel?: string;
  speedSeconds?: number;
  className?: string;
}

export function HighlightStrip({
  items,
  ariaLabel = "Highlights",
  speedSeconds = 24,
  className = "",
}: HighlightStripProps) {
  if (!items.length) return null;

  // Duplicate items twice so the -50% translate loop is seamless on all viewport widths
  const trackItems = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden border-b border-border bg-paper/50 text-paper-foreground ${className}`}
    >
      {/* Subtle left/right edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-paper to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-paper to-transparent sm:w-14"
        aria-hidden
      />

      <div className="group flex py-5 sm:py-6 lg:py-7">
        <div
          style={{ animationDuration: `${speedSeconds}s` }}
          className="flex w-max shrink-0 animate-highlight-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused] sm:gap-14 sm:pr-14 lg:gap-20 lg:pr-20"
        >
          {trackItems.map(({ icon: Icon, label }, idx) => (
            <div
              key={`${label}-${idx}`}
              aria-hidden={idx >= items.length}
              className="flex shrink-0 items-center gap-3"
            >
              <Icon
                className="h-5 w-5 shrink-0 text-cherry lg:h-6 lg:w-6"
                strokeWidth={1.75}
              />
              <span className="whitespace-nowrap text-[clamp(0.875rem,1.15vw,1.125rem)] font-medium tracking-tight text-foreground">
                {label}
              </span>
              <span
                className="ml-6 h-1.5 w-1.5 rounded-full bg-cherry/35 sm:ml-8 lg:ml-12"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}