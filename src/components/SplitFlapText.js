import { useEffect, useState } from 'react';
import './SplitFlapText.css';

// Scramble with letters about as wide as the final one, so they fit its slot without overlapping
const flapCharsFor = (char) => {
    if ('ijlftrI'.includes(char)) return 'ijlftr';
    if (char >= 'A' && char <= 'Z') return 'ABDEHKNPRSU';
    return 'acenosuvxz';
};
const TICK_MS = 70;
const START_DELAY_MS = 400;
const STAGGER_MS = 37;

function SplitFlapText({ text }) {
    const totalMs = START_DELAY_MS + text.length * STAGGER_MS;
    const [elapsed, setElapsed] = useState(() =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ? totalMs : 0
    );

    useEffect(() => {
        if (elapsed >= totalMs) return undefined;
        const start = performance.now();
        const interval = setInterval(() => {
            const time = performance.now() - start;
            setElapsed(time);
            if (time >= totalMs) clearInterval(interval);
        }, TICK_MS);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalMs]);

    let charIndex = 0;
    return (
        <>
            <span className="split-flap-sr">{text}</span>
            <span aria-hidden="true">
                {text.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex}>
                        {wordIndex > 0 && ' '}
                        <span className="split-flap-word">
                            {word.split('').map((char, i) => {
                                const settled = elapsed >= START_DELAY_MS + charIndex++ * STAGGER_MS;
                                const flapChars = flapCharsFor(char);
                                return (
                                    // The final character always holds the width, so the line never shifts
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
