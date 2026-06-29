import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Index({ blogs = [] }) {
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'vlogs', 'articles'

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Filter logic
    const filteredBlogs = blogs.filter(blog => {
        if (activeTab === 'vlogs') {
            return !!blog.video_url;
        }
        if (activeTab === 'articles') {
            return !blog.video_url;
        }
        return true;
    });

    return (
        <Layout>
            <Head title="Legal Insights & Blog | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header Banner */}
                    <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Insights</span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Legal Updates & Business Strategy</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            Stay informed with the latest legal facts, vlogs, commercial analysis, and updates curated by our team.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
                        <button 
                            onClick={() => setActiveTab('all')}
                            style={{
                                padding: '0.6rem 1.5rem',
                                borderRadius: '30px',
                                border: activeTab === 'all' ? '1.5px solid var(--accent-gold)' : '1.5px solid var(--bg-tertiary)',
                                backgroundColor: activeTab === 'all' ? 'var(--accent-blue)' : 'var(--bg-primary)',
                                color: activeTab === 'all' ? '#ffffff' : 'var(--text-primary)',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                        >
                            All Insights
                        </button>
                        <button 
                            onClick={() => setActiveTab('articles')}
                            style={{
                                padding: '0.6rem 1.5rem',
                                borderRadius: '30px',
                                border: activeTab === 'articles' ? '1.5px solid var(--accent-gold)' : '1.5px solid var(--bg-tertiary)',
                                backgroundColor: activeTab === 'articles' ? 'var(--accent-blue)' : 'var(--bg-primary)',
                                color: activeTab === 'articles' ? '#ffffff' : 'var(--text-primary)',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                        >
                            Articles & Reviews
                        </button>
                        <button 
                            onClick={() => setActiveTab('vlogs')}
                            style={{
                                padding: '0.6rem 1.5rem',
                                borderRadius: '30px',
                                border: activeTab === 'vlogs' ? '1.5px solid var(--accent-gold)' : '1.5px solid var(--bg-tertiary)',
                                backgroundColor: activeTab === 'vlogs' ? 'var(--accent-blue)' : 'var(--bg-primary)',
                                color: activeTab === 'vlogs' ? '#ffffff' : 'var(--text-primary)',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                        >
                            Legal Facts Friday (Vlogs)
                        </button>
                    </div>

                    {filteredBlogs.length === 0 ? (
                        <div className="empty-state" style={{ background: 'var(--bg-secondary)', padding: '5rem 2rem', borderRadius: '8px', border: '1px solid var(--bg-tertiary)' }}>
                            <div className="empty-state-icon" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📰</div>
                            <h3 style={{ color: 'var(--accent-blue)', fontWeight: '700', marginBottom: '0.5rem' }}>No Content Found</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Check back soon for legal updates, newsletters, and vlogs.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                            {filteredBlogs.map((blog) => (
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
                                    {/* Cover Image / Video Play Trigger */}
                                    <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#061D3B', position: 'relative' }}>
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
                                        
                                        {/* Format Badge Overlay */}
                                        {blog.video_url ? (
                                            <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', borderRadius: '4px', padding: '0.25rem 0.6rem', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', zIndex: 2 }}>
                                                Vlog
                                            </div>
                                        ) : (
                                            <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--accent-blue)', color: '#ffffff', borderRadius: '4px', padding: '0.25rem 0.6rem', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', zIndex: 2 }}>
                                                Article
                                            </div>
                                        )}

                                        {/* Play Hover Overlay for Vlogs */}
                                        {blog.video_url && (
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(6, 29, 59, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
                                                    <i className="fas fa-play" style={{ marginLeft: '3px' }}></i>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Info */}
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                                            {formatDate(blog.created_at)}
                                        </span>
                                        <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-blue)', marginBottom: '0.75rem', lineHeight: '1.4', fontWeight: '700' }}>
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
                                                {blog.video_url ? 'Watch Vlog \u2192' : 'Read Article \u2192'}
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
