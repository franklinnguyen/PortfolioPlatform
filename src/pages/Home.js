import { useEffect, useState } from 'react';
import './Home.css';
import TransitMap from '../components/TransitMap';
import HeaderIcons from '../components/HeaderIcons';

function Home() {
    const [isLogoHovered, setIsLogoHovered] = useState(false);

    useEffect(() => {
        document.title = 'Franklin Nguyen | Portfolio';
    }, []);

    return (
        <div className="home-container">
            <div className="header-container">
                <div
                    className={`logo-swap ${isLogoHovered ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                >
                    <img src="/images/fLogo.svg" alt="Franklin Nguyen logo" className="logo-img logo-default" />
                    <img src="/images/smile.svg" alt="Franklin Nguyen smiling logo" className="logo-img logo-smile" />
                </div>
                <div className="title-container">
                    <h1>Franklin Nguyen</h1>
                    <h2 className='subtitle-text'>
                        Software Engineer & MIT Alumnus
                    </h2>
                </div>
            </div>
            <HeaderIcons helpText="Select a line to begin. Transfer between lines using the badges." />
            <div className="bio-container">
                <p className="bio-text">
                I’m an MIT CS & Molecular Biology alumnus and Software Engineer on the GUI development team for Medtronic’s Hugo Robotic-Assisted Surgery System. Proficient in Python, C++, Qt/QML, and full-stack development (React/Flutter), I’m quick to learn, detail-oriented, and driven to ship high-quality software efficiently.
                </p>
            </div>
            <div className="content-container">
                <TransitMap />
            </div>

            <div className="home-nav-badges">
                <a href="#/experience" className="page-badge">
                    <img src="/images/experienceBadge.svg" alt="Experience" />
                </a>
                <a href="#/projects" className="page-badge">
                    <img src="/images/projectsBadge.svg" alt="Projects" />
                </a>
                <a href="#/skills" className="page-badge">
                    <img src="/images/skillsBadge.svg" alt="Skills" />
                </a>
            </div>
        </div>
    );
}
export default Home;
