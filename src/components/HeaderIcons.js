import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import './HeaderIcons.css';

function HeaderIcons({ helpText, showBackButton = false }) {
    const [showHelp, setShowHelp] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const navigate = useNavigate();
    const contactRef = useRef(null);
    const helpRef = useRef(null);
    const resumeRef = useRef(null);

    useEffect(() => {
        if (!showHelp && !showContact && !showResume) return;
        const handleClickOutside = (e) => {
            if (showResume && resumeRef.current && !resumeRef.current.contains(e.target)) {
                setShowResume(false);
            }
            if (showContact && contactRef.current && !contactRef.current.contains(e.target)) {
                setShowContact(false);
            }
            if (showHelp && helpRef.current && !helpRef.current.contains(e.target)) {
                setShowHelp(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showHelp, showContact, showResume]);

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
            <div className="resume-icon-container" ref={resumeRef}>
                <button
                    className="resume-icon"
                    onClick={() => {
                        setShowResume(!showResume);
                        setShowContact(false);
                        setShowHelp(false);
                    }}
                    aria-label="Resume options"
                    title="Resume"
                >
                    <DownloadIcon fontSize="small" />
                </button>
                {showResume && (
                    <div className="resume-tooltip">
                        <p><strong>Click the link below to download my resume.</strong></p>
                        <a
                            href="/resume/FranklinMinhNguyenResume.pdf"
                            download="FranklinMinhNguyenResume.pdf"
                            onClick={() => setShowResume(false)}
                        >
                            Franklin Minh Nguyen — Resume
                        </a>
                    </div>
                )}
            </div>
            <div className="contact-icon-container" ref={contactRef}>
                <button
                    className="contact-icon"
                    onClick={() => {
                        setShowContact(!showContact);
                        setShowHelp(false);
                        setShowResume(false);
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
                            <svg className="link-arrow" viewBox="0 0 100.94268 100.48275" fill="currentColor"><g transform="translate(-43.89965,-98.258601)"><path d="m 94.600942,98.258602 10.169408,10.169408 14.95051,14.95051 11.07167,11.07167 3.87884,3.87883 10.17095,10.17096 -10.1694,10.1694 -14.95051,14.95051 -14.95051,14.95051 -10.170958,10.17096 -14.048756,-14.04979 10.169406,-10.16941 14.950508,-14.9505 1.13688,-1.13689 H 89.162515 62.225136 43.899646 l 0.001,-19.86855 h 18.32294 26.937378 l 17.649056,-5.2e-4 -1.1374,-1.1374 -14.952061,-14.95102 -10.170443,-10.17096 z" /></g></svg> Visit LinkedIn
                        </a>
                        <div className="email-row">
                            <a href="mailto:franklin@franklinminh.com">
                                <svg className="link-arrow" viewBox="0 0 100.94268 100.48275" fill="currentColor"><g transform="translate(-43.89965,-98.258601)"><path d="m 94.600942,98.258602 10.169408,10.169408 14.95051,14.95051 11.07167,11.07167 3.87884,3.87883 10.17095,10.17096 -10.1694,10.1694 -14.95051,14.95051 -14.95051,14.95051 -10.170958,10.17096 -14.048756,-14.04979 10.169406,-10.16941 14.950508,-14.9505 1.13688,-1.13689 H 89.162515 62.225136 43.899646 l 0.001,-19.86855 h 18.32294 26.937378 l 17.649056,-5.2e-4 -1.1374,-1.1374 -14.952061,-14.95102 -10.170443,-10.17096 z" /></g></svg> franklin@franklinminh.com
                            </a>
                            <button
                                className="copy-email-button"
                                onClick={() => {
                                    navigator.clipboard.writeText('franklin@franklinminh.com');
                                    setEmailCopied(true);
                                    setTimeout(() => setEmailCopied(false), 2000);
                                }}
                                aria-label="Copy email"
                            >
                                {emailCopied ? <CheckIcon sx={{ fontSize: 14, color: 'inherit' }} /> : <ContentCopyIcon sx={{ fontSize: 14, color: 'inherit' }} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="help-icon-container" ref={helpRef}>
                <button
                    className="help-icon"
                    onClick={() => {
                        setShowHelp(!showHelp);
                        setShowContact(false);
                        setShowResume(false);
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
