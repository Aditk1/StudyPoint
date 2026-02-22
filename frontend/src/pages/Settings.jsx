import React, { useState, useEffect } from 'react';
import { User, Bell, Lock, Save } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Settings = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: ''
    });

    const [isSaved, setIsSaved] = useState(false);

    // Load profile data from localStorage when component mounts or email changes
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail') || '';
        const savedProfile = localStorage.getItem(`profile_${userEmail}`);
        
        if (savedProfile) {
            try {
                setProfileData(JSON.parse(savedProfile));
            } catch (error) {
                console.error('Error parsing saved profile:', error);
                // Initialize with email if no saved profile
                initializeProfile(userEmail);
            }
        } else {
            // Initialize with email if no profile exists
            initializeProfile(userEmail);
        }
    }, []);

    const initializeProfile = (email) => {
        // Extract first name from email if available
        const namePart = email.split('@')[0];
        setProfileData({
            firstName: '',
            lastName: '',
            email: email,
            bio: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
        setIsSaved(false);
    };

    const handleSave = () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            localStorage.setItem(`profile_${userEmail}`, JSON.stringify(profileData));
            setIsSaved(true);
            // Reset saved message after 2 seconds
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-text-muted">Manage your account preferences</p>
            </div>

            <div className="flex gap-8 flex-col lg:flex-row">
                {/* Sidebar Nav */}
                <div className="w-full lg:w-64 flex flex-col gap-2">
                    <button className="flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm">
                        <User size={18} /> Profile
                    </button>
                    <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-text-muted rounded-lg font-medium text-sm transition-colors">
                        <Bell size={18} /> Notifications
                    </button>
                    <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-text-muted rounded-lg font-medium text-sm transition-colors">
                        <Lock size={18} /> Security
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                    <Card>
                        <h3 className="font-bold text-lg mb-6 text-text-main pb-4 border-b border-border">Profile Information</h3>

                        {isSaved && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                                Profile saved successfully!
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-text-muted">First Name</label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary/20 outline-none" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-text-muted">Last Name</label>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        value={profileData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary/20 outline-none" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-text-muted">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={profileData.email}
                                    disabled
                                    className="w-full p-2 rounded-lg border border-border bg-gray-100 text-text-muted focus:ring-2 focus:ring-primary/20 outline-none cursor-not-allowed" 
                                />
                                <p className="text-xs text-text-muted">Email cannot be changed</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-text-muted">Bio</label>
                                <textarea 
                                    rows={4} 
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself..."
                                    className="w-full p-2 rounded-lg border border-border bg-surface focus:ring-2 focus:ring-primary/20 outline-none" 
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button icon={Save} onClick={handleSave}>Save Changes</Button>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-lg mb-6 text-text-main pb-4 border-b border-border">Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Dark Mode</p>
                                    <p className="text-xs text-text-muted">Toggle application theme</p>
                                </div>
                                <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-xs text-text-muted">Receive weekly digests</p>
                                </div>
                                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
