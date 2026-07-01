import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function EditAdmin({ admin }) {
    const { data, setData, patch, processing, errors } = useForm({
        role: admin.role,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.users.update', admin.id));
    };

    return (
        <Layout>
            <Head title={`Edit ${admin.name}`} />
            
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        Edit Admin User
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Managing: <strong>{admin.name}</strong> ({admin.email})
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: 'var(--bg-primary)',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-tertiary)',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    {/* User Info */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.25rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Name
                            </label>
                            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{admin.name}</p>
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.25rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Email
                            </label>
                            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{admin.email}</p>
                        </div>
                    </div>

                    <hr style={{ margin: '1.5rem 0', borderColor: 'var(--bg-tertiary)' }} />

                    {/* Role Selection */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '1rem',
                            fontWeight: '600',
                            color: 'var(--text-primary)',
                            fontSize: '1rem'
                        }}>
                            Change Role
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { value: 'admin', label: 'Admin', description: 'Can manage blogs, testimonials (no page editor or carousel)', icon: '👤' },
                                { value: 'super_admin', label: 'Super Admin', description: 'Full access including page editor, carousel, and user management', icon: '👑' }
                            ].map((role) => (
                                <label key={role.value} style={{
                                    padding: '1.25rem',
                                    border: `2px solid ${data.role === role.value ? 'var(--accent-blue)' : 'var(--bg-tertiary)'}`,
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    background: data.role === role.value ? 'var(--bg-secondary)' : 'transparent',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role.value}
                                        checked={data.role === role.value}
                                        onChange={(e) => setData('role', e.target.value)}
                                        style={{ marginTop: '0.25rem', cursor: 'pointer', width: '18px', height: '18px' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                            {role.icon} {role.label}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{role.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.role && (
                            <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                                {errors.role}
                            </span>
                        )}
                    </div>

                    {/* Submit */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1.5rem',
                                background: 'var(--accent-blue)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                opacity: processing ? 0.5 : 1,
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => !processing && (e.target.style.background = 'var(--accent-blue-dark)')}
                            onMouseLeave={(e) => !processing && (e.target.style.background = 'var(--accent-blue)')}
                        >
                            {processing ? 'Updating...' : 'Update Role'}
                        </button>
                        <Link
                            href={route('admin.users.index')}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1.5rem',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--bg-tertiary)',
                                borderRadius: '6px',
                                fontWeight: '600',
                                textDecoration: 'none',
                                textAlign: 'center',
                                transition: 'all 0.3s'
                            }}
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
