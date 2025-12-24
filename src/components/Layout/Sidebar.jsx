import { Package, Image as ImageIcon, Type, Palette, Wand2, Grid, Scissors } from 'lucide-react';
import { useDesignStore } from '../../store/designStore';

const Tools = [
    { id: 'box', icon: Package, label: 'Model' },
    { id: 'assets', icon: ImageIcon, label: 'Assets' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'colors', icon: Palette, label: 'Colors' },
    { id: 'ai', icon: Wand2, label: 'AI Gen' },
    { id: 'nesting', icon: Grid, label: 'Nesting' }, // Production tool
    { id: 'dieline', icon: Scissors, label: 'Dieline' }
];

export const Sidebar = () => {
    const { activeTool, setActiveTool } = useDesignStore();

    return (
        <aside className="glass-panel" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem 0',
            gap: '1rem',
            borderRight: 'var(--glass-border)'
        }}>
            {Tools.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    title={tool.label}
                    style={{
                        background: activeTool === tool.id ? 'var(--color-primary-glow)' : 'transparent',
                        border: activeTool === tool.id ? '1px solid var(--color-primary)' : 'none',
                        color: activeTool === tool.id ? '#fff' : 'var(--text-secondary)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                        transition: 'all 0.2s'
                    }}
                >
                    <tool.icon size={24} />
                </button>
            ))}
        </aside>
    );
};
