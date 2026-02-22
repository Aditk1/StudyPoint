import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw, Check, X, ArrowRight, BrainCircuit, Layers } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';

const Flashcards = () => {
    const [activeDeck, setActiveDeck] = useState(null);

    const decks = [
        { id: 1, title: 'AI Fundamentals', count: 24, progress: 65, color: 'bg-indigo-500' },
        { id: 2, title: 'React Interview Prep', count: 50, progress: 30, color: 'bg-blue-500' },
        { id: 3, title: 'History of Art', count: 12, progress: 0, color: 'bg-amber-500' },
    ];

    return (
        <div className="h-full flex flex-col">
            {!activeDeck ? (
                <DeckList decks={decks} onSelect={setActiveDeck} />
            ) : (
                <FlashcardRunner deck={activeDeck} onExit={() => setActiveDeck(null)} />
            )}
        </div>
    );
};

const DeckList = ({ decks, onSelect }) => (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold">Flashcard Decks</h1>
            <p className="text-text-muted">Choose a deck to start reviewing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map(deck => (
                <Card key={deck.id} hover onClick={() => onSelect(deck)} className="group relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full ${deck.color}`} />
                    <div className="flex justify-between items-start mb-4 pl-4">
                        <div className="p-2 bg-gray-50 rounded-lg text-text-main">
                            <Layers size={24} />
                        </div>
                        <Badge variant="neutral">{deck.count} cards</Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2 pl-4">{deck.title}</h3>
                    <div className="pl-4 mt-4">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-muted">Mastery</span>
                            <span className="font-medium">{deck.progress}%</span>
                        </div>
                        <ProgressBar value={deck.progress} height="h-1.5" />
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const FlashcardRunner = ({ deck, onExit }) => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Mock Cards
    const cards = [
        { q: "What is Backpropagation?", a: "An algorithm used to calculate the gradient of the loss function with respect to the weights." },
        { q: "Define a Perceptron.", a: "A single layer neural network used for binary classification." },
        { q: "What is Overfitting?", a: "When a model learns the training data too well, including noise, and fails to generalize." },
    ];

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCard((prev) => (prev + 1) % cards.length);
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={onExit} className="flex items-center gap-1 text-text-muted hover:text-text-main">
                    <ChevronLeft size={20} /> Back to Decks
                </button>
                <div className="text-center">
                    <h2 className="font-bold">{deck.title}</h2>
                    <p className="text-xs text-text-muted">Card {currentCard + 1} of {cards.length}</p>
                </div>
                <div className="w-20" /> {/* Spacer */}
            </div>

            {/* Progress */}
            <ProgressBar value={((currentCard) / cards.length) * 100} className="mb-8" />

            {/* Card Area */}
            <div className="flex-1 flex flex-col justify-center perspective-[1000px]">
                <div
                    className="relative w-full aspect-[3/2] cursor-pointer group"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <motion.div
                        className="w-full h-full relative preserve-3d transition-all duration-500"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-surface border-2 border-border rounded-2xl shadow-md flex items-center justify-center p-4 sm:p-8 lg:p-12 text-center hover:border-primary/50 transition-colors">
                            <div className="flex flex-col items-center gap-4 sm:gap-6">
                                <span className="text-xs font-bold tracking-widest text-text-muted uppercase">Question</span>
                                <h3 className="text-lg sm:text-2xl md:text-3xl font-medium px-2">{cards[currentCard].q}</h3>
                                <p className="text-xs text-text-muted mt-2 sm:mt-4">(Click to flip)</p>
                            </div>
                        </div>

                        {/* Back */}
                        <div
                            className="absolute inset-0 backface-hidden bg-white border-2 border-primary rounded-2xl shadow-lg flex items-center justify-center p-4 sm:p-8 lg:p-12 text-center"
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            <div className="flex flex-col items-center gap-4 sm:gap-6">
                                <span className="text-xs font-bold tracking-widest text-primary uppercase">Answer</span>
                                <p className="text-base sm:text-lg lg:text-xl leading-relaxed px-2">{cards[currentCard].a}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                {!isFlipped ? (
                    <Button className="w-full sm:max-w-md" size="lg" onClick={() => setIsFlipped(true)}>
                        Show Answer
                    </Button>
                ) : (
                    <>
                        <Button variant="danger" size="lg" className="flex-1 sm:flex-1" icon={RotateCcw} onClick={handleNext}>
                            <span className="hidden sm:inline">Hard</span>
                            <span className="sm:hidden">H</span>
                        </Button>
                        <Button variant="secondary" size="lg" className="flex-1 sm:flex-1" icon={BrainCircuit} onClick={handleNext}>
                            <span className="hidden sm:inline">Medium</span>
                            <span className="sm:hidden">M</span>
                        </Button>
                        <Button variant="primary" size="lg" className="flex-1 sm:flex-1" icon={Check} onClick={handleNext}>
                            <span className="hidden sm:inline">Easy</span>
                            <span className="sm:hidden">E</span>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Flashcards;
