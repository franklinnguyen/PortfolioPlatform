import './TransitMap.css';
import { useEffect, useRef, useState } from 'react';
import { useLineWipe } from './LineWipe';

const LINES = ['experience', 'projects', 'skills'];
const HIT_WIDTH = 1800;
const HIT_HEIGHT = 1000;
const MOUSE_HIT_RADIUS_PX = 1;
const TOUCH_HIT_RADIUS_PX = 16;

// Outlives page changes but not a reload, so the reveal plays once per visit
let hasPlayedReveal = false;
const LINE_IMAGES = {
  river: '/images/riverImg.svg',
  experience: '/images/experienceLine.svg',
  projects: '/images/projectsLine.svg',
  skills: '/images/skillsLine.svg',
  star: '/images/star.svg'
};

function TransitMap({ highlightedLine = null }) {
  const wipeTo = useLineWipe();
  const canvasRef = useRef(null);
  const imagesRef = useRef(null);
  const activeLineRef = useRef(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [revealDone, setRevealDone] = useState(hasPlayedReveal);
  const hitContextsRef = useRef(null);

  activeLineRef.current = hoveredLine || highlightedLine;

  useEffect(() => {
    hasPlayedReveal = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = {};
    let loadedCount = 0;
    Object.entries(LINE_IMAGES).forEach(([name, src]) => {
      images[name] = new Image();
      images[name].onload = () => {
        loadedCount++;
        if (loadedCount === Object.keys(LINE_IMAGES).length) imagesRef.current = images;
      };
      images[name].src = src;
    });

    const lineState = Object.fromEntries(LINES.map((line) => [line, { scale: 1, opacity: 1 }]));
    const approach = (current, target) => (Math.abs(target - current) > 0.001 ? current + (target - current) * 0.15 : target);

    let animationFrame;
    let needsDraw = true;

    const draw = () => {
      animationFrame = requestAnimationFrame(draw);

      const rect = canvas.getBoundingClientRect();
      if (!imagesRef.current || !rect.width) return;

      const dpr = window.devicePixelRatio || 1;
      const { width, height } = rect;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        needsDraw = true;
      }

      const activeLine = activeLineRef.current;
      LINES.forEach((line) => {
        const state = lineState[line];
        const scale = approach(state.scale, activeLine === line ? 1.05 : 1);
        const opacity = approach(state.opacity, activeLine && activeLine !== line ? 0.3 : 1);
        if (scale !== state.scale || opacity !== state.opacity) needsDraw = true;
        state.scale = scale;
        state.opacity = opacity;
      });

      if (!needsDraw) return;
      needsDraw = false;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(images.river, 0, 0, width, height);

      let starScale = 1;
      LINES.forEach((line) => {
        const state = lineState[line];
        starScale = Math.max(starScale, state.scale);

        ctx.save();
        ctx.globalAlpha = state.opacity;
        ctx.translate(width / 2, height / 2);
        ctx.scale(state.scale, state.scale);
        ctx.translate(-width / 2, -height / 2);
        ctx.drawImage(images[line], 0, 0, width, height);
        ctx.restore();
      });

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(starScale, starScale);
      ctx.translate(-width / 2, -height / 2);
      ctx.drawImage(images.star, 0, 0, width, height);
      ctx.restore();
    };

    animationFrame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const lineAtPointer = (e, radiusCssPx) => {
    const images = imagesRef.current;
    if (!images) return null;

    const rect = canvasRef.current.getBoundingClientRect();
    const scale = HIT_WIDTH / rect.width;
    const x = Math.round((e.clientX - rect.left) * scale);
    const y = Math.round((e.clientY - rect.top) * scale);
    const radius = Math.ceil(radiusCssPx * scale);

    if (!hitContextsRef.current) {
      hitContextsRef.current = Object.fromEntries(LINES.map((line) => {
        const hitCanvas = document.createElement('canvas');
        hitCanvas.width = HIT_WIDTH;
        hitCanvas.height = HIT_HEIGHT;
        const hitContext = hitCanvas.getContext('2d', { willReadFrequently: true });
        hitContext.drawImage(images[line], 0, 0, HIT_WIDTH, HIT_HEIGHT);
        return [line, hitContext];
      }));
    }

    let nearestLine = null;
    let nearestDistance = Infinity;
    LINES.forEach((line) => {
      const size = radius * 2 + 1;
      const { data } = hitContextsRef.current[line].getImageData(x - radius, y - radius, size, size);
      for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
          if (data[(row * size + column) * 4 + 3] > 50) {
            const distance = Math.hypot(column - radius, row - radius);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestLine = line;
            }
          }
        }
      }
    });
    return nearestLine;
  };

  const handleMouseMove = (e) => {
    setHoveredLine(lineAtPointer(e, MOUSE_HIT_RADIUS_PX));
  };

  const handleClick = (e) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const line = lineAtPointer(e, isTouch ? TOUCH_HIT_RADIUS_PX : MOUSE_HIT_RADIUS_PX);
    if (line) wipeTo(`/${line}`);
  };

  return (
    <div className="transit-map-container">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredLine(null)}
        onClick={handleClick}
        onAnimationEnd={() => setRevealDone(true)}
        className={`transit-canvas ${hoveredLine ? 'line-hovered' : ''} ${revealDone ? 'reveal-done' : ''}`}
      />
    </div>
  );
}

export default TransitMap;
