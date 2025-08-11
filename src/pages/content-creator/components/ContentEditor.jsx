import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContentEditor = ({ content, onContentChange, onMediaUpload, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onMediaUpload(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onMediaUpload(files);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef?.current?.click();
  };

  const triggerVideoUpload = () => {
    videoInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Create Content</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Save">
            Save Draft
          </Button>
          <Button variant="ghost" size="sm" iconName="Sparkles">
            AI Assist
          </Button>
        </div>
      </div>
      {/* Content Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e?.target?.value)}
            placeholder="What's on your mind? Share your thoughts with the world..."
            className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* Character Count */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Characters: {content?.length}</span>
          <span className="text-xs">AI suggestions available</span>
        </div>
      </div>
      {/* Media Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Uploading media...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="ImagePlus" size={24} className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Drag & drop your media here
              </p>
              <p className="text-xs text-muted-foreground">
                Support for images (JPG, PNG, GIF) and videos (MP4, MOV) up to 4K
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Image"
                onClick={triggerImageUpload}
              >
                Add Images
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Video"
                onClick={triggerVideoUpload}
              >
                Add Videos
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" iconName="Hash">
            Hashtags
          </Button>
          <Button variant="ghost" size="sm" iconName="AtSign">
            Mention
          </Button>
          <Button variant="ghost" size="sm" iconName="MapPin">
            Location
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Eye">
            Preview
          </Button>
          <Button variant="ghost" size="sm" iconName="Settings">
            Advanced
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;