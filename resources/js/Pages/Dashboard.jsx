import React, { useState } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

// Sub-component for inline admin modification of a briefing
function AdminBriefingCard({ consult, formatDate }) {
    const { data, setData, patch, processing, wasSuccessful } = useForm({
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
        <div className="glass-panel" style={{ background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.08)', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', backgroundColor: data.status === 'pending' ? '#F59E0B' : data.status === 'confirmed' ? '#3B82F6' : data.status === 'completed' ? '#10B981' : '#EF4444' }} />
            
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>
                        {consult.practice_area}
                    </span>
                    <h4 style={{ fontSize: '1.35rem', color: 'var(--accent-blue)', fontWeight: '700', margin: 0 }}>
                        Briefing from {consult.name}
                    </h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        📅 {formatDate(consult.scheduled_at)}
                    </span>
                    <span className={`status-badge status-${data.status}`}>
                        {data.status}
                    </span>
                </div>
            </div>

            {/* Client info bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid var(--bg-tertiary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <span>✉️</span>
                    <a href={`mailto:${consult.email}`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontWeight: '500' }}>{consult.email}</a>
                </div>
                {consult.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                        <span>📞</span>
                        <span>{consult.phone}</span>
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <span>🏷️</span>
                    <span>Area: {consult.practice_area}</span>
                </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                    Client Case Description / Counsel Required:
                </span>
                <p style={{ margin: 0, fontStyle: 'italic', background: 'rgba(197, 168, 128, 0.03)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    &ldquo;{consult.message}&rdquo;
                </p>
            </div>

            {/* Admin Management Section */}
            <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                            Briefing Status
                        </label>
                        <select
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', backgroundColor: '#FFFFFF', outline: 'none', transition: 'border-color 0.2s' }}
                            onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                            onBlur={e => e.target.style.borderColor = 'var(--bg-tertiary)'}
                        >
                            <option value="pending">🟡 Pending Review</option>
                            <option value="confirmed">🔵 Confirmed / Scheduled</option>
                            <option value="completed">🟢 Completed</option>
                            <option value="cancelled">🔴 Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                            Partner Advisor Notes (Client-visible)
                        </label>
                        <textarea
                            rows="2"
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            placeholder="Add videoconference link, date confirmations, or assigned partner name..."
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
                            onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                            onBlur={e => e.target.style.borderColor = 'var(--bg-tertiary)'}
                        ></textarea>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {wasSuccessful && (
                            <span style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                ✓ Changes successfully saved.
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn"
                        style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', backgroundColor: 'var(--accent-blue)', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {processing ? 'Saving...' : 'Save Changes &rarr;'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function Dashboard({ consultations = [], isAdmin = false }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    // React state for search & filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

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

    // Calculate dynamic stats
    const stats = {
        total: consultations.length,
        pending: consultations.filter(c => c.status === 'pending').length,
        confirmed: consultations.filter(c => c.status === 'confirmed').length,
        completed: consultations.filter(c => c.status === 'completed').length,
    };

    // Filter consultations based on input
    const filteredConsultations = consultations.filter((c) => {
        const matchesSearch = 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.practice_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.message && c.message.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || (c.status || 'pending') === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <Layout>
            <Head title={isAdmin ? "Partner Management Console" : "Client Portal | Dashboard"} />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Welcome Banner */}
                    <div className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>
                                {isAdmin ? 'Partner Administration' : 'Secure Client Portal'}
                            </span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)' }}>
                                {isAdmin ? 'Management Console' : `Welcome Back, ${user.name}`}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.25rem' }}>
                                {isAdmin 
                                    ? 'Review, verify, and confirm client briefings and consultation schedules.'
                                    : 'Manage your secure legal consultation schedules and briefings.'}
                            </p>
                        </div>
                        {!isAdmin && (
                            <div>
                                <Link href="/contact" className="btn btn-gold" style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '4px', display: 'inline-block' }}>
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

                    {/* METRICS STRIP FOR ADMIN */}
                    {isAdmin && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {/* Card 1 */}
                            <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.06)', borderRadius: '12px', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.01)', display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>Total Briefings</span>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--accent-blue)', fontWeight: '800', margin: '0.25rem 0 0' }}>{stats.total}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(10, 48, 104, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>💼</div>
                            </div>
                            {/* Card 2 */}
                            <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.06)', borderRadius: '12px', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.01)', display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#B45309', letterSpacing: '0.5px' }}>Pending Review</span>
                                    <h3 style={{ fontSize: '2rem', color: '#D97706', fontWeight: '800', margin: '0.25rem 0 0' }}>{stats.pending}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>⏳</div>
                            </div>
                            {/* Card 3 */}
                            <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.06)', borderRadius: '12px', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.01)', display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#1D4ED8', letterSpacing: '0.5px' }}>Confirmed</span>
                                    <h3 style={{ fontSize: '2rem', color: '#2563EB', fontWeight: '800', margin: '0.25rem 0 0' }}>{stats.confirmed}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🔵</div>
                            </div>
                            {/* Card 4 */}
                            <div className="glass-panel" style={{ padding: '1.5rem 2rem', background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.06)', borderRadius: '12px', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.01)', display: 'flex', alignItems: 'center', justifyItems: 'space-between' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#047857', letterSpacing: '0.5px' }}>Completed</span>
                                    <h3 style={{ fontSize: '2rem', color: '#059669', fontWeight: '800', margin: '0.25rem 0 0' }}>{stats.completed}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🟢</div>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Layout Grid */}
                    <div className="dashboard-grid">
                        
                        {/* Briefing Management and Search List */}
                        <div>
                            {/* SEARCH AND FILTER BAR (Admin-Only) */}
                            {isAdmin && (
                                <div className="glass-panel" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--bg-tertiary)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#ffffff', border: '1px solid var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                                        <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>🔍</span>
                                        <input 
                                            type="text" 
                                            placeholder="Search briefings by client name, email, practice area or briefing text..." 
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', color: 'var(--text-primary)' }}
                                        />
                                        {searchTerm && (
                                            <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                ✕ Clear
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '700', marginRight: '0.5rem', textTransform: 'uppercase' }}>Filter Status:</span>
                                        
                                        <button 
                                            onClick={() => setStatusFilter('all')} 
                                            style={{ padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', border: '1px solid var(--bg-tertiary)', backgroundColor: statusFilter === 'all' ? 'var(--accent-blue)' : '#ffffff', color: statusFilter === 'all' ? '#ffffff' : 'var(--text-primary)', transition: 'all 0.2s' }}
                                        >
                                            All ({stats.total})
                                        </button>
                                        <button 
                                            onClick={() => setStatusFilter('pending')} 
                                            style={{ padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', border: '1px solid rgba(245, 158, 11, 0.2)', backgroundColor: statusFilter === 'pending' ? '#F59E0B' : '#ffffff', color: statusFilter === 'pending' ? '#ffffff' : '#D97706', transition: 'all 0.2s' }}
                                        >
                                            Pending ({stats.pending})
                                        </button>
                                        <button 
                                            onClick={() => setStatusFilter('confirmed')} 
                                            style={{ padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', border: '1px solid rgba(59, 130, 246, 0.2)', backgroundColor: statusFilter === 'confirmed' ? '#3B82F6' : '#ffffff', color: statusFilter === 'confirmed' ? '#ffffff' : '#2563EB', transition: 'all 0.2s' }}
                                        >
                                            Confirmed ({stats.confirmed})
                                        </button>
                                        <button 
                                            onClick={() => setStatusFilter('completed')} 
                                            style={{ padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', border: '1px solid rgba(16, 185, 129, 0.2)', backgroundColor: statusFilter === 'completed' ? '#10B981' : '#ffffff', color: statusFilter === 'completed' ? '#ffffff' : '#059669', transition: 'all 0.2s' }}
                                        >
                                            Completed ({stats.completed})
                                        </button>
                                    </div>
                                </div>
                            )}

                            <h3 className="dashboard-panel-title">
                                {isAdmin ? 'Client Briefings' : 'Scheduled Briefings & Consultations'}
                                <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-dark)', fontWeight: 'bold' }}>
                                    {filteredConsultations.length} displayed
                                </span>
                            </h3>

                            {filteredConsultations.length === 0 ? (
                                <div className="empty-state" style={{ background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.08)', borderRadius: '12px', padding: '4rem 2rem' }}>
                                    <div className="empty-state-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚖️</div>
                                    <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-blue)', fontWeight: '700' }}>No Briefings Found</h3>
                                    <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0.5rem auto 0' }}>
                                        {searchTerm || statusFilter !== 'all' 
                                            ? 'No records match your active search terms or status filters.' 
                                            : isAdmin 
                                                ? 'No client consultation request details are currently registered.' 
                                                : 'You currently do not have any scheduled legal briefings.'}
                                    </p>
                                    {!isAdmin && (
                                        <Link href="/contact" className="btn btn-outline" style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem', marginTop: '1rem', display: 'inline-block' }}>
                                            Schedule Now
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {filteredConsultations.map((consult, index) => (
                                        <div key={consult.id || index}>
                                            {isAdmin ? (
                                                <AdminBriefingCard consult={consult} formatDate={formatDate} />
                                            ) : (
                                                <div className="timeline-content" style={{ background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.08)', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.01)' }}>
                                                    <div className="timeline-meta" style={{ marginBottom: '1rem' }}>
                                                        <span className="timeline-date">
                                                            📅 {formatDate(consult.scheduled_at)}
                                                        </span>
                                                        <span className={`status-badge status-${consult.status || 'pending'}`}>
                                                            {consult.status || 'pending'}
                                                        </span>
                                                    </div>
                                                    <h4 className="timeline-title" style={{ fontSize: '1.35rem', color: 'var(--accent-blue)', fontWeight: '700' }}>
                                                        {consult.practice_area} Briefing
                                                    </h4>
                                                    <p className="timeline-desc" style={{ fontStyle: 'italic', background: 'rgba(0,0,0,0.01)', padding: '1rem 1.25rem', borderRadius: '6px', borderLeft: '2px solid var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                                                        &ldquo;{consult.message}&rdquo;
                                                    </p>

                                                    {/* Client details overview */}
                                                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                                                        <span><strong>Contact:</strong> {consult.name}</span>
                                                        {consult.phone && <span><strong>Phone:</strong> {consult.phone}</span>}
                                                    </div>

                                                    {/* Internal Advisor Notes */}
                                                    {consult.notes ? (
                                                        <div className="timeline-notes" style={{ background: 'rgba(197, 168, 128, 0.05)', padding: '1rem', borderRadius: '8px', borderTop: 'none', borderLeft: '3px solid var(--accent-gold)' }}>
                                                            <span className="timeline-notes-label" style={{ fontWeight: '700', color: 'var(--accent-gold-dark)' }}>Partner Advisor Notes:</span>
                                                            <span style={{ color: 'var(--accent-blue)', fontWeight: '500', fontSize: '0.9rem' }}>{consult.notes}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="timeline-notes" style={{ borderTop: 'none', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                                                            <span className="timeline-notes-label">Partner Review Status:</span>
                                                            <span style={{ fontSize: '0.85rem' }}>A senior partner is analyzing your brief. We will send a secure videoconference invite to {consult.email} shortly.</span>
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
                            <div className="glass-panel profile-card" style={{ background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.08)', borderRadius: '12px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.01)' }}>
                                <div className="profile-avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-dark) 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: '800', margin: '0 auto 1.5rem', boxShadow: '0 4px 10px rgba(10, 48, 104, 0.15)' }}>
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <h4 className="profile-name" style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--accent-blue)' }}>{user.name}</h4>
                                <div className="profile-email" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>{user.email}</div>
                                
                                {isAdmin && (
                                    <div style={{ marginBottom: '1.75rem', border: '1px solid var(--accent-gold)', borderRadius: '30px', padding: '0.4rem 1.25rem', display: 'inline-block', backgroundColor: 'rgba(197, 168, 128, 0.06)' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-gold-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            ⚖️ Managing Partner
                                        </span>
                                    </div>
                                )}

                                {isAdmin && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <Link 
                                            href={route('admin.blogs.index')} 
                                            className="btn btn-gold" 
                                            style={{ display: 'block', width: '100%', padding: '0.8rem', fontSize: '0.9rem', fontWeight: '700', textAlign: 'center', textDecoration: 'none', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                                            onMouseEnter={e => e.target.style.opacity = 0.9}
                                            onMouseLeave={e => e.target.style.opacity = 1}
                                        >
                                            ✍ Manage Blog Articles
                                        </Link>
                                    </div>
                                )}

                                <div style={{ borderTop: '1px solid var(--bg-tertiary)', paddingTop: '1.5rem' }}>
                                    <Link href={route('logout')} method="post" as="button" className="btn" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--bg-tertiary)', borderRadius: '6px', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', transition: 'background-color 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = 'var(--bg-secondary)'} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
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
