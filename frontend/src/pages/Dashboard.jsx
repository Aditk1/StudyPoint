import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Clock, CheckCircle, Zap, BookOpen, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    // Mock Data
    const activityData = [
        { name: 'Mon', hours: 2.5 },
        { name: 'Tue', hours: 3.2 },
        { name: 'Wed', hours: 1.8 },
        { name: 'Thu', hours: 4.1 },
        { name: 'Fri', hours: 2.9 },
        { name: 'Sat', hours: 3.5 },
        { name: 'Sun', hours: 2.2 },
    ];

    const subjectData = [
        { name: 'AI Fundamentals', value: 35, color: '#4f46e5' }, // Indigo
        { name: 'Computer Science', value: 30, color: '#8b5cf6' }, // Violet
        { name: 'Machine Learning', value: 20, color: '#10b981' }, // Emerald
        { name: 'Python', value: 15, color: '#f59e0b' },          // Amber
    ];

    const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-border flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-light rounded-lg text-primary">
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-1">{value}</h3>
                <p className="text-sm text-text-muted">{title}</p>
                {subtext && <p className="text-xs text-text-muted mt-2">{subtext}</p>}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Welcome back, {(() => {
                    const userEmail = localStorage.getItem('userEmail') || '';
                    const profile = localStorage.getItem(`profile_${userEmail}`);
                    
                    if (profile) {
                        try {
                            const { firstName } = JSON.parse(profile);
                            if (firstName) {
                                return firstName;
                            }
                        } catch (e) {
                            // Fallback
                        }
                    }
                    return userEmail.split('@')[0] || 'Learner';
                })()} 👋</h1>
                <p className="text-text-muted">Here's your learning progress for today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Study Time"
                    value="42.5h"
                    subtext="Total hours focused"
                    icon={Clock}
                    trend="+12%"
                />
                <StatCard
                    title="Average Score"
                    value="85%"
                    subtext="Across all quizzes"
                    icon={Zap}
                    trend="+2%"
                />
                <StatCard
                    title="Tests Completed"
                    value="24"
                    subtext="Completed modules"
                    icon={CheckCircle}
                />
                <StatCard
                    title="Current Streak"
                    value="12 days"
                    subtext="Keep it up!"
                    icon={Zap}
                />
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activity Chart */}
                <div className="lg:col-span-2 bg-surface p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-lg font-bold mb-6">Weekly Study Activity</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subject Distribution */}
                <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-lg font-bold mb-6">Subject Distribution</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subjectData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {subjectData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => <span className="text-sm text-text-muted ml-1">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Recent Activity</h2>
                    <button className="text-sm text-primary font-medium hover:text-primary-hover">View All</button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-4 bg-background rounded-lg hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white border border-border rounded-lg text-primary">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Neural Networks Fundamentals</h4>
                                    <p className="text-xs text-text-muted">Completed practice test • 2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-success">92%</span>
                                <ChevronRight size={16} className="text-text-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
