import React from 'react';

export default function BlueprintLogo({ className = '', style = {}, textColor = 'var(--accent-blue)', isWhite = false }) {
    const finalTextColor = isWhite ? '#ffffff' : textColor;
    return (
        <div className={`blueprint-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', ...style }}>
            <img 
                src={isWhite ? "/images/blueprint-white-1.png" : "/images/blueprint-blue-1.png"} 
                alt="Blueprint Legal Logo" 
                style={{ 
                    height: '40px', 
                    width: 'auto', 
                    flexShrink: 0,
                    objectFit: 'contain'
                }} 
            />
            <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: '700',
                color: finalTextColor,
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap'
            }}>
                Blueprint Legal
            </span>
        </div>
    );
}
