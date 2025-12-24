import React from 'react';
import { useDesignStore } from '../../store/designStore';
import { Search, Sparkles, Box, ArrowRight } from 'lucide-react';
import { ModelDetail } from './ModelDetail';

const MOCK_CATEGORIES = [
    { id: 'all', name: 'All Models' },
    { id: 'folding', name: 'Folding Cartons' },
    { id: 'rigid', name: 'Rigid Boxes' },
    { id: 'mailer', name: 'Mailers' },
    { id: 'bags', name: 'Bags & Pouches' },
];

const MOCK_MODELS = [
    { id: 1, name: 'Tuck End Box', category: 'folding', image: 'https://via.placeholder.com/300x200?text=Tuck+End+Box' },
    { id: 2, name: 'Mailer Box', category: 'mailer', image: 'https://via.placeholder.com/300x200?text=Mailer+Box' },
    { id: 3, name: 'Pillow Box', category: 'folding', image: 'https://via.placeholder.com/300x200?text=Pillow+Box' },
    { id: 4, name: 'Rigid Setup Box', category: 'rigid', image: 'https://via.placeholder.com/300x200?text=Rigid+Box' },
    { id: 5, name: 'Hexagon Box', category: 'folding', image: 'https://via.placeholder.com/300x200?text=Hexagon+Box' },
    { id: 6, name: 'Handle Box', category: 'folding', image: 'https://via.placeholder.com/300x200?text=Handle+Box' },
];

export const ModelLibrary = () => {
    const { isLibraryOpen, setLibraryOpen, selectedModel, setSelectedModel } = useDesignStore();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');

    if (!isLibraryOpen) return null;

    if (selectedModel) {
        return <ModelDetail />;
    }

    const filteredModels = MOCK_MODELS.filter(m =>
        (selectedCategory === 'all' || m.category === selectedCategory) &&
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1a1a1a] w-[90vw] h-[90vh] rounded-xl border border-[var(--glass-border)] flex flex-col overflow-hidden shadow-2xl">

                {/* Header */}
                <header className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Model Library
                        </h2>
                        <p className="text-gray-400 text-sm">Select a base model or generate a new one with AI</p>
                    </div>
                    <button
                        onClick={() => setLibraryOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400"
                    >
                        Close
                    </button>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Filters */}
                    <aside className="w-64 bg-[#151515] border-r border-white/10 p-4 flex flex-col gap-2">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search models..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#222] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            {MOCK_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.id
                                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                            : 'text-gray-400 hover:bg-white/5'
                                        }`}
                                >
                                    <Box className="w-4 h-4" />
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/10">
                            <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                AI Innovation Lab
                                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Generating custom structures with AI
                            </p>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <main className="flex-1 p-8 overflow-y-auto bg-[#1a1a1a]">
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                            {filteredModels.map(model => (
                                <div
                                    key={model.id}
                                    onClick={() => setSelectedModel(model)}
                                    className="group cursor-pointer bg-[#222] rounded-xl border border-white/5 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                                >
                                    <div className="aspect-[4/3] bg-[#111] relative overflow-hidden">
                                        {/* Mock 3D Preview (Placeholder Image) */}
                                        <img
                                            src={model.image}
                                            alt={model.name}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent opacity-60" />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                            <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                View Model
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                                            {model.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 capitalize">{model.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
