import { LogoManager } from '../Tools/LogoManager';
import { ColorPicker } from '../Tools/ColorPicker';
import { AIGenerator } from '../Tools/AIGenerator';
import { useDesignStore } from '../../store/designStore';

export const PropertiesPanel = () => {
    const { activeTool, setLibraryOpen } = useDesignStore();

    const renderContent = () => {
        switch (activeTool) {
            case 'model':
                return (
                    <div className="space-y-4">
                        <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--glass-border)] text-center">
                            <Box className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                            <h4 className="text-white font-medium mb-1">Select Base Model</h4>
                            <p className="text-xs text-gray-400 mb-4">Choose from our catalog or generate with AI</p>
                            <button
                                onClick={() => setLibraryOpen(true)}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                Browse Library
                            </button>
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Current Model</h5>
                            <div className="flex items-center gap-3 p-2 bg-black/20 rounded">
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                                    <Box className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-300">Standard Box</div>
                                    <div className="text-xs text-gray-600">200x150x100mm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
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
