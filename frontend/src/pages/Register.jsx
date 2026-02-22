import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    UserPlus,
    CheckCircle,
    X
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Register = () => {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('individual');
    const [userRole, setUserRole] = useState('student');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        instituteCode: '',
        studentId: '', // For institute students
        department: '' // For faculty
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        if (accountType === 'institute') {
            if (!formData.instituteCode) {
                newErrors.instituteCode = 'Institute code is required';
            }
            if (userRole === 'student' && !formData.studentId) {
                newErrors.studentId = 'Student ID is required';
            }
            if (userRole === 'faculty' && !formData.department) {
                newErrors.department = 'Department is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Registration attempt:', {
                accountType,
                userRole: accountType === 'institute' ? userRole : null,
                ...formData
            });
            
            // Simulate registration success
            // In production, you might want to auto-login or show success message
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        }
    };

    const passwordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        const levels = [
            { label: 'Very Weak', color: 'bg-red-500' },
            { label: 'Weak', color: 'bg-orange-500' },
            { label: 'Fair', color: 'bg-yellow-500' },
            { label: 'Good', color: 'bg-blue-500' },
            { label: 'Strong', color: 'bg-green-500' }
        ];

        return levels[Math.min(strength - 1, 4)] || levels[0];
    };

    const strength = passwordStrength(formData.password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Card className="p-8 shadow-xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                                S
                            </div>
                            <h2 className="text-2xl font-bold text-text-main">Create Account</h2>
                        </div>
                        <p className="text-text-muted">Join StudyPoint and start your learning journey</p>
                    </div>

                    {/* Account Type Selector */}
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4">
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
                                        <User size={18} />
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
                                        <Building2 size={18} />
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
                                    className="mt-4"
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

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className={`
                                        w-full pl-10 pr-4 py-3 rounded-lg border bg-surface
                                        focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                        ${errors.fullName ? 'border-error' : 'border-border'}
                                    `}
                                />
                            </div>
                            {errors.fullName && (
                                <p className="text-xs text-error mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Institute Code (for institute) */}
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

                        {/* Student ID (for institute students) */}
                        <AnimatePresence>
                            {accountType === 'institute' && userRole === 'student' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Student ID
                                    </label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleInputChange}
                                        placeholder="Enter your student ID"
                                        className={`
                                            w-full px-4 py-3 rounded-lg border bg-surface
                                            focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                            ${errors.studentId ? 'border-error' : 'border-border'}
                                        `}
                                    />
                                    {errors.studentId && (
                                        <p className="text-xs text-error mt-1">{errors.studentId}</p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Department (for faculty) */}
                        <AnimatePresence>
                            {accountType === 'institute' && userRole === 'faculty' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label className="block text-sm font-medium text-text-main mb-2">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Computer Science"
                                        className={`
                                            w-full px-4 py-3 rounded-lg border bg-surface
                                            focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                            ${errors.department ? 'border-error' : 'border-border'}
                                        `}
                                    />
                                    {errors.department && (
                                        <p className="text-xs text-error mt-1">{errors.department}</p>
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
                                    placeholder="Create a strong password"
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
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded ${
                                                    level <= (strength.label === 'Very Weak' ? 1 : strength.label === 'Weak' ? 2 : strength.label === 'Fair' ? 3 : strength.label === 'Good' ? 4 : 5)
                                                        ? strength.color
                                                        : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs ${strength.color.replace('bg-', 'text-')}`}>
                                        {strength.label}
                                    </p>
                                </div>
                            )}
                            {errors.password && (
                                <p className="text-xs text-error mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className={`
                                        w-full pl-10 pr-12 py-3 rounded-lg border bg-surface
                                        focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                                        ${errors.confirmPassword ? 'border-error' : 'border-border'}
                                    `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-error mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-text-muted">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-primary hover:underline">
                                        Terms and Conditions
                                    </Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {errors.agreeToTerms && (
                                <p className="text-xs text-error mt-1">{errors.agreeToTerms}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full mt-6"
                            icon={UserPlus}
                        >
                            Create Account
                        </Button>

                        {/* Login Link */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-text-muted">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-primary hover:text-primary-hover font-semibold"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;
