import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function CreateAdmin({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        role: 'admin',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <Layout>
            <Head title="Add Admin User" />
            
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        Add Admin User
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Promote a regular user to admin or super admin
                    </p>
                </div>

                {users.length === 0 && (
                    <div style={{
                        padding: '1.5rem',
                        background: '#fff3cd',
                        color: '#856404',
                        borderRadius: '6px',
                        border: '1px solid #ffeeba',
                        marginBottom: '2rem'
                    }}>
                        No regular users available to promote
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{
                    background: 'var(--bg-primary)',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-tertiary)',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    {/* User Selection */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                            color: 'var(--text-primary)'
                        }}>
                            Select User
                        </label>
                        <select
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `1px solid ${errors.user_id ? '#dc3545' : 'var(--bg-tertiary)'}`,
                                borderRadius: '6px',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="">Choose a user...</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                        {errors.user_id && (
                            <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                {errors.user_id}
                            </span>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                            color: 'var(--text-primary)'
                        }}>
                            Role
                        </label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[
                                { value: 'admin', label: 'Admin', description: 'Can manage blogs, testimonials (no page editor or carousel)' },
                                { value: 'super_admin', label: 'Super Admin', description: 'Full access including page editor and carousel' }
                            ].map((role) => (
                                <label key={role.value} style={{
                                    flex: 1,
                                    padding: '1rem',
                                    border: `2px solid ${data.role === role.value ? 'var(--accent-blue)' : 'var(--bg-tertiary)'}`,
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    background: data.role === role.value ? 'var(--bg-secondary)' : 'transparent',
                                    transition: 'all 0.2s'
                                }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role.value}
                                        checked={data.role === role.value}
                                        onChange={(e) => setData('role', e.target.value)}
                                        style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                                    />
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{role.label}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{role.description}</div>
                                </label>
                            ))}
                        </div>
                        {errors.role && (
                            <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                                {errors.role}
                            </span>
                        )}
                    </div>

                    {/* Submit */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            type="submit"
                            disabled={processing || users.length === 0}
                            style={{
                                flex: 1,
                                padding: '0.75rem 1.5rem',
                                background: 'var(--accent-blue)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                opacity: processing || users.length === 0 ? 0.5 : 1,
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => !processing && (e.target.style.background = 'var(--accent-blue-dark)')}
                            onMouseLeave={(e) => !processing && (e.target.style.background = 'var(--accent-blue)')}
                        >
                            {processing ? 'Adding...' : 'Add Admin'}
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
