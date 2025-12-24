import { useRef, useEffect } from 'react';
import { useDesignStore } from '../../store/designStore';

export const ProductionCanvas = () => {
    const containerRef = useRef();
    const { canvasColor, elements, setCanvasRef } = useDesignStore();

    // Expose the container as a canvas source for Three.js (requires html2canvas or similar strictly, 
    // but for MVP we might just color the box directly or use a real <canvas>).
    // For this prototype, we will use a real <canvas> to draw everything so it can be a texture.

    const canvasRef = useRef(null);

    useEffect(() => {
        setCanvasRef(canvasRef.current);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Draw Background
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Elements
        elements.forEach(el => {
            if (el.type === 'text') {
                ctx.fillStyle = el.color || '#000';
                ctx.font = `${el.fontSize || 20}px Arial`;
                ctx.fillText(el.text, el.x, el.y);
            }
            // Add more types (image, svg) logic here
        });

        // Trigger update in 3D (handled by store logic usually)
        useDesignStore.setState({ textureNeedsUpdate: true });

    }, [canvasColor, elements]);

    return (
        <div className="production-canvas-container" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#eee'
        }}>
            <canvas
                ref={canvasRef}
                width={1024}
                height={1024}
                style={{
                    width: '512px',
                    height: '512px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    background: 'white'
                }}
            />
        </div>
    );
};
