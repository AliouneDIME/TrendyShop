import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      if (dotRef.current) dotRef.current.style.transform += ' scale(2)';
      if (ringRef.current) {
        ringRef.current.style.width = '56px';
        ringRef.current.style.height = '56px';
        ringRef.current.style.borderColor = 'rgba(201,168,92,0.8)';
      }
    };

    const onMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.borderColor = 'rgba(201,168,92,0.5)';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    // Add listeners to all interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, label').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, width: 8, height: 8, background: '#c9a85c', borderRadius: '50%', transition: 'width 0.2s, height 0.2s' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998, width: 36, height: 36, border: '1.5px solid rgba(201,168,92,0.5)', borderRadius: '50%', transition: 'width 0.3s, height 0.3s, border-color 0.3s' }} />
    </>
  );
}
