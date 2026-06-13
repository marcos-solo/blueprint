import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Show({ blog }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper to get embed URL for YouTube or Vimeo
    const getEmbedUrl = (url) => {
        if (!url) return null;
        
        // YouTube matching
        const ytReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const ytMatch = url.match(ytReg);
        if (ytMatch && ytMatch[2].length === 11) {
            return `https://www.youtube.com/embed/${ytMatch[2]}`;
        }
        
        // Vimeo matching
        const vimeoReg = /vimeo\.com\/(?:video\/)?([0-9]+)/;
        const vimeoMatch = url.match(vimeoReg);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
        }
        
        return url;
    };

    const embedUrl = getEmbedUrl(blog.video_url);

    return (
        <Layout>
            <Head title={`${blog.title} | Blueprint Legal Insights`} />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    
                    {/* Back link */}
                    <div style={{ marginBottom: '2rem' }}>
                        <Link href="/blogs" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            &larr; Back to Insights
                        </Link>
                    </div>

                    {/* Article Header */}
                    <article>
                        <header style={{ marginBottom: '2.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>
                                Published {formatDate(blog.created_at)}
                            </span>
                            <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-blue)', lineHeight: '1.2', fontWeight: '800', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                                {blog.title}
                            </h1>
                            <div style={{ borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1.5rem' }}></div>
                        </header>

                        {/* Article Media (Video or Image) */}
                        {(embedUrl || blog.image_url) && (
                            <div style={{ marginBottom: '3rem', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--card-shadow)', border: '1px solid var(--bg-tertiary)' }}>
                                {embedUrl ? (
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor: '#000000' }}>
                                        <iframe
                                            src={embedUrl}
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={blog.title}
                                        ></iframe>
                                    </div>
                                ) : (
                                    <img 
                                        src={blog.image_url} 
                                        alt={blog.title} 
                                        style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', display: 'block' }} 
                                    />
                                )}
                            </div>
                        )}

                        {/* Article Body Content */}
                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)' }}>
                            {blog.content}
                        </div>
                    </article>

                    {/* Footer of the article */}
                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/blogs" style={{ color: 'var(--accent-blue)', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            &larr; View all articles
                        </Link>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Blueprint Legal Advisory Group
                        </span>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
