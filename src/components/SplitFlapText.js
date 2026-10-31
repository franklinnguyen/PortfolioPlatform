import { useEffect, useState } from 'react';
import './SplitFlapText.css';

// Letters about as wide as the final one, so they fit its slot
const flapCharsFor = (char) => {
    if ('ijlftrI'.includes(char)) return 'ijlftr';
    if (char >= 'A' && char <= 'Z') return 'ABDEHKNPRSU';
    return 'acenosuvxz';
};
const TICK_MS = 60;
const START_DELAY_MS = 300;
const STAGGER_MS = 29;

// Outlives page changes but not a reload, so the flip plays once per visit
let hasPlayedFlip = false;

function SplitFlapText({ text }) {
    const totalMs = START_DELAY_MS + text.length * STAGGER_MS;
    const [skipFlip] = useState(() =>
        hasPlayedFlip || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    const [elapsed, setElapsed] = useState(skipFlip ? totalMs : 0);

    useEffect(() => {
        hasPlayedFlip = true;
        if (skipFlip) return undefined;
        const start = performance.now();
        const interval = setInterval(() => {
            const time = performance.now() - start;
            setElapsed(time);
            if (time >= totalMs) clearInterval(interval);
        }, TICK_MS);
        return () => clearInterval(interval);
    }, [totalMs, skipFlip]);

    let charIndex = 0;
    return (
        <>
            <span className="split-flap-sr">{text}</span>
            <span aria-hidden="true" className={skipFlip ? 'split-flap-still' : ''}>
                {text.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex}>
                        {wordIndex > 0 && ' '}
                        <span className="split-flap-word">
                            {word.split('').map((char, i) => {
                                const settled = elapsed >= START_DELAY_MS + charIndex++ * STAGGER_MS;
                                const flapChars = flapCharsFor(char);
                                return (
                                    <span key={i} className={`split-flap-char ${settled ? 'settled' : ''}`}>
                                        <span className="split-flap-final">{char}</span>
                                        {!settled && (
                                            <span className="split-flap-scramble">
                                                {flapChars[Math.floor(Math.random() * flapChars.length)]}
                                            </span>
                                        )}
                                    </span>
                                );
                            })}
                        </span>
                    </span>
                ))}
            </span>
        </>
    );
}

export default SplitFlapText;
