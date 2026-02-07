import "./Projects.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';
import HeaderIcons from '../components/HeaderIcons';
import ProjectTimeline from '../components/ProjectTimeline';

function Projects() {
    const projects = [
        {
            name: "Portfolio Platform",
            date: "Feb 2026",
            description: [
                "Designed and developed interactive portfolio website featuring subway-inspired navigation system and dynamic transit map visualization",
                "Implemented responsive design with context-aware badge placement and smooth transitions across various viewport sizes"
            ]
        },
        {
            name: "Shelfie",
            date: "Jan 2024",
            description: [
                "Engineered interactive social reading platform using MERN stack with Google Books API integration and dynamic content visualization",
                "Awarded \"Most Innovative UI Feature\" among 89 teams at MIT's web.lab for creative book collection display and interactive user experience"
            ]
        }
    ];

    return (
        <div className="projects-page-container">
            <CursorTrail/>
            <HeaderIcons helpText="Off track? Head back home with the back button in the top-left, or take an express transfer using the badges!" showBackButton={true} />
            <img
                src="/images/projectsSign.svg"
                alt="Projects"
                className="sign"
            />

            <div className="page-badges">
                <a href="/skills" className="page-badge">
                    <img src="/images/skillsBadge.svg" alt="Skills" />
                </a>
                <a href="/experience" className="page-badge">
                    <img src="/images/experienceBadge.svg" alt="Experiences" />
                </a>
            </div>

            <ProjectTimeline projects={projects} />
        </div>
    )
}

export default Projects;
