import { AppShell } from '../Layout/AppShell';
import { Scene } from '../Viewer3D/Scene';
import { ProductionCanvas } from '../Editor2D/ProductionCanvas';
import { NestingView } from '../Production/NestingView';
import { useDesignStore } from '../../store/designStore';

export const EditorLayout = () => {
    const { activeTool } = useDesignStore();

    if (activeTool === 'nesting') {
        return (
            <AppShell>
                <NestingView />
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: '#000'
            }}>
                {/* 2D Editor Area */}
                <div style={{ position: 'relative', borderRight: 'var(--glass-border)' }}>
                    <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 10, pointerEvents: 'none' }}>2D Editor</div>
                    <ProductionCanvas />
                </div>

                {/* 3D Preview Area */}
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 10, pointerEvents: 'none' }}>3D Preview</div>
                    <Scene />
                </div>
            </div>
        </AppShell>
    );
};
