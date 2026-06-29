import React from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Contact() {
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
            <Head title="Book a Consultation | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header Banner */}
                    <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Secure Counsel</span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Book a Consultation</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            Ready to schedule a private briefing? Complete our planner below to secure dedicated partner time.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                        
                        {/* Left Side: Contact Information Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px' }}>
                                <h3 style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    📞 Direct Contact
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                                    Feel free to call, email or reach out on WhatsApp directly for urgent assistance:
                                    <br /><br />
                                    <strong>Phone:</strong> +255 759 937 511<br />
                                    <strong>WhatsApp:</strong> +255 759 937 511<br />
                                    <strong>Email:</strong> info@blueprintlegal.co.tz
                                </p>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px' }}>
                                <h3 style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    🕒 Office Hours
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                                    Our typical office consulting hours are:
                                    <br /><br />
                                    Monday – Friday<br />
                                    9:00am – 5:00pm EAT
                                </p>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px' }}>
                                <h3 style={{ color: 'var(--accent-blue)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    📍 Office Address
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                                    Millenium Towers II, Kijitonyama, Dar es Salaam, Tanzania.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Form Panel */}
                        <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-tertiary)', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
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
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {/* Name */}
                                    <div>
                                        <label className="form-label" htmlFor="fullName" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            className="form-control"
                                            placeholder="Name or company representative"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                        />
                                        {errors.name && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</div>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="form-label" htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="partner@example.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                        />
                                        {errors.email && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="form-label" htmlFor="phone" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Phone / WhatsApp</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="form-control"
                                            placeholder="+255 ..."
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                        />
                                        {errors.phone && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.phone}</div>}
                                    </div>

                                    {/* Practice Area */}
                                    <div>
                                        <label className="form-label" htmlFor="practiceArea" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Practice Area</label>
                                        <select
                                            id="practiceArea"
                                            className="form-control"
                                            value={data.practice_area}
                                            onChange={(e) => setData('practice_area', e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
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

                                    {/* Date */}
                                    <div>
                                        <label className="form-label" htmlFor="preferredDate" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Preferred Date & Time *</label>
                                        <input
                                            type="datetime-local"
                                            id="preferredDate"
                                            className="form-control"
                                            value={data.scheduled_at}
                                            onChange={(e) => setData('scheduled_at', e.target.value)}
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                        />
                                        {errors.scheduled_at && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.scheduled_at}</div>}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="form-label" htmlFor="message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Brief Summary of Counsel Required *</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="form-control"
                                            placeholder="Please describe your business case or requirements..."
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                                        ></textarea>
                                        {errors.message && <div className="form-error" style={{ color: '#d93025', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.message}</div>}
                                    </div>

                                    {/* Submit */}
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            style={{ width: '100%', padding: '0.85rem 2rem', borderRadius: '4px', backgroundColor: 'var(--accent-gold)', border: 'none', color: 'var(--accent-blue)', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer' }} 
                                            disabled={processing}
                                        >
                                            {processing ? 'Scheduling Private Briefing...' : 'Schedule Private Briefing →'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
