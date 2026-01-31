import "./Skills.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';

function Skills() {
    return (
        <div className="skills-page-container">
            <CursorTrail/>
            <img src="/images/skillsSign.svg" alt="Skills" className="sign" />
        </div>
    )
}

export default Skills;