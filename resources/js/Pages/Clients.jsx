import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Clients({ contents = {} }) {
    const clientsList = [
        {
            icon: 'fa-rocket',
            title: 'Startups & Tech Founders',
            description: 'We help tech builders establish optimal shareholdings, secure intellectual property, and negotiate venture terms. We clear compliance paths with BRELA, TCRA, and COSTECH so you can focus on building scale.'
        },
        {
            icon: 'fa-chart-line',
            title: 'SMEs & Growing Businesses',
            description: 'From routine corporate governance and robust employment contracts to tax compliance and commercial disputes, we provide ongoing counsel that lets you run daily operations with zero legal anxiety.'
        },
        {
            icon: 'fa-globe',
            title: 'Foreign Direct Investors',
            description: 'We guide international companies entering the East African market. We secure TIC certificates, arrange local partnership agreements, structure joint ventures, and handle local compliance filings.'
        },
        {
            icon: 'fa-trademark',
            title: 'Brand & Patent Owners',
            description: 'We register and enforce critical trademarks, copyrights, and patents. We draft cross-border license agreements and defend against brand infringements or unauthorized copycats.'
        },
        {
            icon: 'fa-building',
            title: 'Property & Infrastructure Developers',
            description: 'We assist developers, land owners, and investment funds with rigorous title audits, joint-venture developments, project financing reviews, lease structures, and construction dispute mitigation.'
        },
        {
            icon: 'fa-handshake',
            title: 'Corporate Alliances & JVs',
            description: 'We design legal frameworks for partnerships, consortiums, and joint ventures. We make sure risks are apportioned correctly, and operational alignment is locked in.'
        }
    ];

    return (
        <Layout>
            <Head title="Who We Serve | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header Section */}
                    <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                            {contents.header_subtitle || "Who We Serve"}
                        </span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
                            {contents.header_title || "Our Clients, Our Priority"}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            {contents.header_description || "Blueprint Legal advises a diverse client base, ranging from early-stage innovators to international investors, providing tailored guidance that supports commercial ambition."}
                        </p>
                    </div>

                    {/* Client Profiles Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {clientsList.map((client, idx) => (
                            <div 
                                key={idx} 
                                className="glass-panel" 
                                style={{ 
                                    padding: '2.5rem 2rem', 
                                    background: 'var(--bg-secondary)', 
                                    border: '1px solid var(--bg-tertiary)', 
                                    borderRadius: '8px',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--bg-tertiary)';
                                }}
                            >
                                <div style={{ 
                                    width: '3.2rem', 
                                    height: '3.2rem', 
                                    borderRadius: '50%', 
                                    border: '1.5px solid var(--accent-gold)', 
                                    color: 'var(--accent-gold)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontSize: '1.3rem', 
                                    marginBottom: '1.5rem',
                                    backgroundColor: 'var(--bg-primary)'
                                }}>
                                    <i className={`fas ${client.icon}`}></i>
                                </div>
                                <h3 style={{ color: 'var(--accent-blue)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                                    {client.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                                    {client.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="cta-banner">
                        <div className="cta-left">
                            <div className="cta-icon">
                                <i className="fas fa-comments"></i>
                            </div>
                            <div className="cta-text">
                                <h2>Are you ready to scale securely?</h2>
                                <p>Get in touch with us to schedule a initial advisory briefing.</p>
                            </div>
                        </div>
                        <div>
                            <Link href="/contact" className="btn btn-gold" style={{ padding: '0.85rem 2rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '4px', display: 'inline-block' }}>
                                Consult Our Team &rarr;
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
