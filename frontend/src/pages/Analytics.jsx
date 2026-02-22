import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    RadialBarChart, RadialBar, Legend
} from 'recharts';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const Analytics = () => {
    // Mock Data
    const performanceData = [
        { week: 'Week 1', score: 65 },
        { week: 'Week 2', score: 72 },
        { week: 'Week 3', score: 78 },
        { week: 'Week 4', score: 85 },
        { week: 'Week 5', score: 82 },
        { week: 'Week 6', score: 89 },
    ];

    const skillData = [
        { subject: 'Math', A: 120, fullMark: 150 },
        { subject: 'Coding', A: 98, fullMark: 150 },
        { subject: 'AI', A: 86, fullMark: 150 },
        { subject: 'History', A: 99, fullMark: 150 },
        { subject: 'Physics', A: 85, fullMark: 150 },
    ];

    const focusData = [
        { name: 'Deep Work', uv: 31.47, pv: 2400, fill: '#8884d8' },
        { name: 'Reading', uv: 26.69, pv: 4567, fill: '#83a6ed' },
        { name: 'Practice', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold">Learning Analytics</h1>
                    <p className="text-text-muted">Track your progress and identify areas for improvement</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                    </select>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Clock size={24} /></div>
                    <div><p className="text-text-muted text-xs uppercase font-bold">Study Time</p><h3 className="text-2xl font-bold">42.5h</h3></div>
                </Card>
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-full"><Target size={24} /></div>
                    <div><p className="text-text-muted text-xs uppercase font-bold">Avg Score</p><h3 className="text-2xl font-bold">85%</h3></div>
                </Card>
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-full"><Zap size={24} /></div>
                    <div><p className="text-text-muted text-xs uppercase font-bold">Tests</p><h3 className="text-2xl font-bold">24</h3></div>
                </Card>
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-full"><TrendingUp size={24} /></div>
                    <div><p className="text-text-muted text-xs uppercase font-bold">Streak</p><h3 className="text-2xl font-bold">12 days</h3></div>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <h3 className="font-bold text-lg mb-6">Performance Trend</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} count={5} tick={{ fill: '#64748b' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-6">Skills Radar</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                                <Radar name="My Skills" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
