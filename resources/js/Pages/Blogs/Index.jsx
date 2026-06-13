import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Index({ blogs = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Layout>
            <Head title="Legal Insights & Blog | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '5rem' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Insights</span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Legal Updates & Business Strategy</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            Stay informed with latest analysis, corporate insights, and legal guidelines curated by our partners.
                        </p>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="empty-state" style={{ background: 'var(--bg-secondary)', padding: '5rem 2rem' }}>
                            <div className="empty-state-icon" style={{ fontSize: '3.5rem' }}>📰</div>
                            <h3>No Articles Published Yet</h3>
                            <p>Check back soon for legal updates, newsletters, and partner perspectives.</p>
                            <Link href="/" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '1rem' }}>
                                Return Home
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                            {blogs.map((blog) => (
                                <div 
                                    key={blog.id} 
                                    className="glass-panel" 
                                    style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        borderRadius: '8px', 
                                        overflow: 'hidden', 
                                        background: 'var(--bg-secondary)', 
                                        border: '1px solid var(--bg-tertiary)',
                                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.borderColor = 'var(--accent-gold)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'var(--bg-tertiary)';
                                    }}
                                >
                                    {/* Cover Image */}
                                    <div style={{ height: '200px', overflow: 'hidden', backgroundColor: 'var(--accent-blue-dark)', position: 'relative' }}>
                                        {blog.image_url ? (
                                            <img 
                                                src={blog.image_url} 
                                                alt={blog.title} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.25)', fontSize: '4rem' }}>
                                                ⚖️
                                            </div>
                                        )}
                                        {blog.video_url && (
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(10, 42, 74, 0.85)', color: 'var(--accent-gold)', borderRadius: '20px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--accent-gold)' }}>
                                                <i className="fas fa-play"></i> Video Included
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Info */}
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                                            {formatDate(blog.created_at)}
                                        </span>
                                        <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-blue)', marginBottom: '0.75rem', lineHeight: '1.4', fontWeight: '700' }}>
                                            {blog.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1 }}>
                                            {blog.content}
                                        </p>
                                        <div>
                                            <Link 
                                                href={`/blogs/${blog.slug}`} 
                                                className="btn btn-gold" 
                                                style={{ 
                                                    padding: '0.5rem 1.25rem', 
                                                    fontSize: '0.8rem', 
                                                    backgroundColor: 'var(--accent-gold)', 
                                                    color: 'var(--accent-blue)', 
                                                    fontWeight: '700', 
                                                    borderRadius: '4px',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                Read Article &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
