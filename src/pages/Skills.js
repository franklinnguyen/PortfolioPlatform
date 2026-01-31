import "./Skills.css";
import '../styles/utils.css';
import { useState, useEffect } from 'react';
import CursorTrail from '../components/CursorTrail';
import TransitBranch from '../components/TransitBranch';
import HeaderIcons from '../components/HeaderIcons';

function Skills() {
    const [viewBoxWidth, setViewBoxWidth] = useState(1600);

    useEffect(() => {
        const updateViewBox = () => {
            const width = window.innerWidth;
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
        'Express.js',
        'Next.js',
        'MUI'
    ];

    const toolsSkills = [
        'Git',
        'Docker',
        'Linux',
        'Figma',
        'MongoDB',
        'Adobe Creative Suite',
        'AWS'
    ];

    return (
        <div className="skills-page-container">
            <CursorTrail/>
            <HeaderIcons helpText="Use the back button to the top left to navigate to the home page, or click the badges to visit a different section!" showBackButton={true} />
            <img
                src="/images/skillsSign.svg"
                alt="Skills"
                className="sign"
            />

            <div className="page-badges">
                <a href="/projects" className="page-badge">
                    <img src="/images/projectsBadge.svg" alt="Projects" />
                </a>
                <a href="/experiences" className="page-badge">
                    <img src="/images/experiencesBadge.svg" alt="Experiences" />
                </a>
            </div>

            <div className="skills-content">
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${viewBoxWidth} 500`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <TransitBranch
                        startX={leftX}
                        startY={120}
                        stations={languagesSkills}
                        spacing={45}
                        branchLabel={"LANGUAGES\nBRANCH"}
                        color="#148844"
                    />

                    <TransitBranch
                        startX={centerX}
                        startY={120}
                        stations={frameworksSkills}
                        spacing={45}
                        branchLabel={"FRAMEWORKS & LIBRARIES\nBRANCH"}
                        color="#148844"
                    />

                    <TransitBranch
                        startX={rightX}
                        startY={120}
                        stations={toolsSkills}
                        spacing={45}
                        branchLabel={"TOOLS\nBRANCH"}
                        color="#148844"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Skills;