import { Grid } from 'lucide-react';

export const NestingView = () => {
    // Logic to calculate how many boxes fit in a generic sheet (e.g. A3)
    const sheetWidth = 800;
    const sheetHeight = 600;
    const boxSize = 150;

    const cols = Math.floor(sheetWidth / boxSize);
    const rows = Math.floor(sheetHeight / boxSize);
    const items = Array.from({ length: cols * rows });

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333'
        }}>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 'bold' }}>Production Nesting (A1 Sheet)</h2>
                <button className="btn-primary">Export PDF</button>
            </div>

            <div style={{
                width: `${sheetWidth}px`,
                height: `${sheetHeight}px`,
                background: 'white',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gap: '2px',
                padding: '20px',
                border: '1px solid #ccc'
            }}>
                {items.map((_, i) => (
                    <div key={i} style={{
                        border: '1px dashed #999',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        color: '#94a3b8'
                    }}>
                        Box {i + 1}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                <Grid size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Optimized: {items.length} units | Waste: 12%
            </div>
        </div>
    );
};
