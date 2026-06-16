import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import Modal from '@/Components/Modal';

export default function AdminBlogs({ blogs = [] }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [copyFeedback, setCopyFeedback] = useState(null);
    const titleInputRef = useRef(null);
    const modalContentRef = useRef(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        image_url: '',
        video_url: '',
        content: '',
    });

    // Detect unsaved changes
    const hasUnsavedChanges = originalData && (
        data.title !== originalData.title ||
        data.image_url !== originalData.image_url ||
        data.video_url !== originalData.video_url ||
        data.content !== originalData.content
    );

    // Calculate word count and reading time
    const wordCount = data.content.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute

    // Copy preview link
    const copyPreviewLink = () => {
        if (editingBlog) {
            const link = `${window.location.origin}/blogs/${editingBlog.slug}`;
            navigator.clipboard.writeText(link).then(() => {
                setCopyFeedback('Link copied!');
                setTimeout(() => setCopyFeedback(null), 2000);
            });
        }
    };

    // Focus management - focus title input when modal opens
    useEffect(() => {
        if (isModalOpen && titleInputRef.current) {
            setTimeout(() => {
                titleInputRef.current.focus();
            }, 100);
        }
    }, [isModalOpen]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
            // Ctrl+S or Cmd+S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's' && isModalOpen) {
                e.preventDefault();
                handleSubmit(e);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isModalOpen, editingBlog]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const openCreateModal = () => {
        setEditingBlog(null);
        const emptyData = {
            title: '',
            image_url: '',
            video_url: '',
            content: '',
        };
        reset();
        setOriginalData(emptyData);
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        const blogData = {
            title: blog.title || '',
            image_url: blog.image_url || '',
            video_url: blog.video_url || '',
            content: blog.content || '',
        };
        setData(blogData);
        setOriginalData(blogData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Are you sure you want to close?')) {
            return;
        }
        setIsModalOpen(false);
        setIsSubmitting(false);
        setTimeout(() => {
            setEditingBlog(null);
            setOriginalData(null);
            reset();
        }, 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        if (editingBlog) {
            put(route('admin.blogs.update', editingBlog.id), {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setOriginalData(null);
                    closeModal();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            post(route('admin.blogs.store'), {
                onSuccess: () => {
                    setIsSubmitting(false);
                    setOriginalData(null);
                    closeModal();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
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

    // Check if form has any content for preview
    const hasFormContent = data.title || data.content || data.image_url || data.video_url;

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
                                style={{ padding: '0.65rem 1.75rem', fontSize: '0.85rem', backgroundColor: 'var(--accent-gold)', color: 'var(--accent-blue)', fontWeight: '700', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
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

            {/* Improved Modal with enhanced UI/UX */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="5xl">
                <div 
                    ref={modalContentRef}
                    style={{ 
                        padding: '0', 
                        background: '#ffffff',
                        borderRadius: '12px',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideUp 0.3s ease-out',
                    }}
                >
                    {/* Modal Header - Sticky */}
                    <div style={{ 
                        padding: '1.75rem 2.5rem',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fafbfc',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px',
                        flexShrink: 0,
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <h3 style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: '700', 
                                    color: 'var(--accent-blue)',
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {editingBlog ? '✏️ Edit Blog Article' : '📝 Create New Article'}
                                </h3>
                                {hasUnsavedChanges && (
                                    <span style={{ 
                                        fontSize: '0.65rem',
                                        background: '#fef3c7',
                                        color: '#92400e',
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem'
                                    }}>
                                        ⚠️ Unsaved
                                    </span>
                                )}
                            </div>
                            <p style={{ 
                                fontSize: '0.85rem', 
                                color: 'var(--text-secondary)',
                                margin: '0.35rem 0 0 0'
                            }}>
                                {editingBlog ? 'Update your article content and media' : 'Write a new advisory article for your audience'}
                                <span style={{ fontSize: '0.75rem', marginLeft: '1rem', color: '#999' }}>
                                    💡 Keyboard: Ctrl+S to save • Esc to close
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={closeModal}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                transition: 'all 0.2s',
                                lineHeight: 1,
                            }}
                            onMouseEnter={e => { e.target.style.backgroundColor = '#f0f0f0'; e.target.style.color = '#000'; }}
                            onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-secondary)'; }}
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Modal Body - Scrollable */}
                    <div style={{ 
                        padding: '2.5rem',
                        overflowY: 'auto',
                        flex: 1,
                    }}>
                        <form onSubmit={handleSubmit}>
                            {/* 2-Column Split Layout */}
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1.2fr 0.8fr', 
                                gap: '2.5rem',
                                alignItems: 'start'
                            }}>
                                
                                {/* Left Column: Form Fields */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Title */}
                                    <div>
                                        <label style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.8rem', 
                                            fontWeight: '600', 
                                            textTransform: 'uppercase', 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: '0.5rem', 
                                            letterSpacing: '0.5px' 
                                        }}>
                                            <span style={{ color: '#dc2626' }}>*</span> Article Title
                                        </label>
                                        <input 
                                            ref={titleInputRef}
                                            type="text" 
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            placeholder="e.g., Guide to Corporate Formations in Tanzania"
                                            required
                                            style={{ 
                                                width: '100%', 
                                                padding: '0.8rem 1rem', 
                                                borderRadius: '8px', 
                                                border: errors.title ? '2px solid #dc2626' : '1px solid #e0e0e0',
                                                fontSize: '0.95rem', 
                                                outline: 'none',
                                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                                backgroundColor: '#fafbfc',
                                            }}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'var(--accent-gold)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(197, 168, 128, 0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = errors.title ? '#dc2626' : '#e0e0e0';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        {errors.title && (
                                            <span style={{ 
                                                color: '#dc2626', 
                                                fontSize: '0.8rem', 
                                                marginTop: '0.35rem', 
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}>
                                                ⚠️ {errors.title}
                                            </span>
                                        )}
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.8rem', 
                                            fontWeight: '600', 
                                            textTransform: 'uppercase', 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: '0.5rem', 
                                            letterSpacing: '0.5px' 
                                        }}>
                                            🖼️ Cover Image URL <span style={{ fontWeight: '400', color: '#999' }}>(Optional)</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            value={data.image_url}
                                            onChange={e => setData('image_url', e.target.value)}
                                            placeholder="https://images.unsplash.com/photo-..."
                                            style={{ 
                                                width: '100%', 
                                                padding: '0.8rem 1rem', 
                                                borderRadius: '8px', 
                                                border: errors.image_url ? '2px solid #dc2626' : '1px solid #e0e0e0',
                                                fontSize: '0.95rem', 
                                                outline: 'none',
                                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                                backgroundColor: '#fafbfc',
                                            }}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'var(--accent-gold)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(197, 168, 128, 0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = errors.image_url ? '#dc2626' : '#e0e0e0';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        {errors.image_url && (
                                            <span style={{ 
                                                color: '#dc2626', 
                                                fontSize: '0.8rem', 
                                                marginTop: '0.35rem', 
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}>
                                                ⚠️ {errors.image_url}
                                            </span>
                                        )}
                                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.35rem' }}>
                                            💡 Recommended: 1200x630px for optimal display
                                        </div>
                                    </div>

                                    {/* Video URL */}
                                    <div>
                                        <label style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.8rem', 
                                            fontWeight: '600', 
                                            textTransform: 'uppercase', 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: '0.5rem', 
                                            letterSpacing: '0.5px' 
                                        }}>
                                            🎥 Video URL <span style={{ fontWeight: '400', color: '#999' }}>(Optional)</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            value={data.video_url}
                                            onChange={e => setData('video_url', e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            style={{ 
                                                width: '100%', 
                                                padding: '0.8rem 1rem', 
                                                borderRadius: '8px', 
                                                border: errors.video_url ? '2px solid #dc2626' : '1px solid #e0e0e0',
                                                fontSize: '0.95rem', 
                                                outline: 'none',
                                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                                backgroundColor: '#fafbfc',
                                            }}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'var(--accent-gold)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(197, 168, 128, 0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = errors.video_url ? '#dc2626' : '#e0e0e0';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        {errors.video_url && (
                                            <span style={{ 
                                                color: '#dc2626', 
                                                fontSize: '0.8rem', 
                                                marginTop: '0.35rem', 
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}>
                                                ⚠️ {errors.video_url}
                                            </span>
                                        )}
                                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.35rem' }}>
                                            💡 Supports YouTube, Vimeo, and other embedded video platforms
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.8rem', 
                                            fontWeight: '600', 
                                            textTransform: 'uppercase', 
                                            color: 'var(--text-secondary)', 
                                            marginBottom: '0.5rem', 
                                            letterSpacing: '0.5px' 
                                        }}>
                                            <span style={{ color: '#dc2626' }}>*</span> Article Content
                                        </label>
                                        <textarea 
                                            rows="10"
                                            value={data.content}
                                            onChange={e => setData('content', e.target.value)}
                                            placeholder="Write your article analysis, updates and insights here. Paragraphs and line breaks are fully preserved."
                                            required
                                            style={{ 
                                                width: '100%', 
                                                padding: '0.8rem 1rem', 
                                                borderRadius: '8px', 
                                                border: errors.content ? '2px solid #dc2626' : '1px solid #e0e0e0',
                                                fontSize: '0.95rem', 
                                                outline: 'none', 
                                                resize: 'vertical', 
                                                fontFamily: 'inherit', 
                                                lineHeight: '1.6',
                                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                                backgroundColor: '#fafbfc',
                                                minHeight: '200px',
                                            }}
                                            onFocus={e => {
                                                e.target.style.borderColor = 'var(--accent-gold)';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(197, 168, 128, 0.1)';
                                            }}
                                            onBlur={e => {
                                                e.target.style.borderColor = errors.content ? '#dc2626' : '#e0e0e0';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        {errors.content && (
                                            <span style={{ 
                                                color: '#dc2626', 
                                                fontSize: '0.8rem', 
                                                marginTop: '0.35rem', 
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}>
                                                ⚠️ {errors.content}
                                            </span>
                                        )}
                                        <div style={{ 
                                            fontSize: '0.75rem', 
                                            color: '#999', 
                                            marginTop: '0.35rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span>
                                                💡 {wordCount} words • ~{readingTime} min read • {data.content.length} characters
                                            </span>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                background: wordCount > 50 ? '#d1fae5' : '#fee2e2',
                                                color: wordCount > 50 ? '#065f46' : '#991b1b',
                                                padding: '0.15rem 0.5rem',
                                                borderRadius: '10px',
                                                fontWeight: '600'
                                            }}>
                                                {wordCount < 50 ? '⚠️ Short' : wordCount < 200 ? '✓ Good' : '✓ Excellent'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Live Preview */}
                                <div style={{ position: 'sticky', top: '0' }}>
                                    <div style={{ 
                                        background: 'linear-gradient(135deg, #fafbfc 0%, #f0f2f5 100%)',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        border: '2px dashed #e0e0e0',
                                    }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            marginBottom: '1rem',
                                            gap: '0.5rem'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ 
                                                    fontSize: '0.7rem', 
                                                    fontWeight: '700', 
                                                    textTransform: 'uppercase', 
                                                    color: 'var(--text-secondary)',
                                                    letterSpacing: '1px',
                                                }}>
                                                    📱 Live Preview
                                                </span>
                                                {hasFormContent && (
                                                    <span style={{ 
                                                        fontSize: '0.65rem',
                                                        color: '#059669',
                                                        background: '#d1fae5',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '12px',
                                                        fontWeight: '600'
                                                    }}>
                                                        ● Live
                                                    </span>
                                                )}
                                            </div>
                                            {editingBlog && (
                                                <button
                                                    type="button"
                                                    onClick={copyPreviewLink}
                                                    style={{
                                                        fontSize: '0.7rem',
                                                        padding: '0.25rem 0.6rem',
                                                        background: copyFeedback ? '#d1fae5' : '#eff6ff',
                                                        color: copyFeedback ? '#065f46' : '#0369a1',
                                                        border: copyFeedback ? '1px solid #6ee7b7' : '1px solid #bae6fd',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontWeight: '600',
                                                        transition: 'all 0.2s',
                                                    }}
                                                    onMouseEnter={e => { if (!copyFeedback) { e.target.style.background = '#bae6fd'; } }}
                                                    onMouseLeave={e => { if (!copyFeedback) { e.target.style.background = '#eff6ff'; } }}
                                                >
                                                    {copyFeedback ? '✓ Copied!' : '🔗 Copy Link'}
                                                </button>
                                            )}
                                        </div>
                                        
                                        {/* Mock Card */}
                                        <div 
                                            style={{ 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                borderRadius: '12px', 
                                                overflow: 'hidden', 
                                                background: '#ffffff', 
                                                border: '1px solid #e0e0e0',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            {/* Cover Image */}
                                            <div style={{ 
                                                height: '180px', 
                                                overflow: 'hidden', 
                                                backgroundColor: '#0a2a4a', 
                                                position: 'relative',
                                                transition: 'all 0.3s ease',
                                            }}>
                                                {data.image_url ? (
                                                    <img 
                                                        src={data.image_url} 
                                                        alt="Preview cover" 
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                        style={{ 
                                                            width: '100%', 
                                                            height: '100%', 
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.3s ease',
                                                        }} 
                                                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                                    />
                                                ) : null}
                                                <div style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    display: data.image_url ? 'none' : 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    color: 'rgba(255, 255, 255, 0.2)', 
                                                    fontSize: '4rem',
                                                    background: 'linear-gradient(135deg, #0a2a4a 0%, #1a4a7a 100%)',
                                                }}>
                                                    ⚖️
                                                </div>
                                                {data.video_url && (
                                                    <div style={{ 
                                                        position: 'absolute', 
                                                        top: '12px', 
                                                        right: '12px', 
                                                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                                                        color: '#fff', 
                                                        borderRadius: '20px', 
                                                        padding: '0.3rem 0.8rem', 
                                                        fontSize: '0.7rem', 
                                                        fontWeight: 'bold', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: '0.3rem',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        backdropFilter: 'blur(4px)',
                                                    }}>
                                                        ▶️ Video
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Info */}
                                            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                                <span style={{ 
                                                    fontSize: '0.65rem', 
                                                    color: 'var(--accent-gold)', 
                                                    fontWeight: 'bold', 
                                                    textTransform: 'uppercase', 
                                                    marginBottom: '0.4rem', 
                                                    letterSpacing: '1px' 
                                                }}>
                                                    {editingBlog ? '✏️ Draft' : '📝 New'} • Advisory
                                                </span>
                                                <h3 style={{ 
                                                    fontSize: '1.1rem', 
                                                    color: 'var(--accent-blue)', 
                                                    marginBottom: '0.5rem', 
                                                    lineHeight: '1.3', 
                                                    fontWeight: '700',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}>
                                                    {data.title || 'Untitled Article'}
                                                </h3>
                                                <p style={{ 
                                                    color: 'var(--text-secondary)', 
                                                    fontSize: '0.85rem', 
                                                    lineHeight: '1.5', 
                                                    marginBottom: '1rem',
                                                    display: '-webkit-box', 
                                                    WebkitLineClamp: 3, 
                                                    WebkitBoxOrient: 'vertical', 
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    flexGrow: 1,
                                                }}>
                                                    {data.content || 'Your article content will appear here as you type...'}
                                                </p>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.7rem', color: '#999' }}>
                                                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </span>
                                                        {wordCount > 0 && (
                                                            <span style={{ 
                                                                fontSize: '0.7rem', 
                                                                color: '#999',
                                                                marginLeft: '0.5rem',
                                                                paddingLeft: '0.5rem',
                                                                borderLeft: '1px solid #ddd'
                                                            }}>
                                                                📖 {readingTime} min
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span style={{ 
                                                        padding: '0.3rem 1rem', 
                                                        fontSize: '0.7rem', 
                                                        backgroundColor: 'var(--accent-gold)', 
                                                        color: 'var(--accent-blue)', 
                                                        fontWeight: '700', 
                                                        borderRadius: '4px',
                                                        opacity: hasFormContent ? 1 : 0.5,
                                                        transition: 'opacity 0.3s ease',
                                                    }}>
                                                        Read More →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {!hasFormContent && (
                                            <div style={{ 
                                                textAlign: 'center', 
                                                marginTop: '0.75rem',
                                                fontSize: '0.8rem',
                                                color: '#999',
                                            }}>
                                                Start typing to see live preview
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Modal Footer - Sticky */}
                    <div style={{ 
                        padding: '1.25rem 2.5rem',
                        borderTop: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '0.75rem',
                        backgroundColor: '#fafbfc',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px',
                        flexShrink: 0,
                    }}>
                        <button 
                            type="button"
                            onClick={closeModal} 
                            style={{ 
                                padding: '0.7rem 1.75rem', 
                                fontSize: '0.85rem', 
                                cursor: 'pointer', 
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                background: '#fff',
                                color: 'var(--text-secondary)',
                                fontWeight: '600',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.target.style.background = '#f5f5f5'; e.target.style.borderColor = '#ccc'; }}
                            onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.borderColor = '#e0e0e0'; }}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting || processing}
                            style={{ 
                                padding: '0.7rem 2rem', 
                                fontSize: '0.85rem', 
                                backgroundColor: 'var(--accent-gold)', 
                                color: 'var(--accent-blue)',
                                border: 'none', 
                                borderRadius: '8px', 
                                fontWeight: '700', 
                                cursor: isSubmitting || processing ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                opacity: isSubmitting || processing ? 0.6 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                            onMouseEnter={e => {
                                if (!isSubmitting && !processing) {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(197, 168, 128, 0.3)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isSubmitting && !processing) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {isSubmitting || processing ? (
                                <>
                                    <span style={{
                                        display: 'inline-block',
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid var(--accent-blue)',
                                        borderTop: '2px solid transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite',
                                    }}></span>
                                    {editingBlog ? 'Updating...' : 'Publishing...'}
                                </>
                            ) : (
                                <>{editingBlog ? '✅ Update Article' : '🚀 Publish Article'}</>
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add CSS animations */}
            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </Layout>
    );
}