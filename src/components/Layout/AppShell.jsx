import { useRef, useState } from 'react';
import { Sidebar } from './Sidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { Save, FolderOpen, LogOut } from 'lucide-react';
import { useTenant } from '../../context/TenantContext'; // Fix import path depending on file location
import { ModelLibrary } from '../Library/ModelLibrary';
import { useDesignStore } from '../../store/designStore';
import { ProjectListModal } from '../Dashboard/ProjectListModal';

export const AppShell = ({ children }) => {
    const { tenant } = useTenant();
    const { saveProject } = useDesignStore();
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Check auth token
            if (!localStorage.getItem('token')) {
                alert('Please Login to Save Projects');
                // You might want to trigger the login modal here via state/event
                return;
            }

            const name = prompt('Enter project name:', `Project ${new Date().toLocaleTimeString()}`);
            if (!name) return;

            await saveProject(name);
            alert('Project Saved Successfully!');
        } catch (err) {
            console.error(err);
            alert('Error saving project: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="app-shell" style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 300px',
            gridTemplateRows: '60px 1fr',
            height: '100vh',
            width: '100vw',
            background: 'var(--bg-app)'
        }}>
            <ModelLibrary />
            {projectModalOpen && <ProjectListModal onClose={() => setProjectModalOpen(false)} />}

            {/* Header */}
            <header className="glass-panel" style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                zIndex: 10,
                borderBottom: 'var(--glass-border)'
            }}>
                <div className="flex-center" style={{ gap: '1rem' }}>
                    <div style={{
                        width: '32px', height: '32px',
                        background: tenant?.color || 'var(--color-primary)',
                        borderRadius: '8px',
                        display: 'grid', placeItems: 'center', fontWeight: 'bold'
                    }}>
                        L
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                        {tenant ? tenant.name : 'LuminaPack AI'}
                    </span>
                </div>

                <div className="actions" style={{ display: 'flex', gap: '1rem' }}>
                    <div className="flex items-center gap-2" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '0.8rem' }}>
                        <span>Org: {tenant ? tenant.id : 'Demo'}</span>
                        <span className="text-yellow-400 font-bold border-l border-white/20 pl-2">v1.2 (DEBUG)</span>
                    </div>

                    <button
                        onClick={() => setProjectModalOpen(true)}
                        className="flex-center hover:bg-white/10 transition-colors" style={{
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'transparent',
                            color: 'white',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            fontWeight: 'medium',
                            cursor: 'pointer'
                        }}>
                        <FolderOpen size={18} /> Open
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-center hover:opacity-90 transition-opacity disabled:opacity-50" style={{
                            gap: '0.5rem',
                            padding: '0.5rem 1.5rem',
                            background: '#f97316', // Orange-500
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                        <Save size={18} /> {isSaving ? 'Saving...' : 'Save Project'}
                    </button>

                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="flex-center hover:bg-red-500/20 hover:text-red-400 transition-colors" style={{
                            padding: '0.5rem',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            {/* Sidebar - Tools - Now uses store internally */}
            <Sidebar />

            {/* Main Stage */}
            <main style={{
                position: 'relative',
                background: 'var(--bg-surface)',
                overflow: 'hidden'
            }}>
                {children}
            </main>

            {/* Right Panel - Properties - Now uses store internally */}
            <PropertiesPanel />
        </div>
    );
};
