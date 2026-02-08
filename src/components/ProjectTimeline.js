import './ProjectTimeline.css';
import { useState, useRef, useEffect, useCallback } from 'react';

function ProjectTimeline({ projects }) {
    const [activeProject, setActiveProject] = useState(0);
    const timelineRef = useRef(null);
    const timelineWrapperRef = useRef(null);

    const scrollToProject = useCallback((index) => {
        setActiveProject(index);
        const container = timelineRef.current;
        if (container) {
            const station = container.querySelector(`.timeline-station-wrapper:nth-child(${index + 1})`);
            if (station) {
                station.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, []);

    const handlePrevious = useCallback(() => {
        const newIndex = activeProject > 0 ? activeProject - 1 : projects.length - 1;
        scrollToProject(newIndex);
    }, [activeProject, projects.length, scrollToProject]);

    const handleNext = useCallback(() => {
        const newIndex = activeProject < projects.length - 1 ? activeProject + 1 : 0;
        scrollToProject(newIndex);
    }, [activeProject, projects.length, scrollToProject]);

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
    }, [activeProject, projects.length, handleNext, handlePrevious]);

    return (
        <div className="project-timeline">
            <div className="timeline-wrapper" ref={timelineWrapperRef}>
                <button className="nav-arrow prev" onClick={handlePrevious} aria-label="Previous project">
                    ◀
                </button>
                <div className="timeline-content" ref={timelineRef}>
                    <div className="timeline-line"></div>
                    <div className="terminal-node-group start">
                        <img
                            src="/images/orangeNode.svg"
                            alt="Start node"
                            className="timeline-terminal-node start-node"
                        />
                        <div className="terminal-node-label">
                            {projects[activeProject > 0 ? activeProject - 1 : projects.length - 1].name}
                        </div>
                    </div>
                    <div className="terminal-node-group end">
                        <img
                            src="/images/orangeNode.svg"
                            alt="End node"
                            className="timeline-terminal-node end-node"
                        />
                        <div className="terminal-node-label">
                            {projects[activeProject < projects.length - 1 ? activeProject + 1 : 0].name}
                        </div>
                    </div>
                    {projects.map((project, index) => {
                        // Calculate position to divide line into equal thirds
                        // Line spans from 0% to 100%, so use that range
                        const position = ((index + 1) / (projects.length + 1)) * 100;
                        const isActive = index === activeProject;
                        return (
                            <div key={`dot-${index}`} className={`station-group ${isActive ? 'active' : 'inactive'}`}>
                                <div
                                    className="timeline-line-dot"
                                    style={{ left: `${position}%` }}
                                    onClick={() => scrollToProject(index)}
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
                                    onClick={() => scrollToProject(index)}
                                >
                                    <div className="station-label">{project.name}</div>
                                    <div className="station-date">{project.date}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="nav-arrow next" onClick={handleNext} aria-label="Next project">
                    ▶
                </button>
            </div>

            {activeProject !== null && (
                <div key={activeProject} className="station-alerts-container">
                    <h2 className="station-alerts-header">Station Alerts</h2>
                    <div className="station-alert-box">
                        <h3 className="alert-title">{projects[activeProject].name}</h3>
                        <div className="alert-description">
                            {projects[activeProject].description.map((item, idx) => (
                                <p key={idx}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectTimeline;
