import React, { useState } from 'react';
import { Play, Clock, BarChart2, CheckCircle, BrainCircuit } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';

const PracticeTests = () => {
    const [activeTest, setActiveTest] = useState(null);

    const tests = [
        { id: 1, title: 'Neural Networks Fundamentals', subject: 'AI Fundamentals', questions: 20, time: 30, difficulty: 'Medium', lastScore: 85, color: 'text-indigo-600' },
        { id: 2, title: 'Python Programming Basics', subject: 'Computer Science', questions: 15, time: 20, difficulty: 'Easy', lastScore: null, color: 'text-blue-600' },
        { id: 3, title: 'Machine Learning Algorithms', subject: 'ML 101', questions: 25, time: 45, difficulty: 'Hard', lastScore: null, color: 'text-emerald-600' },
    ];

    return (
        <div className="h-full flex flex-col">
            {!activeTest ? (
                <TestList tests={tests} onStart={setActiveTest} />
            ) : (
                <TestRunner test={activeTest} onExit={() => setActiveTest(null)} />
            )}
        </div>
    );
};

const TestList = ({ tests, onStart }) => (
    <div className="space-y-8">
        <div>
            <h1 className="text-2xl font-bold">Practice Tests</h1>
            <p className="text-text-muted">AI-generated tests based on your study material</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
                <Card key={test.id} hover className="flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg leading-tight">{test.title}</h3>
                            <BrainCircuit className={test.color} size={24} />
                        </div>
                        <p className="text-sm text-text-muted mb-6">{test.subject}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <Badge variant="neutral" className="flex items-center gap-1"><CheckCircle size={12} /> {test.questions} questions</Badge>
                            <Badge variant="neutral" className="flex items-center gap-1"><Clock size={12} /> {test.time} min</Badge>
                            <Badge
                                variant={test.difficulty === 'Hard' ? 'error' : test.difficulty === 'Medium' ? 'warning' : 'success'}
                            >
                                {test.difficulty}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {test.lastScore && (
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-muted">Last Score</span>
                                <span className="font-bold text-success">↗ {test.lastScore}%</span>
                            </div>
                        )}
                        {test.lastScore && <ProgressBar value={test.lastScore} height="h-1.5" />}

                        <Button
                            className="w-full"
                            variant={test.lastScore ? 'outline' : 'primary'}
                            icon={Play}
                            onClick={() => onStart(test)}
                        >
                            {test.lastScore ? 'Retake Test' : 'Start Test'}
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const TestRunner = ({ test, onExit }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});

    // Mock Questions
    const questions = [
        { id: 1, text: "What is the primary purpose of backpropagation in neural networks?", options: ["To initialize weights randomly", "To calculate gradients for weight updates", "To activate neurons in the network", "To preprocess input data"] },
        { id: 2, text: "Which activation function is commonly used for output layers in binary classification?", options: ["ReLU", "Softmax", "Sigmoid", "Tanh"] },
        { id: 3, text: "What does CNN stand for?", options: ["Central Neural Network", "Convolutional Neural Network", "Computer Nodal Net", "Continuous Network Node"] },
    ];

    const handleOptionSelect = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const isLast = currentQ === questions.length - 1;

    return (
        <div className="max-w-4xl mx-auto w-full flex flex-col h-full pb-8">
            {/* Test Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-8 border-b border-border pb-4">
                <div>
                    <h2 className="font-bold text-base sm:text-lg">{test.title}</h2>
                    <p className="text-xs text-text-muted">{test.subject} • AI Generated</p>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-sm font-medium text-text-muted">{currentQ + 1}/{questions.length} Questions</span>
                    <div className="flex items-center gap-2 text-text-main font-mono bg-gray-100 px-3 py-1 rounded-md">
                        <Clock size={16} />
                        <span>25:30</span>
                    </div>
                </div>
            </div>

            <ProgressBar value={((currentQ + 1) / questions.length) * 100} className="mb-8" />

            {/* Question Card */}
            <Card className="flex-1 flex flex-col justify-center mb-8">
                <span className="text-sm font-medium text-text-muted mb-4">Question {currentQ + 1}</span>
                <h3 className="text-xl font-medium mb-8 leading-relaxed">
                    {questions[currentQ].text}
                </h3>

                <div className="space-y-3 max-w-2xl">
                    {questions[currentQ].options.map((opt, idx) => (
                        <div
                            key={idx}
                            className={`
                p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-3
                ${answers[questions[currentQ].id] === opt
                                    ? 'border-primary bg-primary-light/10 ring-1 ring-primary'
                                    : 'border-border hover:bg-gray-50 hover:border-gray-300'}
              `}
                            onClick={() => handleOptionSelect(questions[currentQ].id, opt)}
                        >
                            <div className={`
                 w-5 h-5 rounded-full border flex items-center justify-center
                 ${answers[questions[currentQ].id] === opt ? 'border-primary bg-primary' : 'border-gray-300'}
              `}>
                                {answers[questions[currentQ].id] === opt && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="text-sm">{opt}</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Footer Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                <Button
                    variant="ghost"
                    disabled={currentQ === 0}
                    onClick={() => setCurrentQ(p => p - 1)}
                    className="w-full sm:w-auto"
                >
                    Previous
                </Button>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" onClick={onExit} className="w-full sm:w-auto">Save & Exit</Button>
                    <Button
                        variant="primary"
                        onClick={() => isLast ? onExit() : setCurrentQ(p => p + 1)}
                        className="w-full sm:w-auto"
                    >
                        {isLast ? "Submit Test" : "Next Question"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PracticeTests;
