import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LineWipe.css';

const LINE_COLORS = {
    '/experience': '#db3325',
    '/projects': '#EE8F13',
    '/skills': '#148844',
    '/': '#000000'
};

const LineWipeContext = createContext(null);

export const useLineWipe = () => useContext(LineWipeContext);

export function LineWipeProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [wipe, setWipe] = useState(null);

    const wipeTo = useCallback((path) => {
        if (path === location.pathname) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            navigate(path);
            return;
        }
        setWipe((current) => current || { path, stage: 'cover' });
    }, [location.pathname, navigate]);

    // Pages use plain "#/..." anchors, so catch them all here
    useEffect(() => {
        const handleClick = (e) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = e.target.closest?.('a[href^="#/"]');
            if (!link) return;
            e.preventDefault();
            wipeTo(link.getAttribute('href').slice(1));
        };
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [wipeTo]);

    const handleAnimationEnd = () => {
        if (wipe.stage === 'cover') {
            navigate(wipe.path);
            setWipe({ ...wipe, stage: 'reveal' });
        } else {
            setWipe(null);
        }
    };

    return (
        <LineWipeContext.Provider value={wipeTo}>
            {children}
            {wipe && (
                <div
                    className={`line-wipe ${wipe.stage}`}
                    style={{ backgroundColor: LINE_COLORS[wipe.path] }}
                    onAnimationEnd={handleAnimationEnd}
                />
            )}
        </LineWipeContext.Provider>
    );
}
