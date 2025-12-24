import { Upload, Plus } from 'lucide-react';
import { useDesignStore } from '../../store/designStore';

// Mock DB of Logos
const MOCK_LOGOS = [
    { id: 1, url: 'https://via.placeholder.com/150/0000FF/808080?text=LOGO+1', name: 'Logo Blue' },
    { id: 2, url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=LOGO+2', name: 'Logo Red' },
];

export const LogoManager = () => {
    const { addElement } = useDesignStore();

    const handleAddLogo = (logo) => {
        addElement({
            type: 'image',
            src: logo.url,
            x: 100,
            y: 100,
            width: 100,
            height: 100
        });
    };

    return (
        <div className="tool-panel">
            <div style={{
                border: '1px dashed var(--text-secondary)',
                borderRadius: '8px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                cursor: 'pointer'
            }}>
                <Upload size={24} />
                <span style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Upload SVG/PNG</span>
            </div>

            <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Library
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {MOCK_LOGOS.map(logo => (
                    <div
                        key={logo.id}
                        onClick={() => handleAddLogo(logo)}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            border: '1px solid transparent',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    >
                        <img src={logo.url} alt={logo.name} style={{ width: '100%', borderRadius: '4px' }} />
                        <div style={{ fontSize: '0.8rem', marginTop: '5px', textAlign: 'center' }}>{logo.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
