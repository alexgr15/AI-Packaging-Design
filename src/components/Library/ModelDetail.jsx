import React from 'react';
import { useDesignStore } from '../../store/designStore';
import { ChevronLeft, Download, Check, Settings2, Box as BoxIcon, FileText } from 'lucide-react';

export const ModelDetail = () => {
    const { selectedModel, setSelectedModel, modelParams, setModelParams, setLibraryOpen } = useDesignStore();
    const [viewMode, setViewMode] = React.useState('split'); // '2d', '3d', 'split'

    // Mock Dieline SVG Generator based on params
    const renderDieline = () => {
        const { width, height, depth } = modelParams;
        const scale = 0.5;
        // Simple visualization: Main panel + Flaps
        return (
            <svg width="100%" height="100%" viewBox={`0 0 ${(width * 3)} ${(depth * 3)}`} className="stroke-blue-500 fill-none stroke-[2]">
                {/* This is a visual representation of a dieline */}
                <rect x={width} y={depth} width={width} height={depth} strokeDasharray="5,5" className="stroke-gray-600" />
                <rect x={0} y={depth} width={width} height={depth} />
                <rect x={width * 2} y={depth} width={width} height={depth} />
                <rect x={width} y={0} width={width} height={depth} />
                <rect x={width} y={depth * 2} width={width} height={depth} />
                {/* Flaps */}
                <path d={`M${width},0 L${width + 20},-20 L${width * 2 - 20},-20 L${width * 2},0`} />
            </svg>
        );
    };

    const handleApply = () => {
        // Here we would apply the model to the main editor
        setLibraryOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1a1a1a] w-[95vw] h-[95vh] rounded-xl border border-[var(--glass-border)] flex flex-col overflow-hidden shadow-2xl">

                {/* Header */}
                <header className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSelectedModel(null)}
                            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-white">{selectedModel?.name}</h2>
                            <p className="text-xs text-gray-400">Parametric Dieline Generator</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-lg flex items-center gap-2 border border-white/10 transition-colors">
                            <Download className="w-4 h-4" />
                            Export Dieline
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                        >
                            <Check className="w-4 h-4" />
                            Apply to Editor
                        </button>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Panel: Parameters */}
                    <aside className="w-80 bg-[#151515] border-r border-white/10 p-6 overflow-y-auto">
                        <div className="flex items-center gap-2 text-blue-400 mb-6">
                            <Settings2 className="w-5 h-5" />
                            <h3 className="font-semibold">Dimensions</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Length (mm)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range" min="50" max="500"
                                        value={modelParams.width}
                                        onChange={(e) => setModelParams({ width: parseInt(e.target.value) })}
                                        className="flex-1 accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <input
                                        type="number"
                                        value={modelParams.width}
                                        onChange={(e) => setModelParams({ width: parseInt(e.target.value) })}
                                        className="w-16 bg-[#222] border border-white/10 rounded px-2 py-1 text-right text-sm text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Width (mm)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range" min="50" max="500"
                                        value={modelParams.depth}
                                        onChange={(e) => setModelParams({ depth: parseInt(e.target.value) })}
                                        className="flex-1 accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <input
                                        type="number"
                                        value={modelParams.depth}
                                        onChange={(e) => setModelParams({ depth: parseInt(e.target.value) })}
                                        className="w-16 bg-[#222] border border-white/10 rounded px-2 py-1 text-right text-sm text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Height (mm)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range" min="20" max="300"
                                        value={modelParams.height}
                                        onChange={(e) => setModelParams({ height: parseInt(e.target.value) })}
                                        className="flex-1 accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <input
                                        type="number"
                                        value={modelParams.height}
                                        onChange={(e) => setModelParams({ height: parseInt(e.target.value) })}
                                        className="w-16 bg-[#222] border border-white/10 rounded px-2 py-1 text-right text-sm text-white"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <label className="text-sm text-gray-400 block mb-2">Material Thickness</label>
                                <select className="w-full bg-[#222] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
                                    <option>0.5mm (Cardstock)</option>
                                    <option>1.5mm (E-Flute Corrugated)</option>
                                    <option>3.0mm (B-Flute Corrugated)</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Center: Dual View */}
                    <main className="flex-1 flex flex-col bg-[#0a0a0a] relative">
                        {/* View Toggles */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#222] rounded-full p-1 border border-white/10 flex gap-1 z-10">
                            <button
                                onClick={() => setViewMode('2d')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === '2d' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <FileText className="w-3 h-3" /> 2D Dieline
                            </button>
                            <button
                                onClick={() => setViewMode('split')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border-l border-r border-white/5 ${viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Split View
                            </button>
                            <button
                                onClick={() => setViewMode('3d')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === '3d' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <BoxIcon className="w-3 h-3" /> 3D Preview
                            </button>
                        </div>

                        <div className="flex-1 flex">
                            {/* 2D View */}
                            {(viewMode === '2d' || viewMode === 'split') && (
                                <div className={`flex-1 border-r border-white/5 p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-repeat`}>
                                    <div className="w-full h-full border border-dashed border-white/20 rounded-lg flex items-center justify-center p-12">
                                        {renderDieline()}
                                    </div>
                                </div>
                            )}

                            {/* 3D View */}
                            {(viewMode === '3d' || viewMode === 'split') && (
                                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#111] to-[#000]">
                                    {/* Placeholder for actual 3D Canvas */}
                                    <div className="text-center">
                                        <div className="w-64 h-64 bg-blue-500/10 rounded-lg border border-blue-500/30 flex items-center justify-center mb-4 mx-auto animate-float">
                                            <BoxIcon className="w-24 h-24 text-blue-500/50" />
                                        </div>
                                        <p className="text-gray-500 text-sm">Interactive 3D Preview</p>
                                        <p className="text-xs text-gray-700 mt-1">{modelParams.width} x {modelParams.depth} x {modelParams.height}mm</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
