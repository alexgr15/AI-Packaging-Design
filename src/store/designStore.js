import { create } from 'zustand';

export const useDesignStore = create((set) => ({
    // UI State
    activeTool: 'box',
    setActiveTool: (tool) => set({ activeTool: tool }),

    // Canvas State
    canvasColor: '#ffffff',
    elements: [],
    selectedId: null,

    // Texture Sync
    canvasRef: null, // Reference to the 2D canvas DOM element
    textureNeedsUpdate: false,

    // Actions
    setCanvasColor: (color) => set({ canvasColor: color, textureNeedsUpdate: true }),
    setCanvasRef: (ref) => set({ canvasRef: ref }),

    addElement: (element) => set((state) => ({
        elements: [...state.elements, { ...element, id: crypto.randomUUID() }],
        textureNeedsUpdate: true
    })),

    updateElement: (id, changes) => set((state) => ({
        elements: state.elements.map(el => el.id === id ? { ...el, ...changes } : el),
        textureNeedsUpdate: true
    })),

    markTextureUpdated: () => set({ textureNeedsUpdate: false })
}));
