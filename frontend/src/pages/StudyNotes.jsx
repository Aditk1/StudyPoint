import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, MoreVertical, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { getNotes, addNote } from '../lib/supabase';

const StudyNotes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            const { data, error } = await getNotes();
            if (error) {
                console.error("Failed to fetch notes:", error);
            } else {
                // Map the data to match the expected structure
                const mappedNotes = data.map((note, index) => ({
                    id: note.id || index + 1,
                    title: note.title,
                    subject: note.subject || 'General',
                    date: note.created_at ? new Date(note.created_at).toLocaleDateString() : 'Recently',
                    summary: note.content || 'No summary available.',
                    badge: 'primary'
                }));
                setNotes(mappedNotes);
            }
            setLoading(false);
        };
        fetchNotes();
    }, []);

    const handleAddNote = async () => {
        // Example: Add a new note
        const { data, error } = await addNote("New Note", "This is a new note content.");
        if (error) {
            console.error("Failed to add note:", error);
        } else {
            // Refresh notes
            const { data: newData } = await getNotes();
            const mappedNotes = newData.map((note, index) => ({
                id: note.id || index + 1,
                title: note.title,
                subject: note.subject || 'General',
                date: note.created_at ? new Date(note.created_at).toLocaleDateString() : 'Recently',
                summary: note.content || 'No summary available.',
                badge: 'primary'
            }));
            setNotes(mappedNotes);
        }
    };

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Study Notes</h1>
                    <p className="text-text-muted">Manage your learning materials and AI summaries</p>
                </div>
                <Button icon={Plus} onClick={handleAddNote}>Upload New</Button>
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
                {loading ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-text-muted">Loading notes...</p>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-text-muted">No notes found.</p>
                    </div>
                ) : (
                    filteredNotes.map((note) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default StudyNotes;
