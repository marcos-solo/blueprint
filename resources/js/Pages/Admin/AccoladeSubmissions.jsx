import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

function SubmissionCard({ submission }) {
    const { data, setData, patch, processing, reset } = useForm({
        status: submission.status,
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.accolades.submissions.update', submission.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleUpdate} className="glass-panel" style={{ padding: '1.75rem', borderRadius: '14px', background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.08)', boxShadow: '0 20px 40px -20px rgba(10, 48, 104, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        {submission.status === 'pending' ? 'Pending Approval' : submission.status === 'approved' ? 'Published' : 'Rejected'}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-blue)', margin: 0 }}>{submission.name}</h3>
                    <p style={{ margin: '0.35rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {submission.title || 'Client'}{submission.company ? ` • ${submission.company}` : ''}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{new Date(submission.created_at).toLocaleDateString()}</span>
                    {submission.approved_at && <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>Approved</span>}
                </div>
            </div>

            <p style={{ margin: '1.25rem 0', lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '0.98rem' }}>
                {submission.message}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: '1rem', alignItems: 'center' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Publication Status</label>
                <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '10px', border: '1px solid var(--bg-tertiary)', fontSize: '0.95rem', outline: 'none', background: '#fff' }}
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link href={route('admin.accolades.submissions.index')} className="btn btn-outline-dark" style={{ minWidth: '140px' }}>
                    Refresh List
                </Link>
                <button type="submit" disabled={processing} className="btn btn-gold" style={{ minWidth: '140px' }}>
                    {processing ? 'Saving...' : 'Save Status'}
                </button>
            </div>
        </form>
    );
}

export default function AccoladeSubmissions({ submissions = [] }) {
    const [filter, setFilter] = useState('pending');

    const filtered = submissions.filter((item) => {
        if (filter === 'all') return true;
        return item.status === filter;
    });

    return (
        <Layout>
            <Head title="Manage Accolades | Partner Administration" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    <div className="dashboard-header" style={{ borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1.75rem', marginBottom: '2.5rem' }}>
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>Partner Administration</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)' }}>Accolade Submissions</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.25rem' }}>
                                Review client testimonial requests and publish approved accolades to the public Accolades page.
                            </p>
                        </div>
                        <div>
                            <Link href={route('admin.pages.index')} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                                Return to Page Editor
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                        {['all', 'pending', 'approved', 'rejected'].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setFilter(status)}
                                style={{
                                    borderRadius: '999px',
                                    border: '1px solid var(--bg-tertiary)',
                                    padding: '0.7rem 1rem',
                                    backgroundColor: filter === status ? 'var(--accent-blue)' : '#fff',
                                    color: filter === status ? '#fff' : 'var(--text-primary)',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', minHeight: '220px' }}>
                            <h3 style={{ fontSize: '1.35rem', color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>No submissions found</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Try switching the filter or wait for new client testimonials to arrive.
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {filtered.map((submission) => (
                                <SubmissionCard key={submission.id} submission={submission} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
