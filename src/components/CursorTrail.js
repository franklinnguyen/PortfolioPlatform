import { useEffect, useRef, useState } from 'react';
import './CursorTrail.css';

function CursorTrail() {
  const [trails, setTrails] = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const trailIdCounter = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Initialize position on first mouse move to avoid trail from (0,0)
      if (!isInitialized.current) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        lastPos.current = { x: e.clientX, y: e.clientY };
        isInitialized.current = true;
        return;
      }
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { x: mouseX, y: mouseY } = mousePos.current;
      const { x: lastX, y: lastY } = lastPos.current;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime.current;

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 2) {
        const velocity = deltaTime > 0 ? distance / deltaTime : 0;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const baseSegmentLength = 8;
        const velocityThreshold = 0.5;
        const segmentLength = velocity < velocityThreshold ? baseSegmentLength * 2 : baseSegmentLength;
        const numSegments = Math.ceil(distance / segmentLength);

        lastTime.current = currentTime;

        const newTrails = [];
        for (let i = 0; i < numSegments; i++) {
          const t = (i + 1) / numSegments;
          const interpX = lastX + dx * t;
          const interpY = lastY + dy * t;

          const id = trailIdCounter.current++;
          const newTrail = {
            id,
            x: interpX,
            y: interpY,
            angle,
            opacity: 1
          };

          newTrails.push(newTrail);

          setTimeout(() => {
            setTrails(prev => prev.filter(t => t.id !== id));
          }, 1000);
        }

        setTrails(prev => [...prev, ...newTrails]);
        lastPos.current = { x: mouseX, y: mouseY };
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            transform: `translate(-50%, -50%) rotate(${trail.angle}deg)`
          }}
        >
          <div className="rail rail-top"></div>
          <div className="rail rail-bottom"></div>
          <div className="tie tie-1"></div>
          <div className="tie tie-2"></div>
          <div className="tie tie-3"></div>
        </div>
      ))}
    </>
  );
}

export default CursorTrail;
