import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './globals.css';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);

// Signal for vite-plugin-prerender to capture HTML after app has mounted
if (typeof document !== 'undefined') {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.dispatchEvent(new Event('render-event'));
        });
    });
}
