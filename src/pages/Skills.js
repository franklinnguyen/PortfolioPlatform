import "./Skills.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';
import TransitBranch from '../components/TransitBranch';

function Skills() {
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
        'Adobe Creative Suite',
        'AWS'
    ];

    return (
        <div className="skills-page-container">
            <CursorTrail/>
            <img src="/images/skillsSign.svg" alt="Skills" className="sign" />

            <div className="skills-content">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1600 500"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <TransitBranch
                        startX={250}
                        startY={80}
                        stations={languagesSkills}
                        spacing={45}
                        branchLabel="LANGUAGES BRANCH"
                        color="#148844"
                    />

                    <TransitBranch
                        startX={750}
                        startY={80}
                        stations={frameworksSkills}
                        spacing={45}
                        branchLabel="FRAMEWORKS & LIBRARIES BRANCH"
                        color="#148844"
                    />

                    <TransitBranch
                        startX={1250}
                        startY={80}
                        stations={toolsSkills}
                        spacing={45}
                        branchLabel="TOOLS BRANCH"
                        color="#148844"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Skills;