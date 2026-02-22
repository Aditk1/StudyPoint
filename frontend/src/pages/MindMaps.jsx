import React, { useState } from 'react';
import { Plus, Download, Maximize, Search, MoreHorizontal } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const MindMaps = () => {
    // Mock Graph Data for Layout
    const nodes = [
        { id: 'root', label: 'Neural Networks', x: 400, y: 300, type: 'root', color: '#3b82f6' },
        { id: '1', label: 'Architecture', x: 250, y: 150, type: 'category', color: '#8b5cf6' },
        { id: '2', label: 'Training', x: 550, y: 450, type: 'category', color: '#10b981' },
        { id: '1-1', label: 'Input Layer', x: 200, y: 100, type: 'sub', color: '#a78bfa' },
        { id: '1-2', label: 'Hidden Layers', x: 300, y: 100, type: 'sub', color: '#a78bfa' },
        { id: '1-3', label: 'Functions', x: 100, y: 200, type: 'sub', color: '#a78bfa' },
        { id: '2-1', label: 'Backprop', x: 450, y: 550, type: 'sub', color: '#34d399' },
        { id: '2-2', label: 'Gradient Descent', x: 650, y: 550, type: 'sub', color: '#34d399' },
    ];

    const edges = [
        { from: 'root', to: '1' },
        { from: 'root', to: '2' },
        { from: '1', to: '1-1' },
        { from: '1', to: '1-2' },
        { from: '1', to: '1-3' },
        { from: '2', to: '2-1' },
        { from: '2', to: '2-2' },
    ];

    // Simple SVG renderer for mind map connections
    return (
        <div className="h-full flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Sidebar List */}
            <div className="w-full lg:w-1/4 lg:min-w-[250px] flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">Mind Maps</h2>
                    <Button size="sm" icon={Plus}>New</Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search maps..."
                        className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-border bg-surface"
                    />
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {[1, 2, 3].map(i => (
                        <Card key={i} hover className="p-4 cursor-pointer border-l-4 border-l-primary hover:border-l-primary-hover transition-all">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`font-semibold text-sm ${i === 1 ? 'text-text-main' : 'text-text-muted'}`}>Neural Networks Architecture</h4>
                                {i === 1 && <Badge variant="info">AI</Badge>}
                            </div>
                            <p className="text-xs text-text-muted mb-2">24 nodes • Nov 10</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 min-h-[400px] lg:min-h-0 bg-white rounded-xl border border-border relative overflow-hidden shadow-sm">
                {/* Canvas Toolbar */}
                <div className="absolute top-2 left-2 right-2 lg:top-4 lg:left-4 lg:right-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 z-10 pointer-events-none">
                    <div className="pointer-events-auto">
                        <h2 className="font-bold text-base lg:text-xl">Neural Networks Architecture</h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                            <span>AI Fundamentals</span>
                            <Badge variant="neutral" className="py-0">AI Generated</Badge>
                        </div>
                    </div>
                    <div className="flex gap-2 pointer-events-auto">
                        <Button variant="secondary" size="icon" icon={Search} />
                        <Button variant="secondary" size="icon" icon={Maximize} className="hidden sm:inline-flex" />
                        <Button variant="secondary" size="sm" icon={Download} className="text-xs">Export</Button>
                    </div>
                </div>

                {/* SVG Graph */}
                <svg className="w-full h-full min-h-[400px] bg-slate-50">
                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="28" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#cbd5e1" />
                        </marker>
                    </defs>
                    {edges.map((edge, idx) => {
                        const from = nodes.find(n => n.id === edge.from);
                        const to = nodes.find(n => n.id === edge.to);
                        return (
                            <line
                                key={idx}
                                x1={from.x} y1={from.y}
                                x2={to.x} y2={to.y}
                                stroke="#cbd5e1"
                                strokeWidth="2"
                            />
                        );
                    })}
                </svg>

                {/* Nodes Overlay */}
                {nodes.map(node => (
                    <div
                        key={node.id}
                        className={`absolute px-4 py-2 rounded-lg shadow-sm font-medium text-sm text-white transform -translate-x-1/2 -translate-y-1/2 cursor-move hover:scale-105 transition-transform`}
                        style={{
                            left: node.x,
                            top: node.y,
                            backgroundColor: node.color
                        }}
                    >
                        {node.label}
                    </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4 bg-white/90 backdrop-blur p-2 lg:p-3 rounded-lg border border-border text-xs z-10">
                    <h4 className="font-bold mb-2">Legend</h4>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500" /> Main Concept</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-violet-500" /> Category</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-400" /> Sub-topic</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MindMaps;
