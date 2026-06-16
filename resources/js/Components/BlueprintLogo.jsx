import React from 'react';

export default function BlueprintLogo({ className = '', style = {} }) {
    return (
        <div className={`blueprint-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', ...style }}>
            <img 
                src="/images/blueprint-logo.png" 
                alt="Blueprint Legal Logo" 
                style={{ 
                    height: '40px', 
                    width: 'auto', 
                    flexShrink: 0,
                    objectFit: 'contain'
                }} 
            />
        </div>
    );
}
