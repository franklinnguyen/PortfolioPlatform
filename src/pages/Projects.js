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
                "Designed and developed interactive portfolio website from scratch, creating all custom React components and SVG assets. Passionate about public transportation, I envisioned what my hometown of Decatur, AL and surrounding metropolitan areas would look like with real public transit infrastructure, themed after Boston's MBTA system where I currently live and attended school.",
                "• Engineered MBTA-inspired navigation system with dynamic routing, context-aware badge placement, and interactive station markers, drawing design inspiration from real MBTA maps, station signs, and the iconic \"T\" logo",
                "• Implemented responsive design with smooth transitions and animations across various viewport sizes",
                "• Created reusable component library including custom timeline, transit branches, and interactive map elements"
            ]
        },
        {
            name: "Shelfie",
            date: "Jan 2024",
            description: [
                "Created as a modern alternative to Goodreads, addressing the dated UI and limited features of the legacy platform monopolizing the social reading space. Analyzed user pain points and identified key improvements needed for contemporary readers.",
                "• Awarded \"Most Innovative UI Feature\" among 89 teams at MIT's web.lab competition for dynamic book collection visualization and interactive user experience features",
                "• Completed full-stack development in under 2 weeks following intensive 2-week web development course, demonstrating rapid learning and execution",
                "• Designed all custom icons, images, and visual assets while leading storyboarding and Figma prototyping efforts",
                "• Implemented responsive design considering mobile viewers and adapting challenging, complex UI layouts across various device sizes",
                "• Engineered interactive social reading platform using MERN stack with Google Books API integration and MUI component library"
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
                <a href="#/skills" className="page-badge">
                    <img src="/images/skillsBadge.svg" alt="Skills" />
                </a>
                <a href="#/experience" className="page-badge">
                    <img src="/images/experienceBadge.svg" alt="Experiences" />
                </a>
            </div>

            <ProjectTimeline projects={projects} />
        </div>
    )
}

export default Projects;
