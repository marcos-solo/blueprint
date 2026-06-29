import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome({ contents = {} }) {
    const [heroImages, setHeroImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hero-images')
            .then(res => res.json())
            .then(data => {
                setHeroImages(data.length > 0 ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setHeroImages([]);
            });
    }, []);

    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const currentImage = heroImages[currentImageIndex];

    return (
        <Layout>
            <Head>
                <title>Blueprint Legal | Commercial Law Firm Tanzania | Founder-Led Advocacy</title>
                <meta name="description" content="Blueprint Legal provides practical, commercially focused legal support to companies, founders, investors and brand owners operating in Tanzania." />
                <meta name="keywords" content="Tanzania law firm, Dar es Salaam lawyer, commercial law Tanzania, trademark lawyer Tanzania, business lawyer" />
            </Head>

            {/* HERO SECTION: Dark navy, 2 buttons, right-side carousel */}
            <section className="hero" id="home">
                <div className="container">
                    <div className="hero-grid">
                        <div>
                            <h1 className="hero-title">
                                {contents.hero_title || "Strategic legal counsel for businesses, investors and innovators in Tanzania."}
                            </h1>
                            <p className="hero-description">
                                {contents.hero_description || "Blueprint Legal provides practical, commercially focused legal support to companies, founders, investors and brand owners operating in Tanzania."}
                            </p>
                            <div className="hero-buttons">
                                <Link href="/contact" className="btn-primary">
                                    {contents.hero_cta_primary || "Book a Consultation"} &rarr;
                                </Link>
                                <Link href="/expertise" className="btn-secondary">
                                    {contents.hero_cta_secondary || "Explore Expertise"} &rarr;
                                </Link>
                            </div>
                        </div>
                        <div className="hero-image" style={{ position: 'relative' }}>
                            {heroImages.length > 0 ? (
                                <>
                                    {heroImages.map((image, idx) => (
                                        <div
                                            key={image.id}
                                            style={{
                                                position: idx === 0 ? 'relative' : 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: idx === currentImageIndex ? 1 : 0,
                                                transition: 'opacity 0.8s ease-in-out',
                                                zIndex: idx === currentImageIndex ? 1 : 0,
                                            }}
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt={image.alt_text || 'Hero'}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '12px',
                                                }}
                                            />
                                        </div>
                                    ))}
                                    {heroImages.length > 1 && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '1rem',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            display: 'flex',
                                            gap: '0.5rem',
                                            zIndex: 10,
                                        }}>
                                            {heroImages.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        border: 'none',
                                                        background: idx === currentImageIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <img src="/images/hero_boardroom.png" alt="Blueprint Legal Boardroom" />
                                    <div className="placeholder-text">Premium Legal Counsel</div>
                                </>
                            )}
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

            {/* ADVOCACY PERSPECTIVE */}
            <section className="section section-alt" id="advocacy" style={{ padding: '5rem 0' }}>
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <span className="section-subtitle">{contents.advocacy_subtitle || "Our Approach"}</span>
                    <h2 className="section-title">{contents.advocacy_title || "Direct Advocacy. Practical Solutions."}</h2>
                    <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                        {contents.advocacy_description || "Blueprint Legal partners directly with clients to deliver high-quality, responsive commercial advice. We bridge the gap between complex regulatory systems and your company's growth objectives in Tanzania."}
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <Link href="/about" className="btn btn-gold" style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '4px', display: 'inline-block' }}>
                            Learn More About Our Firm &rarr;
                        </Link>
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
