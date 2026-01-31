import "./Projects.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';
import HeaderIcons from '../components/HeaderIcons';

function Projects() {
    return (
        <div className="projects-page-container">
            <CursorTrail/>
            <HeaderIcons helpText="Use the back button to the top left to navigate to the home page, or click the badges to visit a different section!" showBackButton={true} />
            <img
                src="/images/projectsSign.svg"
                alt="Projects"
                className="sign"
            />
        </div>
    )
}

export default Projects;
