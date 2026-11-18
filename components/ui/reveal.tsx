"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  
  useEffect(() => {
    const el = ref.current; 
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { 
      if (e?.isIntersecting) { 
        setV(true); 
        io.disconnect(); 
      } 
    }, { threshold: 0.12 });
    
    io.observe(el); 
    return () => io.disconnect();
  }, []);
  
  return <div ref={ref} data-visible={v} className={`reveal ${className}`}>{children}</div>;
}