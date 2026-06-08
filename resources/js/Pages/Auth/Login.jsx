import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Client Portal | Login" />

            <div className="auth-wrapper">
                <div className="auth-card glass-panel">
                    
                    <div className="auth-header">
                        <h2>Client Portal Login</h2>
                        <p>Access your scheduled briefings and confidential cases.</p>
                    </div>

                    {status && (
                        <div className="alert-success" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.15)' }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="client@corporate.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                autoFocus
                            />
                            {errors.email && <div className="form-error">{errors.email}</div>}
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="form-error">{errors.password}</div>}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    style={{ marginRight: '0.5rem', accentColor: 'var(--accent-gold)' }}
                                />
                                Remember me
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <button type="submit" className="btn btn-gold btn-full" disabled={processing}>
                            {processing ? 'Authorizing Access...' : 'Login to Secure Portal'}
                        </button>

                    </form>

                    <div className="auth-footer">
                        Don't have a secure client account? <Link href={route('register')}>Register here</Link>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
