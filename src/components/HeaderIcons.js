import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import './HeaderIcons.css';

function HeaderIcons({ helpText, showBackButton = false }) {
    const [showHelp, setShowHelp] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const navigate = useNavigate();
    const contactRef = useRef(null);
    const helpRef = useRef(null);

    useEffect(() => {
        if (!showHelp && !showContact) return;
        const handleClickOutside = (e) => {
            if (showContact && contactRef.current && !contactRef.current.contains(e.target)) {
                setShowContact(false);
            }
            if (showHelp && helpRef.current && !helpRef.current.contains(e.target)) {
                setShowHelp(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showHelp, showContact]);

    return (
        <>
            {showBackButton && (
                <div className="back-button-container">
                    <button
                        className="back-button"
                        onClick={() => navigate('/')}
                        aria-label="Back to home"
                    >
                        <img src="/images/backButton.svg" alt="Back" />
                    </button>
                </div>
            )}
            <div className="contact-icon-container" ref={contactRef}>
                <button
                    className="contact-icon"
                    onClick={() => {
                        setShowContact(!showContact);
                        setShowHelp(false);
                    }}
                    aria-label="Contact"
                >
                    <MailOutlineIcon fontSize="small" />
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
                        <a href="mailto:franklin@franklinminh.com">
                            ➟ franklin@franklinminh.com
                        </a>
                    </div>
                )}
            </div>
            <div className="help-icon-container" ref={helpRef}>
                <button
                    className="help-icon"
                    onClick={() => {
                        setShowHelp(!showHelp);
                        setShowContact(false);
                    }}
                    aria-label="Help"
                >
                    <QuestionMarkIcon fontSize="small" />
                </button>
                {showHelp && (
                    <div className="help-tooltip">
                        <p>{helpText}</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default HeaderIcons;
