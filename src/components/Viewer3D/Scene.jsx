import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Environment } from '@react-three/drei';
import { useDesignStore } from '../../store/designStore';
import * as THREE from 'three';

const BoxModel = (props) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const { canvasRef, textureNeedsUpdate, markTextureUpdated } = useDesignStore();

    // Rotate mesh every frame slightly
    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.1;

        // Check for texture updates
        if (textureNeedsUpdate && canvasRef && materialRef.current) {
            if (!materialRef.current.map) {
                // First time assignment
                const texture = new THREE.CanvasTexture(canvasRef);
                texture.colorSpace = THREE.SRGBColorSpace;
                materialRef.current.map = texture;
            } else {
                // Update existing texture
                materialRef.current.map.image = canvasRef;
                materialRef.current.map.needsUpdate = true;
            }
            markTextureUpdated();
        }
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={1}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial ref={materialRef} color="#ffffff" />
        </mesh>
    );
};

export const Scene = () => {
    return (
        <div style={{ width: '100%', height: '100%', background: 'var(--bg-surface)' }}>
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                <Stage environment="city" intensity={0.5}>
                    <BoxModel position={[0, 0, 0]} />
                </Stage>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    );
};
