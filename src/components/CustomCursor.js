import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], .page-badge, .nav-arrow, .timeline-station, .timeline-line-dot, .terminal-node-group, .timeline-station-wrapper, .line-hovered';

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const target = e.target.closest(INTERACTIVE_SELECTOR);
      setIsHovering(!!target);
    };

    const handleMouseDown = () => {
      setIsSpinning(false);
      // Force reflow so re-adding the class restarts the animation
      void cursor.offsetWidth;
      setIsSpinning(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return null;

  const classes = [
    'custom-cursor',
    isVisible ? 'visible' : '',
    isHovering ? 'hovering' : '',
    isSpinning ? 'spinning' : ''
  ].filter(Boolean).join(' ');

  return (
    <img
      ref={cursorRef}
      src="/images/isolatedStar.svg"
      alt=""
      className={classes}
      onAnimationEnd={() => setIsSpinning(false)}
    />
  );
}

export default CustomCursor;
