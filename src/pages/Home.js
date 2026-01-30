import './Home.css';
import TransitMap from '../components/TransitMap';
import CursorTrail from '../components/CursorTrail';
import { useState } from 'react';

function Home() {
    const [showHelp, setShowHelp] = useState(false);

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
                <div className="help-icon-container">
                    <button
                        className="help-icon"
                        onClick={() => setShowHelp(!showHelp)}
                        aria-label="Help"
                    >
                        ?
                    </button>
                    {showHelp && (
                        <div className="help-tooltip">
                            <p>Click on any transit line to explore that section!</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="bio-container">
                <p className="bio-text">
                    Hi! I'm Franklin, a developer with a B.S. in Computer Science and Molecular Biology and robust experience building full-stack GUI and web applications. I'm largely interested using my skillset for medtech, climate, and urban planning. Outside of work, I enjoy group fitness classes, dance numbers, and trying new food.
                </p>
            </div>
            {showHelp && (
                <div
                    className="help-backdrop"
                    onClick={() => setShowHelp(false)}
                />
            )}
            <div className="content-container">
                <TransitMap />
            </div>
        </div>
    );
}
export default Home;