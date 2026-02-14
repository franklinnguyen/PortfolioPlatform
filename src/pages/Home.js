import { useEffect } from 'react';
import './Home.css';
import TransitMap from '../components/TransitMap';
import HeaderIcons from '../components/HeaderIcons';

function Home() {
    useEffect(() => {
        document.title = 'Franklin Nguyen | Portfolio';
    }, []);

    return (
        <div className="home-container">
            <div className="header-container">
                <img src="/images/fLogo.svg" alt="Franklin Nguyen logo" className="logo-img" />
                <div className="title-container">
                    <h1>Franklin Nguyen</h1>
                    <h2 className='subtitle-text'>
                        Software Engineer & MIT Alumnus
                    </h2>
                </div>
            </div>
            <HeaderIcons helpText="All aboard! Select a line or badge to begin your journey!" />
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