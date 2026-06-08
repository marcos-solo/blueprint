import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Layout>
            <Head title="Client Portal | Register" />

            <div className="auth-wrapper">
                <div className="auth-card glass-panel" style={{ maxWidth: '500px' }}>
                    
                    <div className="auth-header">
                        <h2>Create Secure Account</h2>
                        <p>Register to manage legal briefings and access case timelines.</p>
                    </div>

                    <form onSubmit={submit}>
                        
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Victoria Vance"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                autoFocus
                            />
                            {errors.name && <div className="form-error">{errors.name}</div>}
                        </div>

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
                            />
                            {errors.email && <div className="form-error">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            {errors.password && <div className="form-error">{errors.password}</div>}
                        </div>

                        <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                            <label className="form-label" htmlFor="password_confirmation">Confirm Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                className="form-control"
                                placeholder="••••••••"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            {errors.password_confirmation && <div className="form-error">{errors.password_confirmation}</div>}
                        </div>

                        <button type="submit" className="btn btn-gold btn-full" disabled={processing}>
                            {processing ? 'Creating Secure Profile...' : 'Establish Secure Account'}
                        </button>

                    </form>

                    <div className="auth-footer">
                        Already have a secure client account? <Link href={route('login')}>Login here</Link>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
