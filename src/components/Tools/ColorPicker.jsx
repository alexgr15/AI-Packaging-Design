import { useDesignStore } from '../../store/designStore';

const PALETTE = [
    '#ffffff', '#000000', '#f472b6', '#ef4444',
    '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'
];

export const ColorPicker = () => {
    const { canvasColor, setCanvasColor } = useDesignStore();

    return (
        <div className="tool-panel">
            <h4 style={{ marginBottom: '1rem' }}>Base Material Color</h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {PALETTE.map(color => (
                    <button
                        key={color}
                        onClick={() => setCanvasColor(color)}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: color,
                            border: canvasColor === color ? '2px solid white' : '1px solid var(--border-color)',
                            boxShadow: canvasColor === color ? '0 0 0 2px var(--color-primary)' : 'none',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Custom Hex</label>
                <input
                    type="color"
                    value={canvasColor}
                    onChange={(e) => setCanvasColor(e.target.value)}
                    style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};
