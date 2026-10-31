import './TransitMap.css';
import { useEffect, useRef, useState } from 'react';
import { useLineWipe } from './LineWipe';

const LINES = ['experience', 'projects', 'skills'];
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

  activeLineRef.current = hoveredLine || highlightedLine;

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

      // Nothing moved, so the last frame is still correct
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

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = 1800 / rect.width;
    const scaleY = 1000 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const images = imagesRef.current;
    if (!images) return;

    const checkLine = (img) => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 1800;
      tempCanvas.height = 1000;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(img, 0, 0, 1800, 1000);

      // Check a 3x3 grid around the point for better hit detection
      const checkRadius = 1;
      for (let dy = -checkRadius; dy <= checkRadius; dy++) {
        for (let dx = -checkRadius; dx <= checkRadius; dx++) {
          const pixel = tempCtx.getImageData(
            Math.max(0, Math.min(1799, x + dx)),
            Math.max(0, Math.min(999, y + dy)),
            1,
            1
          ).data;
          if (pixel[3] > 50) { // Lower threshold for better detection
            return true;
          }
        }
      }
      return false;
    };

    if (checkLine(images.skills)) {
      setHoveredLine('skills');
    } else if (checkLine(images.projects)) {
      setHoveredLine('projects');
    } else if (checkLine(images.experience)) {
      setHoveredLine('experience');
    } else {
      setHoveredLine(null);
    }
  };

  const handleClick = () => {
    if (hoveredLine === 'skills') {
      wipeTo('/skills');
    } else if (hoveredLine === 'projects') {
      wipeTo('/projects');
    } else if (hoveredLine === 'experience') {
      wipeTo('/experience');
    }
  };

  return (
    <div className="transit-map-container">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredLine(null)}
        onClick={handleClick}
        className={`transit-canvas ${hoveredLine ? 'line-hovered' : ''}`}
      />
    </div>
  );
}

export default TransitMap;
