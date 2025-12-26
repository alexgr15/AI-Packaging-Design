import { useEffect, useState } from 'react';
import { useDesignStore } from '../../store/designStore';

export const ProjectListModal = ({ onClose }) => {
    const { loadProjects, loadProject } = useDesignStore();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects()
            .then(setProjects)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleLoad = async (id) => {
        try {
            await loadProject(id);
            onClose();
        } catch (err) {
            alert('Failed to load project');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-[#1a1a1a] rounded-xl border border-white/10 p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Your Projects</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No saved projects yet.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                        {projects.map(p => (
                            <div key={p.id} className="p-4 bg-[#252525] rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors cursor-pointer group" onClick={() => handleLoad(p.id)}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-white group-hover:text-blue-400">{p.name}</h3>
                                    <span className="text-xs text-gray-500">{new Date(p.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-gray-500">ID: {p.id}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
