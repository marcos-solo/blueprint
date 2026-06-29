import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

function ContentFieldRow({ field }) {
    const { data, setData, post, processing, errors } = useForm({
        id: field.id,
        value: field.value || '',
    });

    const [previewUrl, setPreviewUrl] = useState(field.type === 'image' ? field.value : null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('value', file);
            setPreviewUrl(URL.createObjectURL(file));
            setSuccessMessage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.pages.update'), {
            forceFormData: true,
            onSuccess: () => {
                setSuccessMessage('Content saved successfully.');
                setTimeout(() => setSuccessMessage(null), 3000);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ 
            padding: '1.5rem', 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--bg-tertiary)', 
            borderRadius: '8px', 
            marginBottom: '1rem',
            boxShadow: 'var(--card-shadow)'
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '1.5rem', alignItems: 'start' }} className="grid-2">
                
                {/* Field Label and Details */}
                <div>
                    <label style={{ fontWeight: '700', color: 'var(--accent-blue)', display: 'block', fontSize: '0.95rem' }}>
                        {field.label}
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold-dark)', fontWeight: '600', textTransform: 'uppercase', display: 'block', marginTop: '0.25rem' }}>
                        Section: {field.section}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.1rem' }}>
                        Key: {field.key}
                    </span>
                </div>

                {/* Input Field Area */}
                <div>
                    {field.type === 'text' && (
                        <input 
                            type="text" 
                            value={data.value} 
                            onChange={e => setData('value', e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '0.65rem 0.85rem', 
                                border: '1px solid var(--bg-tertiary)', 
                                borderRadius: '4px',
                                outline: 'none',
                                color: 'var(--text-primary)',
                                background: 'var(--bg-secondary)',
                                fontSize: '0.9rem'
                            }}
                        />
                    )}

                    {field.type === 'textarea' && (
                        <textarea 
                            rows="4" 
                            value={data.value} 
                            onChange={e => setData('value', e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '0.65rem 0.85rem', 
                                border: '1px solid var(--bg-tertiary)', 
                                borderRadius: '4px',
                                outline: 'none',
                                color: 'var(--text-primary)',
                                background: 'var(--bg-secondary)',
                                fontSize: '0.9rem',
                                resize: 'vertical',
                                lineHeight: '1.6'
                            }}
                        />
                    )}

                    {field.type === 'image' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                {previewUrl && (
                                    <img 
                                        src={previewUrl} 
                                        alt="Preview" 
                                        style={{ 
                                            width: '120px', 
                                            height: '70px', 
                                            objectFit: 'cover', 
                                            borderRadius: '4px', 
                                            border: '1px solid var(--bg-tertiary)' 
                                        }} 
                                    />
                                )}
                                <div style={{ flexGrow: 1 }}>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange}
                                        style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                                    />
                                </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Current value: {typeof data.value === 'string' ? data.value : '(New File Selected)'}
                            </span>
                        </div>
                    )}

                    {errors.value && (
                        <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: '600' }}>
                            ⚠️ {errors.value}
                        </div>
                    )}

                    {/* Actions and Feedback */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        {successMessage && (
                            <span style={{ color: '#047857', fontSize: '0.85rem', fontWeight: '700' }}>
                                ✓ {successMessage}
                            </span>
                        )}
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="btn btn-gold"
                            style={{ 
                                padding: '0.5rem 1.25rem', 
                                fontSize: '0.8rem', 
                                backgroundColor: 'var(--accent-gold)', 
                                color: 'var(--accent-blue)', 
                                fontWeight: '700', 
                                borderRadius: '4px', 
                                border: 'none',
                                cursor: 'pointer',
                                opacity: processing ? 0.7 : 1
                            }}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

            </div>
        </form>
    );
}

export default function PageEditor({ contents = [] }) {
    const pages = [
        { id: 'home', label: 'Home Page' },
        { id: 'about', label: 'About Us' },
        { id: 'clients', label: 'Clients Page' },
        { id: 'accolades', label: 'Accolades' }
    ];

    const [activeTab, setActiveTab] = useState('home');

    // Filter contents belonging to the active page tab
    const activeContents = contents.filter(item => item.page === activeTab);

    // Group contents by section
    const sections = activeContents.reduce((groups, item) => {
        if (!groups[item.section]) {
            groups[item.section] = [];
        }
        groups[item.section].push(item);
        return groups;
    }, {});

    return (
        <Layout>
            <Head title="Page Editor | Partner Administration" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header */}
                    <div className="dashboard-header" style={{ borderBottom: '1px solid var(--bg-tertiary)', paddingBottom: '1.75rem', marginBottom: '2.5rem' }}>
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>Partner Administration</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)' }}>Website Page CMS Editor</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.25rem' }}>
                                Edit titles, headers, descriptions, and banners across all public pages of the website dynamically.
                            </p>
                        </div>
                        <div>
                            <Link href={route('dashboard')} className="btn btn-outline" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--bg-tertiary)', borderRadius: '6px' }}>
                                &larr; Briefings Panel
                            </Link>
                        </div>
                    </div>

                    {/* Page Tab Selector */}
                    <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--bg-tertiary)', marginBottom: '2.5rem', paddingBottom: '0.5rem', overflowX: 'auto' }}>
                        {pages.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    background: 'transparent',
                                    color: activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                                    borderBottom: activeTab === tab.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    outline: 'none',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Grouped sections rendering */}
                    {Object.keys(sections).length === 0 ? (
                        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--bg-tertiary)' }}>
                            <span style={{ fontSize: '2.5rem' }}>⚙️</span>
                            <h3 style={{ color: 'var(--accent-blue)', fontWeight: '700', marginTop: '1rem' }}>No Editable Fields Found</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No settings are currently registered under this tab.</p>
                        </div>
                    ) : (
                        Object.keys(sections).map(sectionName => (
                            <div key={sectionName} style={{ marginBottom: '3rem' }}>
                                <h3 style={{ 
                                    fontSize: '1.2rem', 
                                    fontWeight: '800', 
                                    color: 'var(--accent-blue)', 
                                    marginBottom: '1.25rem',
                                    textTransform: 'capitalize',
                                    borderLeft: '4px solid var(--accent-gold)',
                                    paddingLeft: '0.75rem'
                                }}>
                                    {sectionName} Section
                                </h3>
                                <div>
                                    {sections[sectionName].map(field => (
                                        <ContentFieldRow key={field.id} field={field} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </Layout>
    );
}
