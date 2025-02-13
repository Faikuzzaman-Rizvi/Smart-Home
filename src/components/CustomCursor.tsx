import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(cursorDot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "none"
      });
    };

    // Add hover effect for interactive elements
    const handleMouseEnter = () => {
      cursor?.classList.add('cursor-hover');
      cursorDot?.classList.add('cursor-dot-hover');
    };

    const handleMouseLeave = () => {
      cursor?.classList.remove('cursor-hover');
      cursorDot?.classList.remove('cursor-dot-hover');
    };

    document.addEventListener('mousemove', onMouseMove);

    // Add hover effect to all buttons and links
    const interactiveElements = document.querySelectorAll('button, a, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 pointer-events-none z-50 rounded-full border-2 border-blue-500 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 mix-blend-difference"
      />
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed w-2 h-2 pointer-events-none z-50 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
};