import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Expertise() {
    return (
        <Layout>
            <Head title="Practice Areas & Who We Serve | Blueprint Legal" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    
                    {/* Header Banner */}
                    <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <span className="section-subtitle" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Expertise</span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Practice Areas & Core Sectors</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
                            We deliver focused legal expertise designed to have direct, positive impact on your commercial operations.
                        </p>
                    </div>

                    {/* Expertise Cards Grid */}
                    <div className="expertise-grid" style={{ marginBottom: '5rem' }}>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-building"></i></div>
                            <h3>Corporate & Commercial</h3>
                            <p>Company formation, contracts, M&A, joint ventures and ongoing commercial support.</p>
                            <Link href="/contact" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-registered"></i></div>
                            <h3>Intellectual Property</h3>
                            <p>Trademarks, patents, copyright and brand protection strategies.</p>
                            <Link href="/contact" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-balance-scale"></i></div>
                            <h3>Dispute Resolution</h3>
                            <p>Commercial disputes, mediation, arbitration and litigation support.</p>
                            <Link href="/contact" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-users"></i></div>
                            <h3>Employment</h3>
                            <p>Employment contracts, HR policies, workplace disputes and advisory.</p>
                            <Link href="/contact" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-shield-alt"></i></div>
                            <h3>Regulatory Compliance</h3>
                            <p>Regulatory advisory, licensing, corporate governance and compliance.</p>
                            <Link href="/contact" className="card-link">&rarr;</Link>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-home"></i></div>
                            <h3>Real Estate</h3>
                            <p>Property transactions, leases, due diligence and real estate advisory.</p>
                            <Link href="/contact" className="card-link">&rarr;</Link>
                        </div>
                    </div>



                </div>
            </div>
        </Layout>
    );
}
