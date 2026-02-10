import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], .page-badge, .nav-arrow, .timeline-station, .timeline-line-dot, .terminal-node-group, .timeline-station-wrapper, .line-hovered';

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
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

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
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
    isClicking ? 'clicking' : '',
    isHovering ? 'spinning' : ''
  ].filter(Boolean).join(' ');

  return (
    <img
      ref={cursorRef}
      src="/images/isolatedStar.svg"
      alt=""
      className={classes}
    />
  );
}

export default CustomCursor;
