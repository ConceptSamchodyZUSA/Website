import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that animates a number counting up from 0 to `end`.
 * Only starts counting when the element is visible in the viewport.
 * @param {number} end - The target number to count to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @returns {{ ref: React.RefObject, count: number }}
 */
export const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { ref, count };
};

/**
 * Custom hook that applies a 3D tilt effect to a card on hover.
 * @param {number} maxTilt - Maximum tilt in degrees (default 8)
 * @returns {{ ref: React.RefObject, style: object, onMouseMove: function, onMouseLeave: function }}
 */
export const useTilt = (maxTilt = 8) => {
  const ref = useRef(null);
  const animationFrame = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el || animationFrame.current !== null) return;

    const { clientX, clientY } = e;
    animationFrame.current = requestAnimationFrame(() => {
      animationFrame.current = null;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  };

  const onMouseLeave = () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  useEffect(() => () => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
  }, []);

  return {
    ref,
    style: { transition: 'transform 0.1s ease-out' },
    onMouseMove,
    onMouseLeave
  };
};
