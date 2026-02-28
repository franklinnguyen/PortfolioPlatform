import "./Skills.css";
import '../styles/utils.css';
import { useState, useEffect } from 'react';
import TransitBranch from '../components/TransitBranch';
import HeaderIcons from '../components/HeaderIcons';

function Skills() {
    const [viewBoxWidth, setViewBoxWidth] = useState(1600);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        document.title = 'Franklin Nguyen | Skills';
    }, []);

    useEffect(() => {
        const updateViewBox = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            setIsMobile(mobile);
            // Scale viewBox width based on viewport, min 1000, max 1600
            setViewBoxWidth(Math.max(1000, Math.min(1600, width * 1.2)));
        };

        updateViewBox();
        window.addEventListener('resize', updateViewBox);
        return () => window.removeEventListener('resize', updateViewBox);
    }, []);

    // Calculate branch positions with tighter spacing on narrow viewports
    // Narrow: 250 units, scales up to 450 units on wider viewports
    const gapSize = viewBoxWidth < 900 ? 250 : Math.min(450, viewBoxWidth * 0.28);
    const centerX = viewBoxWidth / 2;
    const leftX = centerX - gapSize;
    const rightX = centerX + gapSize;

    // Mobile: smaller horizontal offset to keep labels within viewBox
    const mobileHorizontalOffset = isMobile ? 220 : 320;
    const languagesSkills = [
        'Python',
        'C++',
        'QML',
        'JavaScript',
        'TypeScript',
        'HTML',
        'CSS'
    ];

    const frameworksSkills = [
        'Qt',
        'PyQt',
        'PyTest',
        'React.js',
        'Squish',
        'Express.js',
        'Next.js',
        'MUI'
    ];

    const toolsSkills = [
        'Git',
        'Docker',
        'Linux',
        'Hardware Testing',
        'Figma',
        'Adobe Creative Suite',
        'Atlassian',
        'MongoDB'
    ];

    return (
        <div className="skills-page-container">
            <HeaderIcons helpText="Express transfer to a different line using the badges." showBackButton={true} />
            <img
                src="/images/skillsSign.svg"
                alt="Skills"
                className="sign"
            />

            <div className="page-badges">
                <a href="#/experience" className="page-badge">
                    <img src="/images/experienceBadge.svg" alt="Experiences" />
                </a>
                <a href="#/projects" className="page-badge">
                    <img src="/images/projectsBadge.svg" alt="Projects" />
                </a>
            </div>

            <div className="skills-content">
                <svg
                    width="100%"
                    height="100%"
                    viewBox={isMobile ? `0 0 ${viewBoxWidth} 1900` : `0 0 ${viewBoxWidth} 510`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <TransitBranch
                        branchIndex={0}
                        startX={isMobile ? centerX - mobileHorizontalOffset : leftX}
                        startY={isMobile ? 270 : 130}
                        stations={languagesSkills}
                        spacing={isMobile ? 90 : 45}
                        branchLabel={"LANGUAGES\nBRANCH"}
                        color="#148844"
                        labelFontSize={isMobile ? 36 : 24}
                        stationFontSize={isMobile ? 28 : 18}
                        labelOffset={isMobile ? 90 : 60}
                    />

                    <TransitBranch
                        branchIndex={1}
                        startX={isMobile ? centerX + mobileHorizontalOffset : centerX}
                        startY={isMobile ? 270 : 130}
                        stations={frameworksSkills}
                        spacing={isMobile ? 90 : 45}
                        branchLabel={isMobile ? "FRAMEWORKS &\nLIBRARIES\nBRANCH" : "FRAMEWORKS & LIBRARIES\nBRANCH"}
                        color="#148844"
                        labelFontSize={isMobile ? 36 : 24}
                        stationFontSize={isMobile ? 28 : 18}
                        labelOffset={isMobile ? 125 : 60}
                    />

                    <TransitBranch
                        branchIndex={2}
                        startX={isMobile ? centerX : rightX}
                        startY={isMobile ? 1100 : 130}
                        stations={toolsSkills}
                        spacing={isMobile ? 90 : 45}
                        branchLabel={"TOOLS\nBRANCH"}
                        color="#148844"
                        labelFontSize={isMobile ? 36 : 24}
                        stationFontSize={isMobile ? 28 : 18}
                        labelOffset={isMobile ? 90 : 60}
                    />
                </svg>
            </div>
        </div>
    )
}

export default Skills;
