import './Home.css';
import TransitMap from '../components/TransitMap';
import CursorTrail from '../components/CursorTrail';
import { useState } from 'react';

function Home() {
    const [showHelp, setShowHelp] = useState(false);
    const [showContact, setShowContact] = useState(false);

    return (
        <div className="home-container">
            <CursorTrail />
            <div className="header-container">
                <img src="/images/fLogo.svg" alt="fLogo" className="logo-img" />
                <div className="title-container">
                    <h1>Franklin Nguyen</h1>
                    <h2 className='subtitle-text'>
                        Software Engineer & MIT Alumnus
                    </h2>
                </div>
                <div className="contact-icon-container">
                    <button
                        className="contact-icon"
                        onClick={() => {
                            setShowContact(!showContact);
                            setShowHelp(false);
                        }}
                        aria-label="Contact"
                    >
                        in
                    </button>
                    {showContact && (
                        <div className="contact-tooltip">
                            <p><strong>Let's connect!</strong></p>
                            <a
                                href="https://www.linkedin.com/in/franklinminh/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ➜ Visit LinkedIn
                            </a>
                        </div>
                    )}
                </div>
                <div className="help-icon-container">
                    <button
                        className="help-icon"
                        onClick={() => {
                            setShowHelp(!showHelp);
                            setShowContact(false);
                        }}
                        aria-label="Help"
                    >
                        ?
                    </button>
                    {showHelp && (
                        <div className="help-tooltip">
                            <p>All aboard! Select a line or badge to begin your journey!</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="bio-container">
                <p className="bio-text">
                    Hi! I'm Franklin, a developer with a B.S. in Computer Science and Molecular Biology and experience building full-stack GUI and web applications. I'm largely interested using my skillset for medtech, climate solutions, and urban planning. Outside of work, I enjoy group fitness classes, dance numbers, and trying new food.
                </p>
            </div>
            {showHelp && (
                <div
                    className="help-backdrop"
                    onClick={() => setShowHelp(false)}
                />
            )}
            {showContact && (
                <div
                    className="contact-backdrop"
                    onClick={() => setShowContact(false)}
                />
            )}
            <div className="content-container">
                <TransitMap />
            </div>

            <div className="home-nav-badges">
                <a href="/experience" className="page-badge">
                    <img src="/images/experienceBadge.svg" alt="Experience" />
                </a>
                <a href="/projects" className="page-badge">
                    <img src="/images/projectsBadge.svg" alt="Projects" />
                </a>
                <a href="/skills" className="page-badge">
                    <img src="/images/skillsBadge.svg" alt="Skills" />
                </a>
            </div>
        </div>
    );
}
export default Home;