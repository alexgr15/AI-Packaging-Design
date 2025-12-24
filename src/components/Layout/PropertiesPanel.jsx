import { LogoManager } from '../Tools/LogoManager';
import { ColorPicker } from '../Tools/ColorPicker';
import { AIGenerator } from '../Tools/AIGenerator';
import { useDesignStore } from '../../store/designStore';

export const PropertiesPanel = () => {
    const { activeTool } = useDesignStore();

    const renderContent = () => {
        switch (activeTool) {
            case 'assets':
                return <LogoManager />;
            case 'colors':
                return <ColorPicker />;
            case 'ai':
                return <AIGenerator />;
            case 'text':
                return <div>Text Tool (Coming Soon)</div>;
            case 'nesting':
                return <div>
                    <h4>Production Settings</h4>
                    <p className="text-sm mt-2">Adjust sheet size and margins.</p>
                </div>;
            default:
                return (
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Configuration</label>
                        <p style={{ fontSize: '0.9rem' }}>Select a tool to edit properties.</p>
                    </div>
                );
        }
    };

    return (
        <aside className="glass-panel" style={{
            borderLeft: 'var(--glass-border)',
            padding: '1.5rem',
            overflowY: 'auto'
        }}>
            <h3 style={{ marginBottom: '1.5rem', textTransform: 'capitalize', color: 'var(--color-accent)' }}>
                {activeTool} Properties
            </h3>

            {renderContent()}
        </aside>
    );
};
