import React, { useState } from 'react';
import { Plus, Search, FileText, MoreVertical, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const StudyNotes = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const notes = [
        { id: 1, title: 'Neural Networks Fundamentals', subject: 'AI', date: '2 hours ago', summary: 'Key concepts of perceptrons and activation functions.', badge: 'primary' },
        { id: 2, title: 'React Hooks Deep Dive', subject: 'Frontend', date: 'Yesterday', summary: 'Understanding useEffect and useMemo optimization.', badge: 'info' },
        { id: 3, title: 'Data Structures: Trees', subject: 'CS 101', date: '3 days ago', summary: 'Binary search trees and traversal algorithms.', badge: 'warning' },
        { id: 4, title: 'Calculus II: Integration', subject: 'Math', date: '1 week ago', summary: 'Integration by parts and substitution methods.', badge: 'error' },
    ];

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Study Notes</h1>
                    <p className="text-text-muted">Manage your learning materials and AI summaries</p>
                </div>
                <Button icon={Plus}>Upload New</Button>
            </div>

            {/* Search & Filter */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                    <Card key={note.id} hover className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-gray-50 rounded-lg text-primary">
                                <FileText size={24} />
                            </div>
                            <button className="text-text-muted hover:text-text-main">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <h3 className="font-bold text-lg mb-1">{note.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant={note.badge}>{note.subject}</Badge>
                            <span className="text-xs text-text-muted">• {note.date}</span>
                        </div>

                        <p className="text-sm text-text-muted mb-6 flex-1 line-clamp-3">
                            {note.summary}
                        </p>

                        <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                            <Button variant="secondary" size="sm" className="flex-1">View</Button>
                            <Button variant="ghost" size="sm" icon={Sparkles} className="text-primary hover:bg-primary-light">AI Summary</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StudyNotes;
