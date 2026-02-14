import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './PageTransition.css';

function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fade-in');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fade-out');
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fade-out') {
          setDisplayLocation(location);
          setTransitionStage('fade-in');
        }
      }}
    >
      {children}
    </div>
  );
}

export default PageTransition;
