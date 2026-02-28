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
                    Hi! I'm Franklin, a developer with a B.S. in Computer Science and Molecular Biology and experience building full-stack GUI and web applications. I'm largely interested using my skillset for medtech, climate solutions, and urban planning. Outside of work, I regularly enjoy group fitness classes, dancing to pop anthems, and taste testing new coffee shops.
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
