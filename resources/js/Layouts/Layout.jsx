import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import BlueprintLogo from '@/Components/BlueprintLogo';

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Header Navigation */}
            <header className="site-header" style={{ backgroundColor: 'var(--accent-blue)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className={`navbar ${menuOpen ? 'responsive' : ''}`} id="navbar">
                    <div className="logo">
                        <Link href="/">
                            <BlueprintLogo />
                        </Link>
                    </div>
                    <div className="menu-toggle" id="menuToggle" style={{ color: '#ffffff' }} onClick={() => setMenuOpen(!menuOpen)}>
                        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                    
                    <ul className="nav-links" id="navLinks">
                        <li><a href="/#home" style={{ color: '#ffffff' }} onClick={() => setMenuOpen(false)}>Home</a></li>
                        <li><a href="/#about" style={{ color: '#ffffff' }} onClick={() => setMenuOpen(false)}>About</a></li>
                        <li><a href="/#expertise" style={{ color: '#ffffff' }} onClick={() => setMenuOpen(false)}>Expertise</a></li>
                        <li><a href="/#insights" style={{ color: '#ffffff' }} onClick={() => setMenuOpen(false)}>Insights</a></li>
                        <li><a href="/#schedule" style={{ color: '#ffffff' }} onClick={() => setMenuOpen(false)}>Contact</a></li>
                        {auth?.user ? (
                            <>
                                <li>
                                    <Link href={route('dashboard')} onClick={() => setMenuOpen(false)} style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button" 
                                        className="nav-cta" 
                                        style={{ border: '1px solid var(--accent-gold)', background: 'transparent', color: 'var(--accent-gold) !important', cursor: 'pointer', display: 'inline-block', width: '100%', textAlign: 'center' }} 
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <a 
                                    href="/#schedule" 
                                    className="nav-cta" 
                                    style={{ border: '1px solid var(--accent-gold)', background: 'transparent', color: 'var(--accent-gold) !important', display: 'inline-block', width: '100%', textAlign: 'center' }} 
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Book a Consultation
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </header>

            {/* Main Content Area */}
            <main>{children}</main>

            {/* Footer Component */}
            <footer className="footer" id="contact" style={{ backgroundColor: 'var(--accent-blue)', color: '#b9c7db', padding: '4rem 0 2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="container">
                    <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: '2rem' }}>
                        <div>
                            <BlueprintLogo style={{ marginBottom: '1.5rem' }} />
                            <p style={{ color: '#b9c7db', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                                Strategic legal counsel for businesses, investors and innovators in Tanzania.
                            </p>
                        </div>
                        
                        <div>
                            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                                Office
                            </h4>
                            <p style={{ color: '#b9c7db', fontSize: '0.85rem', lineHeight: '1.6' }}>
                                📍 Dar es Salaam, Tanzania<br /><br />
                                Office location available upon request.
                            </p>
                        </div>

                        <div>
                            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                                Contact
                            </h4>
                            <p style={{ color: '#b9c7db', fontSize: '0.85rem', lineHeight: '1.8' }}>
                                📞 +255 759 937 511<br />
                                ✉ info@blueprintlegal.co.tz<br />
                                💬 WhatsApp: +255 759 937 511
                            </p>
                        </div>

                        <div>
                            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                                Connect
                            </h4>
                            <p style={{ color: '#b9c7db', fontSize: '0.85rem', lineHeight: '1.8' }}>
                                <i className="fab fa-linkedin" style={{ marginRight: '0.5rem', color: 'var(--accent-gold)' }}></i>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#b9c7db', textDecoration: 'none' }}>
                                    LinkedIn<br />
                                    <span style={{ fontSize: '0.75rem', opacity: 0.8, paddingLeft: '1.3rem' }}>Blueprint Legal</span>
                                </a>
                            </p>
                        </div>

                        <div>
                            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                                Hours
                            </h4>
                            <p style={{ color: '#b9c7db', fontSize: '0.85rem', lineHeight: '1.6' }}>
                                🕒 Monday – Friday<br />
                                9:00am – 5:00pm EAT
                            </p>
                        </div>
                    </div>
                    
                    <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#8899b0' }}>
                        <p>© {new Date().getFullYear()} Blueprint Legal. All rights reserved.</p>
                        <p>Attorney Advertising.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
