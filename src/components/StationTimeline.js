import './StationTimeline.css';
import { useState, useRef, useEffect, useCallback } from 'react';

function StationTimeline({ stations, nodeColor = "orange" }) {
    const [activeStation, setActiveStation] = useState(0);
    const timelineRef = useRef(null);
    const timelineWrapperRef = useRef(null);

    const nodeImage = `/images/${nodeColor}Node.svg`;

    const colorMap = {
        orange: { primary: '#f39c12', hover: '#e67e22', shadow: 'rgba(243, 156, 18, 0.2)' },
        red: { primary: '#db3325', hover: '#c42d20', shadow: 'rgba(219, 51, 37, 0.2)' }
    };
    const colors = colorMap[nodeColor] || colorMap.orange;

    const scrollToStation = useCallback((index) => {
        setActiveStation(index);
        const container = timelineRef.current;
        if (container) {
            const station = container.querySelector(`.timeline-station-wrapper:nth-child(${index + 1})`);
            if (station) {
                station.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, []);

    const handlePrevious = useCallback(() => {
        const newIndex = activeStation > 0 ? activeStation - 1 : stations.length - 1;
        scrollToStation(newIndex);
    }, [activeStation, stations.length, scrollToStation]);

    const handleNext = useCallback(() => {
        const newIndex = activeStation < stations.length - 1 ? activeStation + 1 : 0;
        scrollToStation(newIndex);
    }, [activeStation, stations.length, scrollToStation]);

    useEffect(() => {
        const wrapper = timelineWrapperRef.current;
        if (!wrapper) return;

        let isScrolling = false;
        const handleWheel = (e) => {
            if (isScrolling) return;

            e.preventDefault();
            isScrolling = true;

            if (e.deltaY > 0) {
                handleNext();
            } else if (e.deltaY < 0) {
                handlePrevious();
            }

            setTimeout(() => {
                isScrolling = false;
            }, 500);
        };

        wrapper.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            wrapper.removeEventListener('wheel', handleWheel);
        };
    }, [activeStation, stations.length, handleNext, handlePrevious]);

    return (
        <div className="station-timeline" style={{
            '--timeline-color': colors.primary,
            '--timeline-color-hover': colors.hover,
            '--timeline-color-shadow': colors.shadow
        }}>
            <div className="timeline-wrapper" ref={timelineWrapperRef}>
                <button className="nav-arrow prev" onClick={handlePrevious} aria-label="Previous station">
                    ◀
                </button>
                <div className="timeline-content" ref={timelineRef}>
                    <div className="timeline-line"></div>
                    <div className="terminal-node-group start">
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
                    <div className="terminal-node-group end">
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
                                    style={{ left: `${position}%` }}
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
                                    className="timeline-station-wrapper"
                                    style={{ left: `${position}%` }}
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
                <button className="nav-arrow next" onClick={handleNext} aria-label="Next station">
                    ▶
                </button>
            </div>

            {activeStation !== null && (
                <div key={activeStation} className="station-alerts-container">
                    <h2 className="station-alerts-header">Station Alerts</h2>
                    <div className="station-alert-box">
                        <h3 className="alert-title">{stations[activeStation].name}</h3>
                        {stations[activeStation].subtitle && (
                            <p className="alert-subtitle">{stations[activeStation].subtitle}</p>
                        )}
                        <div className="alert-description">
                            {stations[activeStation].description.map((item, idx) => (
                                <p key={idx}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StationTimeline;
