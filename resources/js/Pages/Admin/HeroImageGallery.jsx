import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function HeroImageGallery({ images = [] }) {
    const { flash = {} } = usePage().props;
    const [showToast, setShowToast] = useState(false);
    const [draggedId, setDraggedId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        alt_text: '',
    });

    React.useEffect(() => {
        if (flash.success) {
            setShowToast(true);
            reset();
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash.success, reset]);

    const handleFileSelect = (e) => {
        setData('image', e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.image) {
            formData.append('image', data.image);
            formData.append('alt_text', data.alt_text);

            post(route('admin.hero-images.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <Layout>
            <Head title="Manage Hero Images | Partner Administration" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    <div className="dashboard-header" style={{ borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1.75rem', marginBottom: '2.5rem' }}>
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>Partner Administration</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)' }}>Manage Hero Carousel</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.25rem' }}>
                                Upload and organize images for the home page hero section. Images will rotate with smooth transitions.
                            </p>
                        </div>
                        <div>
                            <Link href={route('admin.pages.index')} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                                Return to Page Editor
                            </Link>
                        </div>
                    </div>

                    {showToast && flash.success && (
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
                            animation: 'slideInRight 0.4s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}>
                            <i className="fas fa-check-circle" style={{ fontSize: '1.2rem' }} />
                            {flash.success}
                        </div>
                    )}

                    <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem', borderRadius: '16px' }}>
                        <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem', fontWeight: '700' }}>Upload New Hero Image</h3>
                        <form onSubmit={handleUpload} style={{ display: 'grid', gap: '1.5rem' }}>
                            <label style={{ display: 'grid', gap: '0.5rem' }}>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Image File (JPEG, PNG, GIF, WebP)</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    style={{
                                        padding: '1rem',
                                        border: '2px dashed var(--bg-tertiary)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(6, 29, 59, 0.02)',
                                    }}
                                />
                                {errors.image && <span style={{ color: '#b91c1c', fontSize: '0.8rem', fontWeight: '600' }}>{errors.image}</span>}
                                {data.image && <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: '600' }}>✓ {data.image.name}</span>}
                            </label>

                            <label style={{ display: 'grid', gap: '0.5rem' }}>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Alt Text (Optional)</span>
                                <input
                                    type="text"
                                    value={data.alt_text}
                                    onChange={(e) => setData('alt_text', e.target.value)}
                                    className="form-input"
                                    placeholder="Describe the image for accessibility"
                                />
                            </label>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="submit" disabled={processing || !data.image} className="btn btn-gold" style={{ minWidth: '160px' }}>
                                    {processing ? 'Uploading...' : 'Upload Image'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem', fontWeight: '700', fontSize: '1.35rem' }}>Current Hero Images</h3>

                    {images.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', minHeight: '220px' }}>
                            <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>No images uploaded yet</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Upload hero images to display them in the home page carousel.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {images.map((image, idx) => (
                                <HeroImageCard key={image.id} image={image} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </Layout>
    );
}

function HeroImageCard({ image, index }) {
    const [isDeleting, setIsDeleting] = React.useState(false);
    const { delete: deleteImage } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this image?')) {
            setIsDeleting(true);
            deleteImage(route('admin.hero-images.destroy', image.id), {
                preserveScroll: true,
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    return (
        <div className="glass-panel" style={{
            padding: '1.25rem',
            borderRadius: '14px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'zoomIn 0.4s ease',
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '60%',
                overflow: 'hidden',
                borderRadius: '10px',
                marginBottom: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
            }}>
                <img
                    src={`/storage/${image.image_path}`}
                    alt={image.alt_text || 'Hero Image'}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'var(--accent-blue)',
                    color: 'white',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                }}>
                    #{index + 1}
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>
                {image.alt_text || 'No alt text'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="btn"
                    style={{
                        flex: 1,
                        padding: '0.65rem 1rem',
                        background: '#dc2626',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isDeleting ? 'not-allowed' : 'pointer',
                        opacity: isDeleting ? 0.6 : 1,
                    }}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}
