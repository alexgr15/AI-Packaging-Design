import { Sidebar } from './Sidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { Save } from 'lucide-react';
import { useTenant } from '../../context/TenantContext'; // Fix import path depending on file location
import { ModelLibrary } from '../Library/ModelLibrary';
// Assuming AppShell is in components/Layout
// TenantContext is in ../../context/TenantContext

export const AppShell = ({ children }) => {
    const { tenant } = useTenant();

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
                    <button className="flex-center" style={{
                        gap: '0.5rem',
                        padding: '0.5rem 1.5rem',
                        background: '#f97316', // Orange-500
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        <Save size={18} /> Save Project
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
