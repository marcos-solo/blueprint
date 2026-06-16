import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <Layout>
            <Head title="Profile" />

            <div className="dashboard-wrapper profile-page">
                <div className="container">
                    <div className="dashboard-header profile-page-header">
                        <div className="dashboard-welcome">
                            <span className="section-subtitle" style={{ marginBottom: '0.25rem', letterSpacing: '1px' }}>
                                Account Settings
                            </span>
                            <h2>
                                Profile
                            </h2>
                            <p>
                                Update your account details and security settings.
                            </p>
                        </div>
                    </div>

                    <div className="profile-page-grid">
                        <div className="profile-panel">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="profile-panel">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="profile-panel">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
