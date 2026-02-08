import "./Experience.css";
import '../styles/utils.css';
import CursorTrail from '../components/CursorTrail';
import HeaderIcons from '../components/HeaderIcons';
import StationTimeline from '../components/StationTimeline';

function Experience() {
    const experiences = [
        {
            name: "Software Engineer I",
            subtitle: "Medtronic",
            date: "June 2025 - Present",
            description: ["Description coming soon."]
        },
        {
            name: "Software Engineer Intern",
            subtitle: "Medtronic",
            date: "June 2024 - August 2024",
            description: ["Description coming soon."]
        },
        {
            name: "Advanced Undergraduate Researcher",
            subtitle: "MIT Urban Risk Lab",
            date: "August 2024 - May 2025",
            description: ["Description coming soon."]
        },
        {
            name: "Undergraduate Developer",
            subtitle: "MIT Urban Risk Lab",
            date: "Feb 2024 - May 2024",
            description: ["Description coming soon."]
        },
        {
            name: "Lab Assistant",
            subtitle: "MIT EECS",
            date: "August 2023 - April 2025",
            description: ["Description coming soon."]
        }
    ];

    return (
        <div className="experience-page-container">
            <CursorTrail/>
            <HeaderIcons helpText="Off track? Head back home with the back button in the top-left, or take an express transfer using the badges!" showBackButton={true} />
            <img
                src="/images/experienceSign.svg"
                alt="Experience"
                className="sign"
            />

            <div className="page-badges">
                <a href="#/projects" className="page-badge">
                    <img src="/images/projectsBadge.svg" alt="Projects" />
                </a>
                <a href="#/skills" className="page-badge">
                    <img src="/images/skillsBadge.svg" alt="Skills" />
                </a>
            </div>

            <StationTimeline stations={experiences} nodeColor="red" />
        </div>
    )
}

export default Experience;
