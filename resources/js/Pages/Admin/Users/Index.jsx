import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function AdminUsersIndex() {
    const { admins, flash } = usePage().props;

    return (
        <Layout>
            <Head title="Admin Users Management" />
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        Admin Users Management
                    </h1>
                    <Link
                        href={route('admin.users.create')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--accent-blue)',
                            color: 'white',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'background 0.3s',
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--accent-blue-dark)'}
                        onMouseLeave={(e) => e.target.style.background = 'var(--accent-blue)'}
                    >
                        Add Admin
                    </Link>
                </div>

                {flash?.success && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        background: '#d4edda',
                        color: '#155724',
                        borderRadius: '6px',
                        border: '1px solid #c3e6cb'
                    }}>
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        background: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '6px',
                        border: '1px solid #f5c6cb'
                    }}>
                        {flash.error}
                    </div>
                )}

                <div style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--bg-tertiary)',
                    overflow: 'hidden',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}>
                        <thead>
                            <tr style={{
                                background: 'var(--bg-secondary)',
                                borderBottom: '1px solid var(--bg-tertiary)'
                            }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: 'var(--text-secondary)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                                        No admin users yet
                                    </td>
                                </tr>
                            ) : (
                                admins.data.map((admin) => (
                                    <tr
                                        key={admin.id}
                                        style={{
                                            borderBottom: '1px solid var(--bg-tertiary)',
                                            ':hover': { background: 'var(--bg-secondary)' }
                                        }}
                                        onMouseEnter={(e) => e.target.parentElement.style.background = 'var(--bg-secondary)'}
                                        onMouseLeave={(e) => e.target.parentElement.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{admin.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{admin.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.4rem 0.8rem',
                                                background: admin.role === 'super_admin' ? 'var(--accent-gold-light)' : 'var(--accent-blue-light)',
                                                color: admin.role === 'super_admin' ? '#000' : 'var(--accent-blue)',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                textTransform: 'uppercase'
                                            }}>
                                                {admin.role.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <Link
                                                href={route('admin.users.edit', admin.id)}
                                                style={{
                                                    color: 'var(--accent-blue)',
                                                    textDecoration: 'none',
                                                    marginRight: '1rem',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Remove admin privileges?')) {
                                                        window.location.href = route('admin.users.destroy', admin.id);
                                                    }
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#dc3545',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Demote
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {admins.links && admins.links.length > 1 && (
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        {admins.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    background: link.active ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                                    color: link.active ? 'white' : 'var(--text-primary)',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    opacity: link.url ? 1 : 0.5,
                                    cursor: link.url ? 'pointer' : 'default',
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
