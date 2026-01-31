import "./Experience.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';
import HeaderIcons from '../components/HeaderIcons';

function Experience() {
    return (
        <div className="experience-page-container">
            <CursorTrail/>
            <HeaderIcons helpText="Use the back button to the top left to navigate to the home page, or click the badges to visit a different section!" showBackButton={true} />
            <img
                src="/images/experienceSign.svg"
                alt="Experience"
                className="sign"
            />

            <div className="page-badges">
                <a href="/skills" className="page-badge">
                    <img src="/images/skillsBadge.svg" alt="Skills" />
                </a>
                <a href="/projects" className="page-badge">
                    <img src="/images/projectsBadge.svg" alt="Projects" />
                </a>
            </div>
        </div>
    )
}

export default Experience;
