import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {
    return (
        <Layout>
            <Head>
                <title>Blueprint Legal | Commercial Law Firm Tanzania | Founder-Led Advocacy</title>
                <meta name="description" content="Blueprint Legal provides practical, commercially focused legal support to companies, founders, investors and brand owners operating in Tanzania." />
                <meta name="keywords" content="Tanzania law firm, Dar es Salaam lawyer, commercial law Tanzania, trademark lawyer Tanzania, business lawyer" />
            </Head>

            {/* HERO SECTION: Dark navy, 2 buttons, right-side image */}
            <section className="hero" id="home">
                <div className="container">
                    <div className="hero-grid">
                        <div>
                            <h1 className="hero-title">
                                Strategic legal counsel for businesses, investors and innovators in <span>Tanzania.</span>
                            </h1>
                            <p className="hero-description">
                                Blueprint Legal provides practical, commercially focused legal support to companies, founders, investors and brand owners operating in Tanzania.
                            </p>
                            <div className="hero-buttons">
                                <Link href="/contact" className="btn-primary">Book a Consultation &rarr;</Link>
                                <Link href="/expertise" className="btn-secondary">View Expertise &rarr;</Link>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img src="/images/hero_boardroom.png" alt="Blueprint Legal Boardroom" />
                            <div className="placeholder-text">Premium Legal Counsel</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE STRIP: 3 items with line icons & navy background */}
            <div className="value-strip">
                <div className="container">
                    <div className="value-grid">
                        <div className="value-item">
                            <i className="fas fa-bullseye"></i>
                            <div className="value-item-text">
                                <h4>Commercial Clarity</h4>
                                <p>Clear, practical advice aligned with your business goals.</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="value-item-text">
                                <h4>Local Insight</h4>
                                <p>Deep understanding of Tanzanian law, markets and regulators.</p>
                            </div>
                        </div>
                        <div className="value-item">
                            <i className="fas fa-globe"></i>
                            <div className="value-item-text">
                                <h4>Cross-Border Support</h4>
                                <p>Trusted counsel for regional and international transactions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRACTICE AREAS TEASER */}
            <section className="section" id="expertise">
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="section-subtitle">Expertise</span>
                        <h2 className="section-title">Focused Practice. Commercial Impact.</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            We offer specialized, business-minded legal services in Tanzania's most active commercial sectors.
                        </p>
                    </div>
                    <div className="expertise-grid">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-building"></i></div>
                            <h3>Corporate & Commercial</h3>
                            <p>Company formation, contracts, M&A, joint ventures and ongoing commercial support.</p>
                            <Link href="/expertise" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-registered"></i></div>
                            <h3>Intellectual Property</h3>
                            <p>Trademarks, patents, copyright and brand protection strategies.</p>
                            <Link href="/expertise" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-balance-scale"></i></div>
                            <h3>Dispute Resolution</h3>
                            <p>Commercial disputes, mediation, arbitration and litigation support.</p>
                            <Link href="/expertise" className="card-link">&rarr;</Link>
                        </div>
                    </div>
                    
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link href="/expertise" className="btn btn-outline" style={{ padding: '0.75rem 2rem', fontWeight: '600' }}>
                            View All Practice Areas &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOUNDER TEASER */}
            <section className="section section-alt" id="founder" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div className="founder-grid">
                        <div className="founder-image" style={{ backgroundImage: 'url(/images/founder_jabari.png)', height: '350px', borderRadius: '8px' }}>
                            <span>Founder</span>
                        </div>
                        <div>
                            <span className="section-subtitle">Founder Perspective</span>
                            <h2 className="section-title">Personal Counsel. Practical Solutions.</h2>
                            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                Blueprint Legal is led by a dedicated Tanzanian advocate with a commercial mindset and a commitment to delivering high-quality, responsive legal service. We bridge the gap between complex local regulatory systems and your company's growth objectives.
                            </p>
                            
                            <div style={{ marginTop: '2rem' }}>
                                <Link href="/about" className="btn btn-gold" style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '4px', display: 'inline-block' }}>
                                    Learn More About the Founder &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <div className="container" style={{ margin: '4rem auto' }}>
                <div className="cta-banner">
                    <div className="cta-left">
                        <div className="cta-icon">
                            <i className="far fa-calendar-alt"></i>
                        </div>
                        <div className="cta-text">
                            <h2>Let's discuss how we can support your business.</h2>
                            <p>Book a consultation with our team and get practical legal guidance.</p>
                        </div>
                    </div>
                    <Link href="/contact" className="cta-btn">
                        Book a Consultation &rarr;
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
