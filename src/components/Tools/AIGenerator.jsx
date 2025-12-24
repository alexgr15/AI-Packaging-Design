import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { useDesignStore } from '../../store/designStore';

export const AIGenerator = () => {
    const { setCanvasColor } = useDesignStore(); // For simple demo, changing color or adding background
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);

        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedImages([
                `https://via.placeholder.com/500/8b5cf6/ffffff?text=${encodeURIComponent(prompt)}`,
                `https://via.placeholder.com/500/ec4899/ffffff?text=${encodeURIComponent(prompt)}`
            ]);
        }, 2000);
    };

    return (
        <div className="tool-panel">
            <div style={{ marginBottom: '1.5rem', background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-primary)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                    <Wand2 size={16} /> AI Texture Studio
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Describe a pattern or texture and let AI generate it for your packaging.
                </p>
            </div>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Floral pattern with pastel aesthetics in cyberpunk style..."
                style={{
                    width: '100%',
                    height: '100px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.8rem',
                    color: 'white',
                    resize: 'none',
                    marginBottom: '1rem'
                }}
            />

            <button
                className="btn-primary"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                onClick={handleGenerate}
                disabled={isGenerating}
            >
                {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                {isGenerating ? 'Dreaming...' : 'Generate Texture'}
            </button>

            {generatedImages.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                    <h5 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Results</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {generatedImages.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="Generated"
                                style={{ width: '100%', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                                onClick={() => setCanvasColor('#8b5cf6')} // Mock action
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
