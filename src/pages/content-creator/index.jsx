import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Header from '../../components/ui/Header';
import ContentEditor from './components/ContentEditor';
import PlatformSelector from './components/PlatformSelector';
import PlatformPreview from './components/PlatformPreview';
import SchedulingControls from './components/SchedulingControls';
import AIAssistant from './components/AIAssistant';
import MediaManager from './components/MediaManager';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContentCreator = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'instagram', 'twitter']);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [characterCounts, setCharacterCounts] = useState({});

  // Mock user context
  const userContext = {
    name: "Sarah Johnson",
    tier: "Pro",
    connectedPlatforms: 6,
    hasNotifications: true
  };

  // Calculate character counts for each platform
  useEffect(() => {
    const counts = {};
    selectedPlatforms?.forEach(platform => {
      counts[platform] = content?.length;
    });
    setCharacterCounts(counts);
  }, [content, selectedPlatforms]);

  const handlePlatformToggle = (platformId, isSelected) => {
    if (isSelected) {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    } else {
      setSelectedPlatforms(selectedPlatforms?.filter(id => id !== platformId));
    }
  };

  const handleMediaUpload = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          
          // Add files to media manager
          const newFiles = files?.map((file, index) => ({
            id: Date.now() + index,
            name: file?.name,
            size: file?.size,
            type: file?.type,
            preview: URL.createObjectURL(file),
            processing: false
          }));
          
          setMediaFiles(prev => [...prev, ...newFiles]);
          setShowMediaManager(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemoveMedia = (index) => {
    setMediaFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const handleContentGenerated = (generatedContent) => {
    setContent(generatedContent);
  };

  const handleHashtagsGenerated = (hashtags) => {
    setContent(prev => prev + '\n\n' + hashtags);
  };

  const handleSchedule = (scheduleData) => {
    console.log('Scheduling post:', { content, selectedPlatforms, mediaFiles, scheduleData });
    // Here you would typically send the data to your backend
    alert(`Post scheduled for ${scheduleData?.datetime?.toLocaleString()}`);
  };

  const handlePostNow = () => {
    if (!content?.trim() && mediaFiles?.length === 0) {
      alert('Please add some content or media before posting.');
      return;
    }
    
    if (selectedPlatforms?.length === 0) {
      alert('Please select at least one platform to post to.');
      return;
    }

    console.log('Posting now:', { content, selectedPlatforms, mediaFiles });
    // Here you would typically send the data to your backend
    alert(`Posted to ${selectedPlatforms?.length} platform(s) successfully!`);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { content, selectedPlatforms, mediaFiles });
    alert('Draft saved successfully!');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    navigate('/account-settings');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userContext={userContext}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <Header
          userContext={userContext}
          onNotificationClick={handleNotificationClick}
          onProfileClick={handleProfileClick}
        />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Content Creator</h1>
                <p className="text-muted-foreground mt-2">
                  Create, optimize, and schedule content across multiple platforms
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  iconName="Bot"
                >
                  AI Assistant
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowMediaManager(!showMediaManager)}
                  iconName="Image"
                >
                  Media ({mediaFiles?.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Content Editor & Platform Selection */}
            <div className="xl:col-span-2 space-y-6">
              <ContentEditor
                content={content}
                onContentChange={setContent}
                onMediaUpload={handleMediaUpload}
                uploadProgress={uploadProgress}
                isUploading={isUploading}
              />
              
              <PlatformSelector
                selectedPlatforms={selectedPlatforms}
                onPlatformToggle={handlePlatformToggle}
                characterCounts={characterCounts}
              />
              
              <SchedulingControls
                onSchedule={handleSchedule}
                onPostNow={handlePostNow}
                onSaveDraft={handleSaveDraft}
              />
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <PlatformPreview
                selectedPlatforms={selectedPlatforms}
                content={content}
                mediaFiles={mediaFiles}
              />
            </div>
          </div>

          {/* AI Assistant Modal */}
          {showAIAssistant && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAIAssistant(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <div className="p-6">
                  <AIAssistant
                    onContentGenerated={handleContentGenerated}
                    onHashtagsGenerated={handleHashtagsGenerated}
                    currentContent={content}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Media Manager Modal */}
          {showMediaManager && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Media Manager</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMediaManager(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <div className="p-6">
                  <MediaManager
                    mediaFiles={mediaFiles}
                    onRemoveMedia={handleRemoveMedia}
                    onReorderMedia={(fromIndex, toIndex) => {
                      const newFiles = [...mediaFiles];
                      const [removed] = newFiles?.splice(fromIndex, 1);
                      newFiles?.splice(toIndex, 0, removed);
                      setMediaFiles(newFiles);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Characters</p>
                  <p className="text-xl font-semibold text-foreground">{content?.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Icon name="Share2" size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Platforms</p>
                  <p className="text-xl font-semibold text-foreground">{selectedPlatforms?.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon name="Image" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Media Files</p>
                  <p className="text-xl font-semibold text-foreground">{mediaFiles?.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Drafts Saved</p>
                  <p className="text-xl font-semibold text-foreground">12</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentCreator;