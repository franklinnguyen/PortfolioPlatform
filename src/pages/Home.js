import { useEffect, useState } from 'react';
import './Home.css';
import TransitMap from '../components/TransitMap';
import HeaderIcons from '../components/HeaderIcons';
import SplitFlapText from '../components/SplitFlapText';
import bio from '../data/bio.js';

const NAV_BADGES = [
    { line: 'experience', href: '#/experience', src: '/images/experienceBadge.svg', alt: 'Experience' },
    { line: 'projects', href: '#/projects', src: '/images/projectsBadge.svg', alt: 'Projects' },
    { line: 'skills', href: '#/skills', src: '/images/skillsBadge.svg', alt: 'Skills' }
];

function Home() {
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [highlightedLine, setHighlightedLine] = useState(null);

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
                        <SplitFlapText text="Software Engineer & MIT Alumnus" />
                    </h2>
                </div>
            </div>
            <div className="home-header-icons">
                <HeaderIcons helpText="Select a line to begin. Transfer between lines using the badges." />
            </div>
            <div className="bio-container">
                <p className="bio-text">
                    {bio}
                </p>
            </div>
            <div className="content-container">
                <TransitMap highlightedLine={highlightedLine} />
            </div>

            <div className="home-nav-badges">
                {NAV_BADGES.map(({ line, href, src, alt }) => (
                    <a
                        key={line}
                        href={href}
                        className="page-badge"
                        onMouseEnter={() => setHighlightedLine(line)}
                        onMouseLeave={() => setHighlightedLine(null)}
                        onFocus={() => setHighlightedLine(line)}
                        onBlur={() => setHighlightedLine(null)}
                    >
                        <img src={src} alt={alt} />
                    </a>
                ))}
            </div>
        </div>
    );
}
export default Home;
