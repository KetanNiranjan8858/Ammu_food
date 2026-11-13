"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const outerGlowRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const outer = outerGlowRef.current;
    const inner = innerGlowRef.current;
    const dot = dotRef.current;
    if (!outer || !inner || !dot) return;

    // Center elements on anchor point
    gsap.set([outer, inner, dot], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!hasMoved) {
        hasMoved = true;
        gsap.to([outer, inner, dot], {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // 1. Large ambient background light with smooth trailing inertia (duration: 1.8s delay)
      gsap.to(outer, {
        x: clientX,
        y: clientY,
        duration: 1.8,
        ease: "power2.out",
      });

      // 2. Medium golden ember with gentle delay (duration: 0.9s)
      gsap.to(inner, {
        x: clientX,
        y: clientY,
        duration: 0.9,
        ease: "power3.out",
      });

      // 3. Responsive cursor micro-glow (duration: 0.25s)
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.25,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([outer, inner, dot], {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });
      hasMoved = false;
    };

    // Subtly and gently brighten light when hovering cards or clickable elements (calm luxury intensity)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, select, textarea, .card-hover-effect, .hover-lift, .hover-row-highlight, .benefit-card, [role='button']")) {
        gsap.to(outer, {
          scale: 1.08,
          opacity: 0.20,
          duration: 0.7,
          ease: "power2.out",
        });
        gsap.to(inner, {
          scale: 1.05,
          opacity: 0.24,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(outer, {
          scale: 1,
          opacity: 0.14,
          duration: 0.7,
          ease: "power2.out",
        });
        gsap.to(inner, {
          scale: 1,
          opacity: 0.18,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      style={{ pointerEvents: "none", userSelect: "none" }}
      aria-hidden="true"
    >
      {/* Outer ambient saffron-crimson glow with smooth gentle trailing */}
      <div
        ref={outerGlowRef}
        className="pointer-events-none fixed top-0 left-0 w-[550px] h-[550px] rounded-full blur-[140px] opacity-15 mix-blend-screen select-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.28) 0%, rgba(136,19,55,0.18) 50%, rgba(0,0,0,0) 75%)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Inner warm golden core with gentle lag */}
      <div
        ref={innerGlowRef}
        className="pointer-events-none fixed top-0 left-0 w-[240px] h-[240px] rounded-full blur-[75px] opacity-20 mix-blend-screen select-none"
        style={{
          background: "radial-gradient(circle, rgba(253,216,53,0.35) 0%, rgba(229,152,25,0.2) 60%, rgba(0,0,0,0) 80%)",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Immediate responsive golden micro-glow */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-[26px] h-[26px] rounded-full blur-[12px] opacity-30 bg-[#FFE082] mix-blend-screen select-none"
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
