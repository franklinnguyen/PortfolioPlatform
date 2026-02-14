import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderIcons.css';

function HeaderIcons({ helpText, showBackButton = false }) {
    const [showHelp, setShowHelp] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            {showBackButton && (
                <div className="back-button-container">
                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                        aria-label="Back to home"
                    >
                        <span className="back-arrow">➤</span>
                    </button>
                </div>
            )}
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
                            ➟ Visit LinkedIn
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
                        <p>{helpText}</p>
                    </div>
                )}
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
        </>
    );
}

export default HeaderIcons;
