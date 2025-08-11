import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileSection = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    bio: userProfile?.bio || '',
    timezone: userProfile?.timezone || 'America/New_York',
    avatar: userProfile?.avatar || ''
  });
  const [avatarPreview, setAvatarPreview] = useState(userProfile?.avatar || '');
  const [isUploading, setIsUploading] = useState(false);

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e?.target?.result);
        setFormData(prev => ({
          ...prev,
          avatar: e?.target?.result
        }));
        setIsUploading(false);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      bio: userProfile?.bio || '',
      timezone: userProfile?.timezone || 'America/New_York',
      avatar: userProfile?.avatar || ''
    });
    setAvatarPreview(userProfile?.avatar || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
          <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
                  <Icon name="User" size={32} color="white" />
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} color="white" className="animate-spin" />
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="flex flex-col space-y-2">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Button variant="outline" iconName="Upload" iconPosition="left">
                  Upload Photo
                </Button>
              </label>
              <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={formData?.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            disabled={!isEditing}
            searchable
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-foreground">Account Type</label>
            <div className="px-3 py-2 bg-muted rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Free Plan</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
          <textarea
            value={formData?.bio}
            onChange={(e) => handleInputChange('bio', e?.target?.value)}
            disabled={!isEditing}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData?.bio?.length}/500 characters
          </p>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;