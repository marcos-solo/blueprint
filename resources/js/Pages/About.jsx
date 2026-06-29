import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function About({ contents = {} }) {
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

                    {/* Firm Overview Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'start' }} className="grid-2">
                        <div>
                            <span className="section-subtitle">{contents.overview_subtitle || "Who We Are"}</span>
                            <h2 className="section-title" style={{ fontSize: '2.2rem', marginTop: '0.5rem' }}>{contents.overview_title || "Strategic Corporate Counsel for East Africa"}</h2>
                            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8' }}>
                                {contents.overview_desc_1 || "Blueprint Legal is a commercially minded law firm based in Dar es Salaam, Tanzania. We partner with local companies, regional founders, foreign investors, and global brand owners to confidently navigate complex regulatory and business landscapes."}
                            </p>
                            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8' }}>
                                {contents.overview_desc_2 || "Our operational philosophy is centered on direct partner access, clear legal updates, and strategic foresight. We strip away unnecessary legal jargon, presenting risk assessments in clear, actionable business terms so you can make informed decisions."}
                            </p>
                        </div>
                        <div>
                            <span className="section-subtitle">{contents.sets_apart_subtitle || "What Sets Us Apart"}</span>
                            <h2 className="section-title" style={{ fontSize: '2.2rem', marginTop: '0.5rem' }}>{contents.sets_apart_title || "Bespoke Advocacy"}</h2>
                            
                            <div className="proof-points" style={{ marginTop: '1.5rem' }}>
                                <div className="proof-item">
                                    <div className="proof-item-icon">
                                        <i className="fas fa-briefcase"></i>
                                    </div>
                                    <div className="proof-item-text">
                                        <span className="proof-item-title">{contents.sets_apart_p1_title || "Commercial Clarity"}</span>
                                        <span className="proof-item-desc">{contents.sets_apart_p1_desc || "Solutions designed around your business constraints and long-term milestones."}</span>
                                    </div>
                                </div>
                                <div className="proof-item">
                                    <div className="proof-item-icon">
                                        <i className="fas fa-comment-dots"></i>
                                    </div>
                                    <div className="proof-item-text">
                                        <span className="proof-item-title">{contents.sets_apart_p2_title || "Direct Partner Involvement"}</span>
                                        <span className="proof-item-desc">{contents.sets_apart_p2_desc || "Your matter is handled directly by senior specialists with years of market tenure."}</span>
                                    </div>
                                </div>
                                <div className="proof-item">
                                    <div className="proof-item-icon">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <div className="proof-item-text">
                                        <span className="proof-item-title">{contents.sets_apart_p3_title || "Regulatory Foresight"}</span>
                                        <span className="proof-item-desc">{contents.sets_apart_p3_desc || "Deep relationships with key regulatory bodies to anticipate policy shifts before they impact operations."}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission, Vision, and Experience block */}
                    <div className="glass-panel" style={{ padding: '3.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }} className="grid-3">
                            <div>
                                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', fontSize: '1.25rem' }}>
                                    🎯 {contents.values_vision_title || "Our Vision"}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                    {contents.values_vision_content || "To stand as the premier commercial law firm in Tanzania and East Africa, recognized for unlocking growth opportunities, facilitating cross-border transactions, and securing client assets."}
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', fontSize: '1.25rem' }}>
                                    🛡️ {contents.values_mission_title || "Our Mission"}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                    {contents.values_mission_content || "To provide exceptional, client-focused legal advisory services that clear regulatory hurdles and protect critical innovations. We frame counsel to build the \"how\" rather than just the \"no\"."}
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700', fontSize: '1.25rem' }}>
                                    💼 {contents.values_experience_title || "Our Experience"}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                    {contents.values_experience_content || "Our professionals offer deep sector experience, advising tech companies, multinational brands, industrial firms, and foreign funds in corporate structures, intellectual property, and commercial disputes."}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
