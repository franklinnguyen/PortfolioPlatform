import "./Projects.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';
import HeaderIcons from '../components/HeaderIcons';

function Projects() {
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
        </div>
    )
}

export default Projects;
