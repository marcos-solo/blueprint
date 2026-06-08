import React from 'react';

export default function BlueprintLogo({ className = '', style = {} }) {
    return (
        <div className={`blueprint-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', ...style }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                {/* Monogram Hexagon Background */}
                <path d="M50 5L90 28.1V71.9L50 95L10 71.9V28.1L50 5Z" fill="#061D3B" stroke="#C9A35B" strokeWidth="4" />
                {/* Stylized 'B' in Gold */}
                <path d="M32 28V72H48C55 72 61 67 61 61C61 56 57 52 52 50C57 48 59 44 59 39C59 33 54 28 46 28H32ZM42 36H46C49 36 50 37 50 39C50 41 49 43 46 43H42V36ZM42 51H48C51 51 52 53 52 56C52 59 51 64 48 64H42V51Z" fill="#C9A35B" />
                {/* Stylized 'L' in White, slightly overlapping */}
                <path d="M54 53H60V66H72V72H54V53Z" fill="#FFFFFF" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.05', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.05em', color: '#FFFFFF' }}>BLUEPRINT</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.3em', color: 'var(--accent-gold)' }}>LEGAL</span>
            </div>
        </div>
    );
}
