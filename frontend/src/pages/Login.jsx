import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Building2, 
    GraduationCap, 
    UserCircle, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff,
    ArrowRight,
    Sparkles,
    CheckCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [accountType, setAccountType] = useState('individual'); // 'individual' or 'institute'
    const [userRole, setUserRole] = useState('student'); // 'student' or 'faculty' (for institute)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        instituteCode: '' // For institute login
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Redirect if already authenticated
    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            navigate('/');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (accountType === 'institute' && !formData.instituteCode) {
            newErrors.instituteCode = 'Institute code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                // TODO: Replace with actual API call
                // const response = await fetch('/api/v1/auth/login', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         accountType,
                //         userRole: accountType === 'institute' ? userRole : null,
                //         email: formData.email,
                //         password: formData.password,
                //         instituteCode: formData.instituteCode
                //     })
                // });
                
                // Simulate login success
                console.log('Login attempt:', {
                    accountType,
                    userRole: accountType === 'institute' ? userRole : null,
                    ...formData
                });
                
                // Store auth state
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('accountType', accountType);
                if (accountType === 'institute') {
                    localStorage.setItem('userRole', userRole);
                }
                
                // Navigate to dashboard
                navigate('/');
            } catch (error) {
                console.error('Login failed:', error);
                setErrors({ submit: 'Login failed. Please check your credentials.' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding & Info */}
                <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                S
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-text-main">StudyPoint</h1>
                                <p className="text-text-muted">AI-Powered Learning Platform</p>
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-text-main mb-4">
                            Welcome Back! 👋
                        </h2>
                        <p className="text-lg text-text-muted mb-8">
                            Continue your learning journey with AI-powered study tools, 
                            interactive flashcards, and personalized analytics.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: Sparkles, text: 'AI-Generated Study Materials' },
                                { icon: GraduationCap, text: 'Personalized Learning Paths' },
                                { icon: CheckCircle, text: 'Track Your Progress' }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="p-2 bg-primary-light rounded-lg text-primary">
                                        <feature.icon size={20} />
                                    </div>
                                    <span className="text-text-muted">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <Card className="p-8 shadow-xl">
                        {/* Account Type Selector */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-text-main mb-2">Sign In</h2>
                            <p className="text-text-muted mb-6">Choose your account type</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setAccountType('individual')}
                                    className={`
                                        p-4 rounded-xl border-2 transition-all text-left
                                        ${accountType === 'individual'
                                            ? 'border-primary bg-primary-light shadow-md'
                                            : 'border-border hover:border-primary/50 bg-surface'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${accountType === 'individual' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            <User size={20} />
                                        </div>
                                        <span className="font-semibold text-text-main">Individual</span>
                                    </div>
                                    <p className="text-xs text-text-muted">For personal learning</p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setAccountType('institute')}
                                    className={`
                                        p-4 rounded-xl border-2 transition-all text-left
                                        ${accountType === 'institute'
                                            ? 'border-primary bg-primary-light shadow-md'
                                            : 'border-border hover:border-primary/50 bg-surface'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${accountType === 'institute' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            <Building2 size={20} />
                                        </div>
                                        <span className="font-semibold text-text-main">Institute</span>
                                    </div>
                                    <p className="text-xs text-text-muted">For schools & colleges</p>
                                </button>
                            </div>

                            {/* Institute Role Selector */}
                            <AnimatePresence>
                                {accountType === 'institute' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-6"
                                    >
                                        <p className="text-sm font-medium text-text-muted mb-3">I am a:</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setUserRole('student')}
                                                className={`
                                                    p-3 rounded-lg border-2 transition-all flex items-center gap-2
                                                    ${userRole === 'student'
                                                        ? 'border-primary bg-primary-light text-primary'
                                                        : 'border-border hover:border-primary/50 text-text-muted'
                                                    }
                                                `}
                                            >
                                                <GraduationCap size={18} />
                                                <span className="font-medium">Student</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUserRole('faculty')}
                                                className={`
                                                    p-3 rounded-lg border-2 transition-all flex items-center gap-2
                                                    ${userRole === 'faculty'
                                                        ? 'border-primary bg-primary-light text-primary'
                                                        : 'border-border hover:border-primary/50 text-text-muted'
                                                    }
                                                `}
                                            >
                                                <UserCircle size={18} />
                                                <span className="font-medium">Faculty</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Success Message from Registration */}
                        {location.state?.message && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 text-green-700">
                                    <CheckCircle size={20} />
                                    <p className="text-sm font-medium">{location.state.message}</p>
                                </div>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Institute Code (only for institute login) */}
                            <AnimatePresence>
                                {accountType === 'institute' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <label className="block text-sm font-medium text-text-main mb-2">
                                            Institute Code
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                                            <input
                                                type="text"
                                                name="instituteCode"
                                                value={formData.instituteCode}
                                                onChange={handleInputChange}
                                                placeholder="Enter your institute code"
                                                className={`
                                                    w-full pl-10 pr-4 py-3 rounded-lg border bg-surface
                                                    focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                                    ${errors.instituteCode ? 'border-error' : 'border-border'}
                                                `}
                                            />
                                        </div>
                                        {errors.instituteCode && (
                                            <p className="text-xs text-error mt-1">{errors.instituteCode}</p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        className={`
                                            w-full pl-10 pr-4 py-3 rounded-lg border bg-surface
                                            focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                            ${errors.email ? 'border-error' : 'border-border'}
                                        `}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-error mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className={`
                                            w-full pl-10 pr-12 py-3 rounded-lg border bg-surface
                                            focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                            ${errors.password ? 'border-error' : 'border-border'}
                                        `}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-error mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-text-muted">Remember me</span>
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-primary hover:text-primary-hover font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Error Message */}
                            {errors.submit && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                    {errors.submit}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                icon={ArrowRight}
                            >
                                Sign In
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-surface text-text-muted">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login (Optional) */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="text-sm font-medium text-text-main">Google</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <span className="text-sm font-medium text-text-main">Facebook</span>
                                </button>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-text-muted">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register"
                                        className="text-primary hover:text-primary-hover font-semibold"
                                    >
                                        Sign up for free
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
