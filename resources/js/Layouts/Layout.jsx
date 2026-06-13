import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import BlueprintLogo from '@/Components/BlueprintLogo';

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const isAdmin = auth?.user?.is_admin;

    const adminNav = [
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: '🏠' },
        { label: 'Manage Blogs', href: route('admin.blogs.index'), active: route().current('admin.blogs.*'), icon: '📝' },
        { label: 'Public Site', href: '/', active: route().current('/'), icon: '🌐' },
        { label: 'Profile', href: route('profile.edit'), active: route().current('profile.edit'), icon: '👤' },
    ];

    return (
        <>
            {isAdmin ? (
                <div className={`admin-shell${sidebarCollapsed ? ' collapsed' : ''}`}>
                    <aside className={`admin-sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
                        <div className="sidebar-brand">
                            <Link href="/" className="sidebar-logo">
                                <BlueprintLogo />
                            </Link>
                            {!sidebarCollapsed && <div className="sidebar-title">Partner Console</div>}
                        </div>
                        <nav className="sidebar-nav">
                            {adminNav.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`sidebar-link${item.active ? ' active' : ''}${sidebarCollapsed ? ' collapsed' : ''}`}
                                >
                                    <span className="sidebar-icon">{item.icon}</span>
                                    <span className="sidebar-label">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="sidebar-footer">
                            <Link href={route('logout')} method="post" as="button" className={`sidebar-logout${sidebarCollapsed ? ' collapsed' : ''}`}>
                                <span className="sidebar-icon">🔒</span>
                                <span className="sidebar-label">Logout</span>
                            </Link>
                            <button
                                type="button"
                                className="sidebar-toggle"
                                onClick={() => setSidebarCollapsed((previousState) => !previousState)}
                            >
                                {sidebarCollapsed ? '»' : '«'}
                                <span className="sidebar-toggle-label">
                                    {sidebarCollapsed ? 'Expand' : 'Collapse'}
                                </span>
                            </button>
                        </div>
                    </aside>

                    <div className="admin-main">
                        <header className="admin-topbar">
                            <div>
                                <span className="admin-badge">Admin Portal</span>
                                <h1 style={{ margin: '0.5rem 0 0', fontSize: 'clamp(1.8rem, 2.3vw, 2.8rem)', color: 'var(--accent-blue)' }}>
                                    Blueprint Legal Management
                                </h1>
                            </div>
                            <div className="admin-actions">
                                <Link href="/" className="admin-action-link">View Public Site</Link>
                            </div>
                        </header>
                        <main>{children}</main>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header Navigation */}
                    <header className="site-header" style={{ backgroundColor: 'var(--accent-blue)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div className="navbar" id="navbar">
                            <div className="logo">
                                <Link href="/">
                                    <BlueprintLogo />
                                </Link>
                            </div>
                            <div className="menu-toggle" id="menuToggle" style={{ color: '#ffffff', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                                <i className="fas fa-bars"></i>
                            </div>
                            
                            {/* Desktop-only Navigation Links */}
                            <ul className="nav-links desktop-only" id="navLinks">
                                <li><Link href="/" style={{ color: '#ffffff' }}>Home</Link></li>
                                <li><Link href="/about" style={{ color: '#ffffff' }}>About</Link></li>
                                <li><Link href="/expertise" style={{ color: '#ffffff' }}>Expertise</Link></li>
                                <li><Link href="/blogs" style={{ color: '#ffffff' }}>Blog</Link></li>
                                <li><Link href="/contact" style={{ color: '#ffffff' }}>Contact</Link></li>
                                {auth?.user ? (
                                    <>
                                        <li>
                                            <Link href={route('dashboard')} style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href={route('logout')} 
                                                method="post" 
                                                as="button" 
                                                className="nav-cta" 
                                                style={{ border: '1px solid var(--accent-gold)', background: 'transparent', color: 'var(--accent-gold) !important', cursor: 'pointer' }} 
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link 
                                            href="/contact" 
                                            className="nav-cta" 
                                            style={{ border: '1px solid var(--accent-gold)', background: 'transparent', color: 'var(--accent-gold) !important', display: 'inline-block' }} 
                                        >
                                            Book a Consultation
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </header>

                    {/* Mobile Sliding Navigation Drawer */}
                    {menuOpen && (
                        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
                            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                                <div className="drawer-header">
                                    <div className="drawer-logo">
                                        <BlueprintLogo />
                                    </div>
                                    <button className="drawer-close" onClick={() => setMenuOpen(false)}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <ul className="drawer-links">
                                    <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                    <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                                    <li><Link href="/expertise" onClick={() => setMenuOpen(false)}>Expertise</Link></li>
                                    <li><Link href="/blogs" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                                    <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                                    {auth?.user ? (
                                        <>
                                            <li>
                                                <Link href={route('dashboard')} onClick={() => setMenuOpen(false)} style={{ color: 'var(--accent-gold)', fontWeight: 600, display: 'block', padding: '0.5rem 0' }}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href={route('logout')} 
                                                    method="post" 
                                                    as="button" 
                                                    className="nav-cta" 
                                                    style={{ border: '1px solid var(--accent-gold)', background: 'transparent', color: 'var(--accent-gold) !important', cursor: 'pointer', display: 'block', width: '100%', textAlign: 'center', marginTop: '1rem' }} 
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <Link 
                                                href="/contact" 
                                                className="nav-cta" 
                                                style={{ border: '1px solid var(--accent-gold)', background: 'transparent', color: 'var(--accent-gold) !important', display: 'block', width: '100%', textAlign: 'center', marginTop: '1rem' }} 
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                Book a Consultation
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Main Content Area */}
                    <main>{children}</main>

                    {/* Footer Component */}
                    <footer className="footer" id="contact" style={{ backgroundColor: 'var(--accent-blue)', color: '#b9c7db', padding: '4rem 0 2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="container">
                            <div className="footer-grid">
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
            )}
        </>
    );
}
