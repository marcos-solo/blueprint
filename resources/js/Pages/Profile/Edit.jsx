import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <Layout>
            <Head title="Profile" />

            <div className="dashboard-wrapper" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    <div className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>
                                Account Settings
                            </span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-blue)' }}>
                                Profile
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.25rem' }}>
                                Update your account details and security settings.
                            </p>
                        </div>
                    </div>

                    <div className="py-6">
                        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
