import './Home.css';
import TransitMap from '../components/TransitMap';
import { useState } from 'react';

function Home() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div className="home-container">
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
                    I'm an MIT grad (B.S. in Computer Science and Molecular Biology) passionate about building full-stack GUI and web applications. I'm largely interested using my skills for medtech, climate, and urban planning. In my personal life, I love fitness and dance classes, trying out new restaurants, and going to concerts.
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