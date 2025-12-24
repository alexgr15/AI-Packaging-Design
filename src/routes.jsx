import { Routes, Route, Navigate } from 'react-router-dom';
import { TenantProvider } from './context/TenantContext';
import { EditorLayout } from './components/Editor/EditorLayout';

// Placeholders for Lazily loaded pages
const Dashboard = () => <div className="p-8"><h1>Dashboard (Select an Organization)</h1></div>;

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/demo/editor" replace />} />

            {/* Dynamic Tenant Route */}
            <Route path="/:tenantId/*" element={
                <TenantProvider>
                    <TenantRoutes />
                </TenantProvider>
            } />
        </Routes>
    );
};

// Sub-routes valid only within a tenant
const TenantRoutes = () => {
    return (
        <Routes>
            <Route path="editor" element={<EditorLayout />} />
            <Route path="settings" element={<div>Settings Page</div>} />
        </Routes>
    );
};
