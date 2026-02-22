import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="bg-surface p-8 rounded-lg shadow-sm border border-border text-center text-text-muted">
            This page is under construction.
        </div>
    </div>
);

export const StudyNotes = () => <PlaceholderPage title="Study Notes" />;
export const Flashcards = () => <PlaceholderPage title="Flashcards" />;
export const PracticeTests = () => <PlaceholderPage title="Practice Tests" />;
export const MindMaps = () => <PlaceholderPage title="Mind Maps" />;
export const Analytics = () => <PlaceholderPage title="Analytics" />;
export const Discussion = () => <PlaceholderPage title="Discussion" />;
export const Settings = () => <PlaceholderPage title="Settings" />;
