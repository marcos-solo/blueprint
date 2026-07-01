import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import BlueprintLogo from '@/Components/BlueprintLogo';

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);
    const isAdmin = auth?.user?.role === 'admin' || auth?.user?.role === 'super_admin';
    const userRole = auth?.user?.role;
    const currentRoute = (pattern) => route().current(pattern);

    const navItems = [
        { label: 'Home', href: route('home'), routeName: 'home' },
        { label: 'About', href: route('about'), routeName: 'about' },
        { label: 'Expertise', href: route('expertise'), routeName: 'expertise' },
        { label: 'Clients', href: route('clients'), routeName: 'clients' },
        { label: 'Accolades', href: route('accolades'), routeName: 'accolades' },
        { label: 'Blog', href: route('blogs.index'), routeName: 'blogs.*' },
        { label: 'Contact', href: route('contact'), routeName: 'contact' },
    ];

    const adminNav = [
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: '🏠' },
        { label: 'Manage Blogs', href: route('admin.blogs.index'), active: route().current('admin.blogs.*'), icon: '📝' },
        { label: 'Page Editor', href: route('admin.pages.index'), active: route().current('admin.pages.*'), icon: '⚙️' },
        { label: 'Hero Carousel', href: route('admin.hero-images.index'), active: route().current('admin.hero-images.*'), icon: '🎨' },
        { label: 'Accolades Submissions', href: route('admin.accolades.submissions.index'), active: route().current('admin.accolades.submissions.*'), icon: '🏆' },
        { label: 'Public Site', href: route('home'), active: route().current('home'), icon: '🌐' },
        { label: 'Profile', href: route('profile.edit'), active: route().current('profile.edit'), icon: '👤' },
    ];

    return (
        <>
            {isAdmin ? (
                <div className={`admin-shell${sidebarCollapsed ? ' collapsed' : ''}`}>
                    <aside className={`admin-sidebar${sidebarCollapsed ? ' collapsed' : ''}${adminMenuOpen ? ' mobile-open' : ''}`}>
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

                    {adminMenuOpen && <div className="admin-overlay" onClick={() => setAdminMenuOpen(false)} />}

                    <div className="admin-main">
                        <header className="admin-topbar">
                            <div>
                                <span className="admin-badge">Admin Portal</span>
                                {userRole && (
                                    <span className={`admin-role-pill ${userRole === 'super_admin' ? 'super' : 'admin'}`}>
                                        {userRole === 'super_admin' ? 'Super Admin' : 'Admin'}
                                    </span>
                                )}
                                <h1 style={{ margin: '0.5rem 0 0', fontSize: 'clamp(1.8rem, 2.3vw, 2.8rem)', color: 'var(--accent-blue)' }}>
                                    Blueprint Legal Management
                                </h1>
                            </div>
                            <div className="admin-actions">
                                <button
                                    type="button"
                                    className="admin-menu-toggle"
                                    onClick={() => setAdminMenuOpen((previous) => !previous)}
                                    aria-label={adminMenuOpen ? 'Close admin menu' : 'Open admin menu'}
                                >
                                    <i className={adminMenuOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true" />
                                </button>
                                <Link href="/" className="admin-action-link">View Public Site</Link>
                            </div>
                        </header>
                        <main>{children}</main>
                    </div>
                </div>
            ) : (
                <>
                    {/* Header Navigation */}
                    <header className="site-header" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--bg-tertiary)' }}>
                        <div className="navbar" id="navbar">
                            {/* Logo with Circle and Brand Name */}
                            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Link href="/" style={{ display: 'inline-block' }}>
                                    <div style={{ 
                                        width: '50px', 
                                        height: '50px', 
                                        borderRadius: '50%', 
                                        backgroundColor: '#1a2a4a',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        border: '2px solid var(--accent-gold)',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                        overflow: 'hidden',
                                        flexShrink: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.boxShadow = '0 4px 16px rgba(212, 168, 67, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                                    }}>
                                        <BlueprintLogo style={{ 
                                            maxWidth: '70%', 
                                            maxHeight: '70%', 
                                            width: 'auto', 
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }} />
                                    </div>
                                </Link>
                                
                                {/* Brand Name - Always Visible */}
                                <Link href="/" style={{ 
                                    textDecoration: 'none',
                                    color: 'var(--accent-blue)',
                                    fontWeight: 700,
                                    fontSize: '1.25rem',
                                    letterSpacing: '-0.02em',
                                    whiteSpace: 'nowrap'
                                }}>
                                    Blueprint Legal
                                </Link>
                            </div>
                            
                            {/* Mobile Menu Toggle */}
                            <div className="menu-toggle" id="menuToggle" style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                                <i className="fas fa-bars"></i>
                            </div>

                            {/* Desktop Navigation Links */}
                            <ul className="nav-links desktop-only" id="navLinks">
                                {navItems.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            style={{
                                                color: currentRoute(item.routeName) ? 'var(--accent-blue)' : 'var(--text-primary)',
                                                fontWeight: currentRoute(item.routeName) ? 700 : 500,
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
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
                                                style={{
                                                    border: '1px solid var(--accent-gold)',
                                                    background: 'var(--accent-blue)',
                                                    color: '#ffffff !important',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#d4a843';
                                                    e.target.style.color = '#1a2a4a';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'var(--accent-blue)';
                                                    e.target.style.color = '#ffffff';
                                                }}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                href={route('login')}
                                                className="nav-cta"
                                                style={{
                                                    border: '1px solid var(--accent-gold)',
                                                    background: 'var(--accent-blue)',
                                                    color: '#ffffff',
                                                    display: 'inline-block',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#d4a843';
                                                    e.target.style.color = '#1a2a4a';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'var(--accent-blue)';
                                                    e.target.style.color = '#ffffff';
                                                }}
                                            >
                                                Login to Portal
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/contact"
                                                className="nav-cta"
                                                style={{
                                                    border: '1px solid var(--accent-gold)',
                                                    background: 'var(--accent-blue)',
                                                    color: '#ffffff !important',
                                                    display: 'inline-block',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#d4a843';
                                                    e.target.style.color = '#1a2a4a';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'var(--accent-blue)';
                                                    e.target.style.color = '#ffffff';
                                                }}
                                            >
                                                Book Consultation
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </header>

                    {/* Mobile Sliding Navigation Drawer */}
                    {menuOpen && (
                        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
                            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                                <div className="drawer-header">
                                    <div className="drawer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            borderRadius: '50%', 
                                            backgroundColor: '#1a2a4a',
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            border: '2px solid var(--accent-gold)',
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        }}>
                                            <BlueprintLogo style={{ 
                                                maxWidth: '70%', 
                                                maxHeight: '70%', 
                                                width: 'auto', 
                                                height: 'auto',
                                                objectFit: 'contain'
                                            }} />
                                        </div>
                                        <span style={{ 
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            color: 'var(--accent-blue)'
                                        }}>
                                            Blueprint Legal
                                        </span>
                                    </div>
                                    <button className="drawer-close" onClick={() => setMenuOpen(false)}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <ul className="drawer-links">
                                    {navItems.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                style={{
                                                    color: currentRoute(item.routeName) ? 'var(--accent-blue)' : '#FFFFFF',
                                                    fontWeight: currentRoute(item.routeName) ? 700 : 500,
                                                }}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
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
                                                    style={{ border: '1px solid var(--accent-gold)', background: 'var(--accent-blue)', color: '#ffffff !important', cursor: 'pointer', display: 'block', width: '100%', textAlign: 'center', marginTop: '1rem' }}
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link
                                                    href={route('login')}
                                                    className="nav-cta"
                                                    style={{ border: '1px solid var(--accent-gold)', background: 'var(--accent-blue)', color: '#ffffff', display: 'block', width: '100%', textAlign: 'center', marginTop: '1rem' }}
                                                    onClick={() => setMenuOpen(false)}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = '#d4a843';
                                                        e.target.style.color = '#1a2a4a';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = 'var(--accent-blue)';
                                                        e.target.style.color = '#ffffff';
                                                    }}
                                                >
                                                    Login to Portal
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/contact"
                                                    className="nav-cta"
                                                    style={{ border: '1px solid var(--accent-gold)', background: 'var(--accent-blue)', color: '#ffffff !important', display: 'block', width: '100%', textAlign: 'center', marginTop: '0.8rem' }}
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Book a Consultation
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
 
                    {/* Main Content Area */}
                    <main>{children}</main>
 
                    {/* Footer Component */}
                    <footer 
                        className="footer footer-dark" 
                        id="contact" 
                        style={{ 
                            padding: '4rem 0 2rem',
                            backgroundColor: '#1a2a4a',
                            color: '#ffffff'
                        }}
                    >
                        <div className="container">
                            <div className="footer-grid">
                                <div>
                                    <BlueprintLogo style={{ marginBottom: '1.5rem' }} />
                                    <p style={{ 
                                        fontSize: '0.85rem', 
                                        lineHeight: '1.6', 
                                        marginBottom: '1rem',
                                        opacity: 0.85 
                                    }}>
                                        Strategic legal counsel for businesses, investors and innovators in Tanzania.
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.1em', 
                                        marginBottom: '1.25rem', 
                                        fontFamily: 'var(--font-sans)', 
                                        fontWeight: 700,
                                        color: '#d4a843'
                                    }}>
                                        Office
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.85 }}>
                                        📍 Millenium Towers II, Kijitonyama, Dar es Salaam, Tanzania
                                    </p>
                                </div>

                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.1em', 
                                        marginBottom: '1.25rem', 
                                        fontFamily: 'var(--font-sans)', 
                                        fontWeight: 700,
                                        color: '#d4a843'
                                    }}>
                                        Contact
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', lineHeight: '1.8', opacity: 0.85 }}>
                                        📞 +255 759 937 511<br />
                                        ✉ info@blueprintlegal.co.tz<br />
                                        💬 WhatsApp: +255 759 937 511
                                    </p>
                                </div>

                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.1em', 
                                        marginBottom: '1.25rem', 
                                        fontFamily: 'var(--font-sans)', 
                                        fontWeight: 700,
                                        color: '#d4a843'
                                    }}>
                                        Connect
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <p style={{ fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.85 }}>
                                            <i className="fab fa-linkedin" style={{ color: '#d4a843', width: '16px' }}></i>
                                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                                LinkedIn
                                            </a>
                                        </p>
                                        <p style={{ fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.85 }}>
                                            <i className="fab fa-instagram" style={{ color: '#d4a843', width: '16px' }}></i>
                                            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                                Instagram
                                            </a>
                                        </p>
                                        <p style={{ fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.85 }}>
                                            <i className="fab fa-facebook" style={{ color: '#d4a843', width: '16px' }}></i>
                                            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                                Facebook
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{ 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.1em', 
                                        marginBottom: '1.25rem', 
                                        fontFamily: 'var(--font-sans)', 
                                        fontWeight: 700,
                                        color: '#d4a843'
                                    }}>
                                        Hours
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.85 }}>
                                        🕒 Monday – Friday<br />
                                        9:00am – 5:00pm EAT
                                    </p>
                                </div>
                            </div>
                            
                            <div className="footer-bottom" style={{ 
                                marginTop: '3rem', 
                                paddingTop: '1.5rem', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                fontSize: '0.75rem',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                opacity: 0.7
                            }}>
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