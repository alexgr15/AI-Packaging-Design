import { create } from 'zustand';

export const useDesignStore = create((set) => ({
    // UI State
    activeTool: 'box',
    setActiveTool: (tool) => set({ activeTool: tool }),

    // Model Library State
    isLibraryOpen: false,
    setLibraryOpen: (isOpen) => set({ isLibraryOpen: isOpen }),
    selectedModel: null,
    setSelectedModel: (model) => set({ selectedModel: model }),
    modelParams: { width: 200, height: 150, depth: 100, thickness: 2 },
    setModelParams: (params) => set((state) => ({ modelParams: { ...state.modelParams, ...params } })),

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
