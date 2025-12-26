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

    markTextureUpdated: () => set({ textureNeedsUpdate: false }),

    // Project Persistence
    currentProjectId: null,
    setCurrentProjectId: (id) => set({ currentProjectId: id }),

    saveProject: async (name) => {
        const state = useDesignStore.getState();
        const projectData = {
            modelParams: state.modelParams,
            canvasColor: state.canvasColor,
            elements: state.elements,
            selectedModel: state.selectedModel
        };

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated');

        const API_URL = import.meta.env.VITE_API_URL || 'https://apitest.gidpe.com.ar';

        const res = await fetch(`${API_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: state.currentProjectId,
                name: name || 'Untitled Project',
                data: projectData
            })
        });

        if (!res.ok) throw new Error('Failed to save');

        const savedProject = await res.json();
        set({ currentProjectId: savedProject.id });
        return savedProject;
    },

    loadProjects: async () => {
        const token = localStorage.getItem('token');
        if (!token) return [];
        const API_URL = import.meta.env.VITE_API_URL || 'https://apitest.gidpe.com.ar';

        const res = await fetch(`${API_URL}/api/projects`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to load projects');
        return await res.json();
    },

    loadProject: async (id) => {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL || 'https://apitest.gidpe.com.ar';

        const res = await fetch(`${API_URL}/api/projects/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to load project');
        const project = await res.json();

        // Restore state
        const data = project.data;
        if (data) {
            set({
                currentProjectId: project.id,
                modelParams: data.modelParams || { width: 200, height: 150, depth: 100, thickness: 2 },
                canvasColor: data.canvasColor || '#ffffff',
                elements: data.elements || [],
                selectedModel: data.selectedModel || null,
                textureNeedsUpdate: true
            });
        }
        return project;
    }
}));
