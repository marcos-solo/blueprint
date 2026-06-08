import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

// Sub-component for inline admin modification of a briefing
function AdminBriefingCard({ consult, formatDate }) {
    const { data, setData, patch, processing } = useForm({
        status: consult.status || 'pending',
        notes: consult.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('consultations.update', consult.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="timeline-content" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
            <div className="timeline-meta">
                <span className="timeline-date">
                    {formatDate(consult.scheduled_at)}
                </span>
                <span className={`status-badge status-${data.status}`}>
                    {data.status}
                </span>
            </div>
            
            <h4 className="timeline-title" style={{ fontSize: '1.3rem', color: 'var(--accent-blue)', marginBottom: '0.25rem' }}>
                {consult.practice_area}
            </h4>
            
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold-dark)', fontWeight: '600', marginBottom: '1rem' }}>
                Client: {consult.name} &bull; <a href={`mailto:${consult.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{consult.email}</a> {consult.phone ? `&bull; ${consult.phone}` : ''}
            </div>

            <p className="timeline-desc" style={{ fontStyle: 'italic', background: 'rgba(0,0,0,0.02)', padding: '0.75rem 1rem', borderRadius: '4px', borderLeft: '2px solid var(--bg-tertiary)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                &ldquo;{consult.message}&rdquo;
            </p>

            <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                            Briefing Status
                        </label>
                        <select
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
                        >
                            <option value="pending">Pending Review</option>
                            <option value="confirmed">Confirmed / Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                            Partner Advisor Notes (Client-visible)
                        </label>
                        <textarea
                            rows="2"
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            placeholder="Add meeting link, advisor notes, or scheduled partner details..."
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--bg-tertiary)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                        ></textarea>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn"
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', backgroundColor: 'var(--accent-blue)', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function Dashboard({ consultations = [], isAdmin = false }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    // Helper to format date beautifully
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Calculate quick admin statistics
    const stats = {
        total: consultations.length,
        pending: consultations.filter(c => c.status === 'pending').length,
        confirmed: consultations.filter(c => c.status === 'confirmed').length,
    };

    return (
        <Layout>
            <Head title={isAdmin ? "Partner Management Console" : "Client Portal | Dashboard"} />

            <div className="dashboard-wrapper">
                <div className="container">
                    
                    {/* Welcome Banner */}
                    <div className="dashboard-header">
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem' }}>
                                {isAdmin ? 'Partner Administration' : 'Secure Client Portal'}
                            </span>
                            <h2>
                                {isAdmin ? 'Management Console' : `Welcome Back, ${user.name}`}
                            </h2>
                            <p>
                                {isAdmin 
                                    ? 'Review, verify, and confirm client briefings and consultation schedules.'
                                    : 'Manage your secure legal consultation schedules and briefings.'}
                            </p>
                        </div>
                        {!isAdmin && (
                            <div>
                                <Link href="/#schedule" className="btn btn-gold" style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '4px' }}>
                                    Book New Briefing &rarr;
                                </Link>
                            </div>
                        )}
                    </div>

                    {flash?.success && (
                        <div className="alert-success" style={{ marginBottom: '2rem', padding: '1rem', background: '#eefcf5', border: '1px solid #cbf3dd', color: '#1e7e4c', borderRadius: '4px', fontSize: '0.9rem' }}>
                            {flash.success}
                        </div>
                    )}

                    {/* Dashboard Layout Grid */}
                    <div className="dashboard-grid">
                        
                        {/* Consultation Status Timeline */}
                        <div>
                            <h3 className="dashboard-panel-title">
                                {isAdmin ? 'All Submitted Client Briefings' : 'Scheduled Briefings & Consultations'}
                                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                                    {consultations.length} total
                                </span>
                            </h3>

                            {consultations.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">⚖</div>
                                    <h3>No Consultations Found</h3>
                                    <p>
                                        {isAdmin 
                                            ? 'No client consultation request details are currently registered.' 
                                            : 'You currently do not have any scheduled legal briefings.'}
                                    </p>
                                    {!isAdmin && (
                                        <Link href="/#schedule" className="btn btn-outline" style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem', marginTop: '1rem' }}>
                                            Schedule Now
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div className="timeline" style={{ paddingLeft: isAdmin ? '0' : '2rem' }}>
                                    {/* Timeline line is hidden for admin grid listing */}
                                    {!isAdmin && <div className="timeline-line"></div>}

                                    {consultations.map((consult, index) => (
                                        <div key={consult.id || index} className="timeline-item" style={{ marginBottom: '2.5rem' }}>
                                            {!isAdmin && <div className="timeline-dot"></div>}
                                            
                                            {isAdmin ? (
                                                <AdminBriefingCard consult={consult} formatDate={formatDate} />
                                            ) : (
                                                <div className="timeline-content">
                                                    <div className="timeline-meta">
                                                        <span className="timeline-date">
                                                            {formatDate(consult.scheduled_at)}
                                                        </span>
                                                        <span className={`status-badge status-${consult.status || 'pending'}`}>
                                                            {consult.status || 'pending'}
                                                        </span>
                                                    </div>
                                                    <h4 className="timeline-title" style={{ fontSize: '1.25rem', color: 'var(--accent-blue)' }}>
                                                        {consult.practice_area} Briefing
                                                    </h4>
                                                    <p className="timeline-desc">
                                                        &ldquo;{consult.message}&rdquo;
                                                    </p>

                                                    {/* Client details overview */}
                                                    <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                        <strong>Contact:</strong> {consult.name} {consult.phone ? `| Phone: ${consult.phone}` : ''}
                                                    </div>

                                                    {/* Internal Advisor Notes */}
                                                    {consult.notes ? (
                                                        <div className="timeline-notes">
                                                            <span className="timeline-notes-label">Partner Advisor Notes:</span>
                                                            <span style={{ color: 'var(--accent-blue)', fontWeight: '500' }}>{consult.notes}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="timeline-notes" style={{ borderTop: 'none', color: 'var(--text-muted)' }}>
                                                            <span className="timeline-notes-label">Partner Review Status:</span>
                                                            <span>A senior partner is analyzing your brief. We will send a secure videoconference invite to {consult.email} shortly.</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Profile Information Sidebar */}
                        <div>
                            <h3 className="dashboard-panel-title">Your Profile</h3>
                            <div className="glass-panel profile-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
                                <div className="profile-avatar" style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--accent-blue)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700', margin: '0 auto 1.5rem' }}>
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <h4 className="profile-name" style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--accent-blue)' }}>{user.name}</h4>
                                <div className="profile-email" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{user.email}</div>
                                
                                {isAdmin && (
                                    <div style={{ marginBottom: '1.5rem', border: '1px solid var(--accent-gold-dark)', borderRadius: '4px', padding: '0.5rem 1rem', display: 'inline-block', backgroundColor: 'rgba(197, 168, 128, 0.05)' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-gold-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Managing Partner
                                        </span>
                                    </div>
                                )}

                                {isAdmin && (
                                    <div style={{ borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1.5rem', paddingBottom: '1.5rem', textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                            Briefing Statistics
                                        </div>
                                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Total Submitted</span>
                                            <span style={{ fontWeight: '700' }}>{stats.total}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Pending Review</span>
                                            <span style={{ color: '#F59E0B', fontWeight: '700' }}>{stats.pending}</span>
                                        </div>
                                        <div style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Scheduled/Confirmed</span>
                                            <span style={{ color: '#60A5FA', fontWeight: '700' }}>{stats.confirmed}</span>
                                        </div>
                                    </div>
                                )}

                                <div style={{ borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1.5rem' }}>
                                    <Link href={route('logout')} method="post" as="button" className="btn" style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--bg-tertiary)', borderRadius: '4px', background: 'transparent', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                                        Logout Securely
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
