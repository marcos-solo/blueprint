import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Accolades({ contents = {}, approvedTestimonials = [] }) {
    const { flash = {} } = usePage().props;
    const [showToast, setShowToast] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        title: '',
        company: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (flash.success) {
            setShowToast(true);
            reset();
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash.success, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('accolades.submissions.store'));
    };

    const testimonialItems = approvedTestimonials.length > 0 ? approvedTestimonials : [
        {
            quote: 'Blueprint Legal restructured our shareholder agreements and cleared our regulatory TCRA permits in record time. Their direct partner involvement is a major value-add.',
            name: 'Amani Kamau',
            title: 'Founder, TechFlow East Africa',
            company: 'Technology Sector',
        },
        {
            quote: 'Entering the Tanzanian market required a firm with speed and absolute local precision. Blueprint Legal managed our TIC certificate and corporate structuring flawlessly.',
            name: 'Sarah Jenkins',
            title: 'Managing Partner, Apex Capital Partners',
            company: 'Foreign Direct Investment',
        },
        {
            quote: 'Their team handled our complex land title audits and negotiated a high-stakes joint venture agreement for a multi-use commercial build. Highly recommend their real estate specialists.',
            name: 'Fatma Salim',
            title: 'CEO, Kijitonyama Developers Ltd',
            company: 'Real Estate & Construction',
        },
        {
            quote: 'We trust them completely with our trademark registration and brand protection strategy in East Africa. Their commercially sensible advice protects our critical market value.',
            name: 'Marcus Aurelius',
            title: 'Director of IP, Zenith Consumer Products',
            company: 'Intellectual Property',
        },
    ];

    return (
        <Layout>
            <Head title="Testimonials & Accolades | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
                            {contents.header_subtitle || 'Accolades'}
                        </span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
                            {contents.header_title || 'Client Perspectives & Standards'}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            {contents.header_description || 'We measure our success by the growth, security, and milestones achieved by the corporate leaders we advise.'}
                        </p>
                    </div>

                    <div className="testimonial-grid" style={{ marginBottom: '4rem' }}>
                        {testimonialItems.map((item, idx) => {
                            const quoteText = item.quote || item.message || '';
                            const nameText = item.name || 'Client';
                            const titleText = item.title || item.company || 'Client';
                            const companyText = item.company || 'Client Testimonial';

                            return (
                                <div key={idx} className="glass-panel testimonial-card">
                                    <div style={{ position: 'relative' }}>
                                        <span className="testimonial-badge" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.72rem', fontWeight: 700 }}>
                                            {companyText}
                                        </span>
                                        <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.85', fontStyle: 'italic', margin: 0 }}>
                                            “{quoteText}”
                                        </p>
                                    </div>
                                    <div className="testimonial-meta" style={{ marginTop: '1.75rem', borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1.25rem' }}>
                                        <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-blue)' }}>{nameText}</p>
                                        <p style={{ margin: '0.35rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{titleText}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.95rem', marginTop: '0.5rem', color: 'var(--accent-blue)' }}>
                            Submit Your Client Testimonial for Review
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1rem auto 0' }}>
                            Share your experience working with Blueprint Legal. All submissions are reviewed by our team for publication on this page.
                        </p>
                    </div>

                    {showToast && (
                        <div className="toast-notification" style={{
                            position: 'fixed',
                            top: '2rem',
                            right: '2rem',
                            background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                            color: '#1a2a4a',
                            padding: '1.25rem 1.75rem',
                            borderRadius: '12px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            zIndex: 10000,
                            animation: 'slideInRight 0.4s ease, slideOutRight 0.4s ease 4.6s forwards',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}>
                            <i className="fas fa-check-circle" style={{ fontSize: '1.2rem' }} />
                            {flash.success}
                        </div>
                    )}
                    <style>{`
                        @keyframes slideInRight {
                            from {
                                opacity: 0;
                                transform: translateX(100px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        @keyframes slideOutRight {
                            from {
                                opacity: 1;
                                transform: translateX(0);
                            }
                            to {
                                opacity: 0;
                                transform: translateX(100px);
                            }
                        }
                    `}</style>

                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '5rem', borderRadius: '16px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
                                <label style={{ display: 'grid', gap: '0.5rem' }}>
                                    Your Name
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="form-input"
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && <span className="input-error">{errors.name}</span>}
                                </label>
                                <label style={{ display: 'grid', gap: '0.5rem' }}>
                                    Company / Sector
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="form-input"
                                        placeholder="Acme Holdings / Finance"
                                    />
                                    {errors.company && <span className="input-error">{errors.company}</span>}
                                </label>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
                                <label style={{ display: 'grid', gap: '0.5rem' }}>
                                    Role / Title
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="form-input"
                                        placeholder="Executive Director"
                                    />
                                </label>
                                <label style={{ display: 'grid', gap: '0.5rem' }}>
                                    Email Address
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="form-input"
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <span className="input-error">{errors.email}</span>}
                                </label>
                            </div>

                            <label style={{ display: 'grid', gap: '0.5rem' }}>
                                Testimonial
                                <textarea
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="form-input"
                                    placeholder="Share what Blueprint Legal delivered for your business."
                                />
                                {errors.message && <span className="input-error">{errors.message}</span>}
                            </label>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                                <button type="submit" disabled={processing} className="btn btn-gold" style={{ minWidth: '180px' }}>
                                    {processing ? 'Submitting...' : 'Submit Testimonial'}
                                </button>
                                <Link href="/contact" className="btn btn-outline-dark" style={{ minWidth: '180px' }}>
                                    Book a Consultation
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
