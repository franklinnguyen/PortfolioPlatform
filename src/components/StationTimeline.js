import './StationTimeline.css';
import { useState, useRef, useEffect, useCallback } from 'react';

function StationTimeline({ stations, nodeColor = "orange" }) {
    const [activeStation, setActiveStation] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');
    const [keyboardNavFeedback, setKeyboardNavFeedback] = useState(false);
    const timelineRef = useRef(null);
    const timelineWrapperRef = useRef(null);
    const keyboardFeedbackTimeoutRef = useRef(null);

    const nodeImage = `/images/${nodeColor}Node.svg`;

    const colorMap = {
        orange: { primary: '#EE8F13', hover: '#d67e0e', shadow: 'rgba(238, 143, 19, 0.2)' },
        red: { primary: '#db3325', hover: '#c42d20', shadow: 'rgba(219, 51, 37, 0.2)' }
    };
    const colors = colorMap[nodeColor] || colorMap.orange;

    const scrollToStation = useCallback((index) => {
        setActiveStation(index);
    }, []);

    const handlePrevious = useCallback((source = 'pointer') => {
        setSlideDirection('left');
        const newIndex = activeStation > 0 ? activeStation - 1 : stations.length - 1;
        setKeyboardNavFeedback(source === 'keyboard');
        scrollToStation(newIndex);
    }, [activeStation, stations.length, scrollToStation]);

    const handleNext = useCallback((source = 'pointer') => {
        setSlideDirection('right');
        const newIndex = activeStation < stations.length - 1 ? activeStation + 1 : 0;
        setKeyboardNavFeedback(source === 'keyboard');
        scrollToStation(newIndex);
    }, [activeStation, stations.length, scrollToStation]);

    useEffect(() => {
        const wrapper = timelineWrapperRef.current;
        if (!wrapper) return;

        let touchStartX = 0;
        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
        };
        const handleTouchEnd = (e) => {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX < 0) handleNext();
                else handlePrevious();
            }
        };

        wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
        wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            wrapper.removeEventListener('touchstart', handleTouchStart);
            wrapper.removeEventListener('touchend', handleTouchEnd);
        };
    }, [activeStation, stations.length, handleNext, handlePrevious]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext('keyboard');
            else if (e.key === 'ArrowLeft') handlePrevious('keyboard');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrevious]);

    useEffect(() => {
        if (!keyboardNavFeedback) return undefined;
        clearTimeout(keyboardFeedbackTimeoutRef.current);
        keyboardFeedbackTimeoutRef.current = setTimeout(() => {
            setKeyboardNavFeedback(false);
        }, 320);
        return () => clearTimeout(keyboardFeedbackTimeoutRef.current);
    }, [keyboardNavFeedback, activeStation]);

    return (
        <div className="station-timeline" style={{
            '--timeline-color': colors.primary,
            '--timeline-color-hover': colors.hover,
            '--timeline-color-shadow': colors.shadow
        }}>
            <div className="timeline-wrapper" ref={timelineWrapperRef}>
                <button className="nav-arrow prev bounce-hint" onClick={handlePrevious} aria-label="Previous station">
                    ◀
                </button>
                <div className="timeline-content" ref={timelineRef}>
                    <div className="timeline-line"></div>
                    <div className="terminal-node-group start" onClick={handlePrevious}>
                        <img
                            src={nodeImage}
                            alt="Start node"
                            className="timeline-terminal-node start-node"
                        />
                        <div className="terminal-node-label">
                            <span className="terminal-node-name">{stations[activeStation > 0 ? activeStation - 1 : stations.length - 1].name}</span>
                            {stations[activeStation > 0 ? activeStation - 1 : stations.length - 1].subtitle && (
                                <span className="terminal-node-subtitle">{stations[activeStation > 0 ? activeStation - 1 : stations.length - 1].subtitle}</span>
                            )}
                        </div>
                    </div>
                    <div className="terminal-node-group end" onClick={handleNext}>
                        <img
                            src={nodeImage}
                            alt="End node"
                            className="timeline-terminal-node end-node"
                        />
                        <div className="terminal-node-label">
                            <span className="terminal-node-name">{stations[activeStation < stations.length - 1 ? activeStation + 1 : 0].name}</span>
                            {stations[activeStation < stations.length - 1 ? activeStation + 1 : 0].subtitle && (
                                <span className="terminal-node-subtitle">{stations[activeStation < stations.length - 1 ? activeStation + 1 : 0].subtitle}</span>
                            )}
                        </div>
                    </div>
                    {stations.map((station, index) => {
                        const position = ((index + 1) / (stations.length + 1)) * 100;
                        const isActive = index === activeStation;
                        return (
                            <div key={`dot-${index}`} className={`station-group ${isActive ? 'active' : 'inactive'}`}>
                                <div
                                    className="timeline-line-dot"
                                    style={{
                                        left: `${position}%`,
                                        '--station-index': index
                                    }}
                                    onClick={() => scrollToStation(index)}
                                />
                                {isActive && (
                                    <>
                                        <div
                                            className="you-are-here-label"
                                            style={{ left: `${position}%` }}
                                        >
                                            You are here
                                        </div>
                                        <img
                                            src="/images/isolatedStar.svg"
                                            alt="You are here"
                                            className="timeline-star"
                                            style={{ left: `${position}%` }}
                                        />
                                    </>
                                )}
                                <div
                                    className={`timeline-station-wrapper ${isActive && keyboardNavFeedback ? 'keyboard-active-feedback' : ''}`}
                                    style={{
                                        left: `${position}%`,
                                        '--station-index': index
                                    }}
                                    onClick={() => scrollToStation(index)}
                                >
                                    <div className="station-label">{station.name}</div>
                                    {station.subtitle && <div className="station-subtitle">{station.subtitle}</div>}
                                    <div className="station-date">{station.date}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="nav-arrow next bounce-hint" onClick={handleNext} aria-label="Next station">
                    ▶
                </button>
            </div>

            {activeStation !== null && (
                <div key={activeStation} className={`station-alerts-container slide-from-${slideDirection}`}>
                    <h2 className="station-alerts-header">Station Alerts</h2>
                    <div className="station-alert-box">
                        <h3 className="alert-title">{stations[activeStation].name}</h3>
                        {stations[activeStation].subtitle && (
                            <p className="alert-subtitle">
                                {stations[activeStation].subtitle}
                                {stations[activeStation].location && ` | ${stations[activeStation].location}`}
                            </p>
                        )}
                        <div className="alert-description">
                            {stations[activeStation].description.map((item, idx) => (
                                <p key={idx} style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                                    {item}
                                </p>
                            ))}
                        </div>
                        {stations[activeStation].link && (
                            <a
                                href={stations[activeStation].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="alert-link"
                            >
                                ➟ View Project
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default StationTimeline;
