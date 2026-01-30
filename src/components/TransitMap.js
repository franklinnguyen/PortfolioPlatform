import './TransitMap.css';
import { useEffect, useRef, useState } from 'react';

function TransitMap() {
  const canvasRef = useRef(null);
  const imagesRef = useRef(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const [scaleValues, setScaleValues] = useState({
    experience: 1,
    projects: 1,
    skills: 1
  });

  useEffect(() => {
    let animationFrame;
    
    const animate = () => {
      setScaleValues(prev => {
        const newScales = { ...prev };
        
        ['experience', 'projects', 'skills'].forEach(line => {
          const target = hoveredLine === line ? 1.05 : 1;
          const current = prev[line];
          const diff = target - current;
          
          if (Math.abs(diff) > 0.001) {
            newScales[line] = current + diff * 0.15;
          } else {
            newScales[line] = target;
          }
        });
        
        return newScales;
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [hoveredLine]);
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  
  ctx.scale(dpr, dpr);

  const images = {
    river: new Image(),
    experience: new Image(),
    projects: new Image(),
    skills: new Image(),
    star: new Image()
  };

  images.river.src = '/images/riverImg.svg';
  images.experience.src = '/images/experienceLine.svg';
  images.projects.src = '/images/projectsLine.svg';
  images.skills.src = '/images/skillsLine.svg';
  images.star.src = '/images/star.svg';

  imagesRef.current = images;

  let loadedCount = 0;
  const totalImages = Object.keys(images).length;

  Object.values(images).forEach(img => {
    img.onload = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        drawCanvas();
      }
    };
  });

  const drawCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    
    ctx.drawImage(images.river, 0, 0, width, height);
    
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleValues.experience, scaleValues.experience);
    ctx.translate(-width / 2, -height / 2);
    ctx.drawImage(images.experience, 0, 0, width, height);
    ctx.restore();
    
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleValues.projects, scaleValues.projects);
    ctx.translate(-width / 2, -height / 2);
    ctx.drawImage(images.projects, 0, 0, width, height);
    ctx.restore();
    
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleValues.skills, scaleValues.skills);
    ctx.translate(-width / 2, -height / 2);
    ctx.drawImage(images.skills, 0, 0, width, height);
    ctx.restore();
    
    ctx.drawImage(images.star, 0, 0, width, height);
  };

    drawCanvas();
    }, [scaleValues]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = 1400 / rect.width;
    const scaleY = 900 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const images = imagesRef.current;
    
    const checkLine = (img) => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 1400;
      tempCanvas.height = 900;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(img, 0, 0, 1400, 900);
      const pixel = tempCtx.getImageData(x, y, 1, 1).data;
      return pixel[3] > 0;
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

  return (
    <div className="transit-map-container">
      <canvas 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredLine(null)}
        className="transit-canvas"
      />
    </div>
  );
}

export default TransitMap;