import '../css/app.css';
import './bootstrap';

import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        function AppWithLoader(appProps) {
            const [isNavigating, setIsNavigating] = useState(false);
            const hideTimer = React.useRef();
            const navigationStart = React.useRef();
            const minimumVisibleMs = 1000;

            useEffect(() => {
                const handleStart = () => {
                    if (hideTimer.current) {
                        window.clearTimeout(hideTimer.current);
                    }

                    navigationStart.current = Date.now();
                    setIsNavigating(true);
                };

                const handleFinish = () => {
                    const elapsed = navigationStart.current ? Date.now() - navigationStart.current : minimumVisibleMs;
                    const delay = Math.max(0, minimumVisibleMs - elapsed);

                    if (hideTimer.current) {
                        window.clearTimeout(hideTimer.current);
                    }

                    hideTimer.current = window.setTimeout(() => {
                        setIsNavigating(false);
                        navigationStart.current = null;
                        hideTimer.current = null;
                    }, delay);
                };

                Inertia.on('start', handleStart);
                Inertia.on('finish', handleFinish);
                Inertia.on('error', handleFinish);

                return () => {
                    Inertia.off('start', handleStart);
                    Inertia.off('finish', handleFinish);
                    Inertia.off('error', handleFinish);

                    if (hideTimer.current) {
                        window.clearTimeout(hideTimer.current);
                    }
                };
            }, []);

            return (
                <>
                    {isNavigating && (
                        <div className="loading-overlay" aria-live="polite">
                            <div className="loading-spinner" />
                        </div>
                    )}
                    <div className="page-wrapper">
                        <App {...appProps} />
                    </div>
                </>
            );
        }

        const root = createRoot(el);

        root.render(<AppWithLoader {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
