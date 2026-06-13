import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function About() {
    return (
        <Layout>
            <Head title="About the Firm & Founder | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header Banner */}
                    <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>About Us</span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Founder-Led Legal Advocacy</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            We partner with businesses, investors, and innovators to navigate the regulatory and commercial landscapes of Tanzania.
                        </p>
                    </div>

                    {/* Founder Grid */}
                    <div className="founder-grid" style={{ marginBottom: '4rem' }}>
                        <div className="founder-image" style={{ backgroundImage: 'url(/images/founder_jabari.png)', height: '400px', borderRadius: '8px', boxShadow: 'var(--card-shadow)' }}>
                            <span style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: 'bold' }}>Founder</span>
                        </div>
                        <div>
                            <span className="section-subtitle">Leadership</span>
                            <h2 className="section-title">Personal counsel. Practical solutions.</h2>
                            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8' }}>
                                Blueprint Legal is led by a dedicated Tanzanian advocate with a commercial mindset and a commitment to delivering high-quality, responsive legal service. We understand that business decisions require speed, clarity, and deep market insights.
                            </p>
                            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8' }}>
                                Our advisory model is simple: partner directly with clients, deliver objective, risk-aware, and actionable guidance, and remove unnecessary legal complexity.
                            </p>

                            <div className="proof-points" style={{ marginTop: '2.5rem' }}>
                                <div className="proof-item">
                                    <div className="proof-item-icon">
                                        <i className="fas fa-briefcase"></i>
                                    </div>
                                    <div className="proof-item-text">
                                        <span className="proof-item-title">Business-focused advice</span>
                                        <span className="proof-item-desc">Solutions that are practical, risk-aware and aligned with your objectives.</span>
                                    </div>
                                </div>
                                <div className="proof-item">
                                    <div className="proof-item-icon">
                                        <i className="fas fa-comment-dots"></i>
                                    </div>
                                    <div className="proof-item-text">
                                        <span className="proof-item-title">Responsive service</span>
                                        <span className="proof-item-desc">Direct partner involvement and clear, timely communication.</span>
                                    </div>
                                </div>
                                <div className="proof-item">
                                    <div className="proof-item-icon">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <div className="proof-item-text">
                                        <span className="proof-item-title">Tanzania market knowledge</span>
                                        <span className="proof-item-desc">Local insight with a global outlook to help you navigate with confidence.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission and values panel */}
                    <div className="glass-panel" style={{ padding: '3rem', background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    🎯 Our Vision
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    To be the premier corporate law firm in East Africa for local and international builders, recognized for unlocking growth opportunities and protecting critical assets.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    🛡️ Core Philosophy
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    Advocacy is about enabling, not blocking. We frame our legal advice around commercial constraints, providing the "how" rather than just the "no".
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
