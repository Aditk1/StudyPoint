import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, Search, Plus, Filter } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Discussion = () => {
    const threads = [
        { id: 1, title: 'Best practices for React Context API?', author: 'Sarah Lin', time: '2h ago', replies: 12, likes: 45, views: 120, tags: ['React', 'Frontend'] },
        { id: 2, title: 'Help understanding Gradient Descent', author: 'Mike Chen', time: '4h ago', replies: 8, likes: 23, views: 89, tags: ['AI', 'Math'] },
        { id: 3, title: 'Study group for Finals?', author: 'Alex J.', time: '1d ago', replies: 24, likes: 15, views: 200, tags: ['General'] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Discussion Forum</h1>
                    <p className="text-text-muted">Join the conversation with fellow learners</p>
                </div>
                <Button icon={Plus}>New Discussion</Button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                    <input
                        type="text"
                        placeholder="Search topics..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <Button variant="secondary" icon={Filter}>Filter</Button>
            </div>

            <div className="space-y-4">
                {threads.map(thread => (
                    <Card key={thread.id} hover className="cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg hover:text-primary transition-colors">{thread.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <span className="font-medium text-text-main">{thread.author}</span>
                                    <span>•</span>
                                    <span>{thread.time}</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {thread.tags.map(tag => (
                                        <Badge key={tag} variant="neutral" className="bg-gray-100 text-gray-600">{tag}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-text-muted text-sm">
                                <div className="flex items-center gap-1.5 hover:text-primary">
                                    <ThumbsUp size={16} /> <span>{thread.likes}</span>
                                </div>
                                <div className="flex items-center gap-1.5 hover:text-primary">
                                    <MessageSquare size={16} /> <span>{thread.replies}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Eye size={16} /> <span>{thread.views}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Discussion;
