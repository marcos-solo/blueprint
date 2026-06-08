import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {
    const { flash } = usePage().props;
    
    // Inertia form hook for the consultation request planner
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        practice_area: 'Corporate & M&A',
        message: '',
        scheduled_at: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('consultations.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

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
                                <a href="#schedule" className="btn-primary">Book a Consultation &rarr;</a>
                                <a href="#expertise" className="btn-secondary">View Expertise &rarr;</a>
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

            {/* EXPERTISE CARDS */}
            <section className="section" id="expertise">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Expertise</span>
                        <h2 className="section-title">Focused practice. Commercial impact.</h2>
                    </div>
                    <div className="expertise-grid">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-building"></i></div>
                            <h3>Corporate & Commercial</h3>
                            <p>Company formation, contracts, M&A, joint ventures and ongoing commercial support.</p>
                            <a href="#schedule" className="card-link">&rarr;</a>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-registered"></i></div>
                            <h3>Intellectual Property</h3>
                            <p>Trademarks, patents, copyright and brand protection strategies.</p>
                            <a href="#schedule" className="card-link">&rarr;</a>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-balance-scale"></i></div>
                            <h3>Dispute Resolution</h3>
                            <p>Commercial disputes, mediation, arbitration and litigation support.</p>
                            <a href="#schedule" className="card-link">&rarr;</a>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-users"></i></div>
                            <h3>Employment</h3>
                            <p>Employment contracts, HR policies, workplace disputes and advisory.</p>
                            <a href="#schedule" className="card-link">&rarr;</a>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-shield-alt"></i></div>
                            <h3>Regulatory Compliance</h3>
                            <p>Regulatory advisory, licensing, corporate governance and compliance.</p>
                            <a href="#schedule" className="card-link">&rarr;</a>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-home"></i></div>
                            <h3>Real Estate</h3>
                            <p>Property transactions, leases, due diligence and real estate advisory.</p>
                            <a href="#schedule" className="card-link">&rarr;</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO WE SERVE: Client tabs style */}
            <section className="section section-alt" id="clients" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '2rem' }}>
                        <span className="section-subtitle">Who We Serve</span>
                        <h2 className="section-title">Our clients. Our priority.</h2>
                    </div>
                    <div className="chips-container">
                        <div className="chip">
                            <i className="fas fa-rocket"></i>
                            <span>Startups</span>
                        </div>
                        <div className="chip">
                            <i className="fas fa-chart-bar"></i>
                            <span>SMEs</span>
                        </div>
                        <div className="chip">
                            <i className="fas fa-globe"></i>
                            <span>Foreign Investors</span>
                        </div>
                        <div className="chip">
                            <i className="fas fa-tag"></i>
                            <span>Brand Owners</span>
                        </div>
                        <div className="chip">
                            <i className="fas fa-building"></i>
                            <span>Property Developers</span>
                        </div>
                        <div className="chip">
                            <i className="fas fa-code"></i>
                            <span>Technology Businesses</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOUNDER BLOCK */}
            <section className="section" id="founder">
                <div className="container">
                    <div className="founder-grid">
                        <div className="founder-image" style={{ backgroundImage: 'url(/images/founder_jabari.png)' }}>
                            <span>Founder</span>
                        </div>
                        <div>
                            <span className="section-subtitle">Founder</span>
                            <h2 className="section-title">Personal counsel. Practical solutions.</h2>
                            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                Blueprint Legal is led by a dedicated Tanzanian advocate with a commercial mindset and a commitment to delivering high-quality, responsive legal service.
                            </p>
                            <div className="proof-points">
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
                </div>
            </section>

            {/* INSIGHTS PREVIEW: 3 latest articles, horizontal cards */}
            <section className="section section-alt" id="insights">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Insights</span>
                        <h2 className="section-title">Legal Updates & Insights</h2>
                    </div>
                    <div className="insights-grid">
                        <div className="insight-card">
                            <div className="insight-image-container">
                                <img src="/images/insight_business.png" alt="Doing Business in Tanzania" />
                            </div>
                            <div className="insight-content">
                                <h4 className="insight-title">Doing Business in Tanzania</h4>
                                <p className="insight-desc">Key legal considerations for companies and investors entering the Tanzanian market.</p>
                                <a href="#schedule" className="insight-link">Read more &rarr;</a>
                            </div>
                        </div>
                        <div className="insight-card">
                            <div className="insight-image-container">
                                <img src="/images/insight_trademark.png" alt="Trademark & IP Update" />
                            </div>
                            <div className="insight-content">
                                <h4 className="insight-title">Trademark & IP Update</h4>
                                <p className="insight-desc">Recent developments in Tanzanian IP law and what brand owners should know.</p>
                                <a href="#schedule" className="insight-link">Read more &rarr;</a>
                            </div>
                        </div>
                        <div className="insight-card">
                            <div className="insight-image-container">
                                <img src="/images/insight_regulatory.png" alt="Regulatory Brief" />
                            </div>
                            <div className="insight-content">
                                <h4 className="insight-title">Regulatory Brief</h4>
                                <p className="insight-desc">Important regulatory updates impacting businesses and investors in Tanzania.</p>
                                <a href="#schedule" className="insight-link">Read more &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA BANNER: Dark row */}
            <div className="container">
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
                    <a href="#schedule" className="cta-btn">
                        Book a Consultation &rarr;
                    </a>
                </div>
            </div>

            {/* CONTACT / CONSULTATION FORM SECTION */}
            <section className="section" id="schedule">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Secure Counsel</span>
                        <h2 className="section-title">Request a Consultation</h2>
                    </div>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-primary)', borderRadius: '12px', padding: '2.5rem', border: '1px solid var(--bg-tertiary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        
                        {flash?.success && (
                            <div className="alert-success" style={{ marginBottom: '1.5rem', padding: '1rem', background: '#eefcf5', border: '1px solid #cbf3dd', color: '#1e7e4c', borderRadius: '4px', fontSize: '0.9rem' }}>
                                {flash.success}
                            </div>
                        )}
                        {wasSuccessful && !flash?.success && (
                            <div className="alert-success" style={{ marginBottom: '1.5rem', padding: '1rem', background: '#eefcf5', border: '1px solid #cbf3dd', color: '#1e7e4c', borderRadius: '4px', fontSize: '0.9rem' }}>
                                Consultation booking request successfully sent! Check your email dashboard.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="consultation-form">
                            <div className="form-group-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="fullName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>Full Name *</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className="form-control"
                                        placeholder="Name or company representative"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem' }}
                                    />
                                    {errors.name && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="partner@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem' }}
                                    />
                                    {errors.email && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                                </div>
                            </div>

                            <div className="form-group-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>Phone / WhatsApp</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-control"
                                        placeholder="+255 ..."
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem' }}
                                    />
                                    {errors.phone && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.phone}</div>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="practiceArea" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>Practice Area</label>
                                    <select
                                        id="practiceArea"
                                        className="form-control"
                                        value={data.practice_area}
                                        onChange={(e) => setData('practice_area', e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                                    >
                                        <option value="Corporate & M&A">Corporate & Commercial</option>
                                        <option value="Intellectual Property">Intellectual Property</option>
                                        <option value="Commercial Litigation">Dispute Resolution</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Investment Advisory">Employment</option>
                                        <option value="Regulatory Compliance">Regulatory Compliance</option>
                                    </select>
                                    {errors.practice_area && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.practice_area}</div>}
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="form-label" htmlFor="preferredDate" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>Preferred Date & Time *</label>
                                <input
                                    type="datetime-local"
                                    id="preferredDate"
                                    className="form-control"
                                    value={data.scheduled_at}
                                    onChange={(e) => setData('scheduled_at', e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem' }}
                                />
                                {errors.scheduled_at && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.scheduled_at}</div>}
                            </div>

                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label className="form-label" htmlFor="message" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--accent-blue)' }}>Brief Summary of Counsel Required *</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="form-control"
                                    placeholder="Please describe your business case or requirements..."
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem' }}
                                ></textarea>
                                {errors.message && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.message}</div>}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem 2rem', borderRadius: '4px', backgroundColor: 'var(--accent-gold)', border: 'none', color: 'var(--accent-blue)', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer' }} disabled={processing}>
                                    {processing ? 'Scheduling Private Briefing...' : 'Schedule Private Briefing →'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
