import "./Projects.css";
import '../styles/utils.css';
import HeaderIcons from '../components/HeaderIcons';
import StationTimeline from '../components/StationTimeline';

function Projects() {
            const projects = [
        {
            name: "Portfolio Platform",
            date: "Feb 2026",
            description: [
            "I designed and built a portfolio website using custom React components and original SVG assets. Inspired by my love for public transportation, I reimagined my hometown of Decatur, AL and its surrounding metropolitan areas as a real public transit system themed after Boston’s MBTA, where I currently live and attended school.",
            "• Conceptualized and designed the full visual system, including transit line layouts, station markers, signage, and icons, modeled after real MBTA maps, station signage, and digital components",
            "• Built a reusable React component system with responsive layouts, conditional content rendering across viewports",
            "• Implemented swipe-based gestures, visual interaction cues, hover states, and staged rendering to guide user flow and navigation"
            ]
        },
        {
            name: "Shelfie",
            date: "Jan 2024",
            description: [
            "Created a modern alternative to Goodreads by identifying user pain points in the legacy platform and designing a contemporary social reading experience.",
            "• Awarded \"Most Innovative UI Feature\" among 89 teams at MIT's web.lab competition for dynamic book collection visualization and interactive UX",
            "• Completed full-stack development using the MERN stack in under 2 weeks following an intensive web development course, demonstrating rapid learning and execution",
            "• Led end-to-end design and frontend implementation, including Figma prototyping, custom visual assets, responsive layouts across devices, and Google Books API integration for content search"
            ]
        }
    ];

    return (
        <div className="projects-page-container">
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

            <StationTimeline stations={projects} nodeColor="orange" />
        </div>
    )
}

export default Projects;
