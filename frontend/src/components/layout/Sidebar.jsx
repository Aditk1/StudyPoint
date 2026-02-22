import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    BrainCircuit,
    Network,
    BarChart2,
    MessageSquare,
    Settings,
    LogOut,
    X
} from 'lucide-react';

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('accountType');
        localStorage.removeItem('userRole');
        navigate('/login');
    };
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: BookOpen, label: 'Study Notes', path: '/notes' },
        { icon: FileText, label: 'Flashcards', path: '/flashcards' },
        { icon: BrainCircuit, label: 'Practice Tests', path: '/practice-tests' },
        { icon: Network, label: 'Mind Maps', path: '/mindmaps' },
        { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    ];

    const bottomItems = [
        { icon: MessageSquare, label: 'Discussion', path: '/discussion' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="flex flex-col h-full py-6 px-4">
            {/* Logo Area */}
            <div className="mb-8 px-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                        S
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">StudyPoint</h1>
                        <p className="text-xs text-text-muted">AI Learning</p>
                    </div>
                </div>
                {/* Close button for mobile */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={20} className="text-text-muted" />
                    </button>
                )}
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 space-y-1">
                <p className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 mt-4">Learning Space</p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
              ${isActive
                                ? 'bg-primary-light text-primary'
                                : 'text-text-muted hover:bg-background hover:text-text-main'}
            `}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}

                <p className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 mt-8">Community</p>
                {bottomItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
              ${isActive
                                ? 'bg-primary-light text-primary'
                                : 'text-text-muted hover:bg-background hover:text-text-main'}
            `}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User Profile Hook */}
            <div className="mt-auto border-t border-border pt-4">
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-background cursor-pointer mb-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs">
                        {(() => {
                            const userEmail = localStorage.getItem('userEmail') || '';
                            const profile = localStorage.getItem(`profile_${userEmail}`);
                            let initials = userEmail?.charAt(0).toUpperCase() || 'U';
                            
                            if (profile) {
                                try {
                                    const { firstName, lastName } = JSON.parse(profile);
                                    if (firstName && lastName) {
                                        initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
                                    }
                                } catch (e) {
                                    // Fallback to email initial
                                }
                            }
                            return initials;
                        })()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-main truncate">
                            {(() => {
                                const userEmail = localStorage.getItem('userEmail') || '';
                                const profile = localStorage.getItem(`profile_${userEmail}`);
                                
                                if (profile) {
                                    try {
                                        const { firstName, lastName } = JSON.parse(profile);
                                        if (firstName || lastName) {
                                            return `${firstName} ${lastName}`.trim();
                                        }
                                    } catch (e) {
                                        // Fallback to email
                                    }
                                }
                                return userEmail || 'User';
                            })()}
                        </p>
                        <p className="text-xs text-text-muted truncate">
                            {localStorage.getItem('accountType') === 'institute' 
                                ? `${localStorage.getItem('userRole') || 'Student'} - Institute`
                                : 'Individual Plan'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:bg-background hover:text-text-main transition-colors"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
