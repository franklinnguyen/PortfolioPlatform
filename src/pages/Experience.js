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
            description: [
            "I’m a software engineer at Medtronic Surgical Robotics on the GUI Developer Team for the Hugo Robotic-Assisted Surgery System. I contribute to four unique displays across three component types (surgeon console, tower, arms), collaborating closely with UX, systems, testing, and back-end engineering in a safety-critical, regulated environment. Our primary tech stack is Qt/QML/C++ for GUI development and DDS-based communication, with Python used for automated testing and tooling.",
            "Hugo features an open console for surgeon comfort and modular robotic arms that can be configured to match procedural needs. Following recent FDA approval, I’m excited to continue building enhancements that improve reliability, usability, and surgical workflow efficiency."
            ]
        },
        {
            name: "Software Engineer Intern",
            subtitle: "Medtronic",
            date: "June 2024 - August 2024",
            description: [
            "As an intern on the GUI Developer Team for the Hugo Robotic-Assisted Surgery Platform, I refactored and enhanced a GUI testing tool used by over 30 GUI developers and test engineers. I redesigned the tool with a focus on modularity, maintainability, and intuitive workflows, with changes reviewed and merged through multiple code reviews in accordance with team standards and PEP 8 guidelines.",
            "I used Figma to prototype design improvements, iterated based on stakeholder feedback, and implemented multi-threading and event listeners in Python and PyQt to support responsive GUI communication."
            ]
        },
        {
            name: "Advanced Undergraduate Researcher",
            subtitle: "MIT Urban Risk Lab",
            date: "August 2024 - May 2025",
            description: [
            "I was selected as one of 19 MIT Climate and Sustainability Scholars for a year-long research project focused on climate resilience and flood risk assessment. I implemented a light-weight cellular automata–based flood propagation model in Python that incorporates slope, elevation drop, and flow direction to identify potentially flood-vulnerable areas in regions without sensor coverage.",
            "In parallel, I evaluated automated image labeling pipelines for flooded streets, comparing Amazon Mechanical Turk and GPT-4o. I applied prompt optimization techniques and quantified performance using statistical metrics including Cohen’s kappa and confusion matrices."
            ]
        },
        {
            name: "Undergraduate Developer",
            subtitle: "MIT Urban Risk Lab",
            date: "Feb 2024 - May 2024",
            description: [
            "To improve access to jobs in sustainability, climate, and energy, I prototyped a green jobs platform using the MERN stack. I integrated the Google Sheets API to automatically ingest and populate job listings from form submissions, enabling a lightweight, non-technical content workflow.",
            "I designed and implemented a fully responsive, dynamic front end optimized for usability across all screen sizes."
            ]
        },
        {
            name: "Lab Assistant",
            subtitle: "MIT EECS",
            date: "August 2023 - April 2025",
            description: [
            "I served as course staff for three introductory computer science courses over three semesters, holding 150+ one-on-one student consultations focused on personalized tutoring, live assessments, and exam preparation.",
            "I also contributed to course development by proofreading instructional materials, providing staff feedback, and drafting official solutions for more than 10 problem sets."
            ]
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
