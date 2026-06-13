import React, { useState } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Modal from '@/Components/Modal';

export default function AdminBlogs({ blogs = [] }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        image_url: '',
        video_url: '',
        content: '',
    });

    const openCreateModal = () => {
        setEditingBlog(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setData({
            title: blog.title || '',
            image_url: blog.image_url || '',
            video_url: blog.video_url || '',
            content: blog.content || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBlog) {
            patch(route('admin.blogs.update', editingBlog.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.blogs.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (blog) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            destroy(route('admin.blogs.destroy', blog.id));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Layout>
            <Head title="Manage Blogs | Partner Administration" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header bar */}
                    <div className="dashboard-header" style={{ borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1.75rem', marginBottom: '2.5rem' }}>
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>Partner Administration</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)' }}>Blog Articles & Insights</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.25rem' }}>Publish, update, and remove analysis, guidelines, and advisory contents.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Link href={route('dashboard')} className="btn btn-outline" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--bg-tertiary)', borderRadius: '6px' }}>
                                &larr; Briefings Panel
                            </Link>
                            <button 
                                onClick={openCreateModal} 
                                className="btn btn-gold" 
                                style={{ padding: '0.65rem 1.75rem', fontSize: '0.85rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'opacity 0.2s' }}
                                onMouseEnter={e => e.target.style.opacity = 0.9}
                                onMouseLeave={e => e.target.style.opacity = 1}
                            >
                                ✍ Write New Post
                            </button>
                        </div>
                    </div>

                    {flash?.success && (
                        <div className="alert-success" style={{ marginBottom: '2rem', padding: '1rem', background: '#eefcf5', border: '1px solid #cbf3dd', color: '#1e7e4c', borderRadius: '4px', fontSize: '0.9rem' }}>
                            {flash.success}
                        </div>
                    )}

                    {/* Blog list table container */}
                    <div className="glass-panel" style={{ background: '#ffffff', border: '1px solid rgba(10, 48, 104, 0.08)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px -3px rgba(0,0,0,0.02)' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-secondary)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-blue)', margin: 0 }}>
                                Published Library
                            </h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', fontWeight: 'bold', backgroundColor: 'rgba(197, 168, 128, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                                {blogs.length} Articles
                            </span>
                        </div>

                        {blogs.length === 0 ? (
                            <div className="empty-state" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                                <div className="empty-state-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-blue)' }}>No Blog Posts Created</h3>
                                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0.5rem auto 0' }}>You haven't written any insights or legal briefings yet. Get started by writing a post!</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--bg-tertiary)', color: 'var(--text-secondary)', backgroundColor: '#fafbfc' }}>
                                            <th style={{ padding: '1.2rem 2rem', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Cover</th>
                                            <th style={{ padding: '1.2rem 2rem', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Title</th>
                                            <th style={{ padding: '1.2rem 2rem', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Media Details</th>
                                            <th style={{ padding: '1.2rem 2rem', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Created At</th>
                                            <th style={{ padding: '1.2rem 2rem', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.map((blog) => (
                                            <tr key={blog.id} style={{ borderBottom: '1px solid var(--bg-tertiary)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 48, 104, 0.01)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <td style={{ padding: '1.2rem 2rem' }}>
                                                    {blog.image_url ? (
                                                        <img 
                                                            src={blog.image_url} 
                                                            alt={blog.title} 
                                                            style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--bg-tertiary)' }}
                                                        />
                                                    ) : (
                                                        <div style={{ width: '80px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--accent-blue-dark)', color: 'rgba(255,255,255,0.25)', borderRadius: '6px', fontSize: '1.3rem' }}>
                                                            ⚖️
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1.2rem 2rem', fontWeight: '600', color: 'var(--accent-blue)' }}>
                                                    <div style={{ fontSize: '1.05rem', fontWeight: '700' }}>{blog.title}</div>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'normal', marginTop: '0.2rem' }}>
                                                        slug: /{blog.slug}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.2rem 2rem' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                        {blog.image_url ? (
                                                            <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                                                🖼️ Image Active
                                                            </span>
                                                        ) : (
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No Cover Image</span>
                                                        )}
                                                        {blog.video_url ? (
                                                            <span style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                                                🎥 Video Integrated
                                                            </span>
                                                        ) : (
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No Video</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.2rem 2rem', color: 'var(--text-secondary)' }}>
                                                    {formatDate(blog.created_at)}
                                                </td>
                                                <td style={{ padding: '1.2rem 2rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'inline-flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                        <Link 
                                                            href={`/blogs/${blog.slug}`} 
                                                            className="btn btn-outline" 
                                                            target="_blank"
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}
                                                        >
                                                            👁 View
                                                        </Link>
                                                        <button 
                                                            onClick={() => openEditModal(blog)} 
                                                            className="btn btn-outline" 
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(blog)} 
                                                            className="btn" 
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', backgroundColor: 'rgba(239, 68, 68, 0.07)', color: '#b91c1c', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                                                            onMouseEnter={e => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'}
                                                            onMouseLeave={e => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.07)'}
                                                        >
                                                            🗑 Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for adding/editing blogs */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="5xl">
                <div style={{ padding: '2.5rem', background: '#ffffff' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--accent-blue)', marginBottom: '2rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {editingBlog ? '📝 Edit Blog Article' : '✍ Write New Blog Article'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        {/* 2-Column Split Layout */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '2rem' }}>
                            
                            {/* Left Column: Form Fields */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Title */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                                        Article Title *
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="e.g., Guide to Corporate Formations in Tanzania"
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    {errors.title && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.title}</span>}
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                                        Cover Image Link / URL (Optional)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.image_url}
                                        onChange={e => setData('image_url', e.target.value)}
                                        placeholder="e.g., https://images.unsplash.com/photo-..."
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    {errors.image_url && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.image_url}</span>}
                                </div>

                                {/* Video URL */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                                        Embedded Video Link / URL (YouTube or Vimeo, Optional)
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.video_url}
                                        onChange={e => setData('video_url', e.target.value)}
                                        placeholder="e.g., https://www.youtube.com/watch?v=..."
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    {errors.video_url && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.video_url}</span>}
                                </div>

                                {/* Content */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                                        Advisory Body Content *
                                    </label>
                                    <textarea 
                                        rows="8"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        placeholder="Write your article analysis, updates and insights here. Paragraphs and line breaks are fully preserved."
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--bg-tertiary)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
                                    ></textarea>
                                    {errors.content && <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.content}</span>}
                                </div>
                            </div>

                            {/* Right Column: Live Card Preview */}
                            <div>
                                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                                    Live Frontpage Grid Card Preview:
                                </span>
                                
                                <div style={{ border: '1px dashed var(--accent-gold)', padding: '1rem', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                                    
                                    {/* Mock Card mimicking public Index.jsx */}
                                    <div 
                                        style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            borderRadius: '8px', 
                                            overflow: 'hidden', 
                                            background: '#ffffff', 
                                            border: '1px solid var(--bg-tertiary)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                                            width: '100%',
                                            maxWidth: '340px',
                                            height: '420px'
                                        }}
                                    >
                                        {/* Cover Image */}
                                        <div style={{ height: '180px', overflow: 'hidden', backgroundColor: 'var(--accent-blue-dark)', position: 'relative' }}>
                                            {data.image_url ? (
                                                <img 
                                                    src={data.image_url} 
                                                    alt="Preview cover" 
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                />
                                            ) : null}
                                            <div style={{ width: '100%', height: '100%', display: data.image_url ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.25)', fontSize: '4.5rem' }}>
                                                ⚖️
                                            </div>
                                            {data.video_url && (
                                                <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(10, 42, 74, 0.85)', color: 'var(--accent-gold)', borderRadius: '20px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--accent-gold)' }}>
                                                    🎥 Video Included
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Info */}
                                        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '1px' }}>
                                                Today &bull; Insights Preview
                                            </span>
                                            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', marginBottom: '0.5rem', lineHeight: '1.3', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {data.title || 'Untitled Article Preview'}
                                            </h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1 }}>
                                                {data.content || 'Your content preview will automatically render in this block as you type...'}
                                            </p>
                                            <div>
                                                <button 
                                                    type="button"
                                                    style={{ 
                                                        padding: '0.4rem 1.2rem', 
                                                        fontSize: '0.75rem', 
                                                        backgroundColor: 'var(--accent-gold)', 
                                                        color: 'var(--accent-blue)', 
                                                        fontWeight: '700', 
                                                        borderRadius: '4px',
                                                        border: 'none',
                                                        display: 'inline-block'
                                                    }}
                                                >
                                                    Read Article &rarr;
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {/* Form Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
                            <button 
                                type="button"
                                onClick={closeModal} 
                                className="btn btn-outline" 
                                style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '6px' }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="btn btn-gold" 
                                style={{ padding: '0.65rem 1.75rem', fontSize: '0.85rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
                            >
                                {processing ? 'Publishing...' : (editingBlog ? 'Save Article' : 'Publish Article')}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </Layout>
    );
}
