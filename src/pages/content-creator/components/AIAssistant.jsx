import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AIAssistant = ({ onContentGenerated, onHashtagsGenerated, currentContent }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('captions');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedLength, setSelectedLength] = useState('medium');
  const [selectedIndustry, setSelectedIndustry] = useState('general');

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'educational', label: 'Educational' },
    { value: 'promotional', label: 'Promotional' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short (1-2 sentences)' },
    { value: 'medium', label: 'Medium (3-5 sentences)' },
    { value: 'long', label: 'Long (6+ sentences)' }
  ];

  const industryOptions = [
    { value: 'general', label: 'General' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'travel', label: 'Travel & Tourism' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'fashion', label: 'Fashion & Beauty' }
  ];

  const mockCaptions = {
    professional: {
      short: "Excited to share our latest innovation with the team. Great things happen when we collaborate! 🚀",
      medium: "Today marks another milestone in our journey toward excellence. Our team's dedication and innovative spirit continue to drive us forward, creating solutions that make a real difference. Grateful for the opportunity to work alongside such talented individuals. 💼✨",
      long: "Reflecting on this quarter's achievements, I'm incredibly proud of what we've accomplished together. Our commitment to innovation, customer satisfaction, and continuous improvement has led to remarkable results. From launching new features to expanding our market reach, every step has been a testament to our team's expertise and dedication. Looking ahead, we're excited about the opportunities that lie before us and the positive impact we can continue to make in our industry. Thank you to everyone who has been part of this incredible journey. 🌟"
    },
    casual: {
      short: "Just had the best coffee and now I\'m ready to take on the world! ☕️ What\'s fueling your day?",
      medium: "You know those days when everything just clicks? Today is one of those days! 😊 Started with a great workout, had an amazing breakfast, and now diving into some exciting projects. Sometimes it's the simple things that make the biggest difference. Hope your day is going just as well! 🌈",
      long: "Hey everyone! 👋 Just wanted to share a little slice of my day with you all. Woke up feeling super grateful for all the amazing people in my life and the opportunities that keep coming my way. Had a fantastic morning walk (the weather was absolutely perfect!), grabbed my favorite latte from the local café, and now I'm settling in for a productive day ahead. There's something magical about those moments when you feel completely aligned with where you're supposed to be. Sending good vibes to all of you - hope your day is filled with little moments of joy too! ✨💕"
    },
    humorous: {
      short: "Me: I\'ll just check social media for 5 minutes. Also me: *3 hours later* How did I end up watching cat videos? 😹",
      medium: "Breaking news: Local person discovers that 'quick social media check' is actually a portal to another dimension where time moves differently and cat videos are currency. Scientists are baffled. More at 11. 📺🐱 In other news, I should probably get back to work... eventually. 😅",
      long: "Today's life update: Attempted to be a responsible adult by making a to-do list. Successfully wrote 'make to-do list' and immediately felt accomplished enough to reward myself with a snack break. Three hours later, I've reorganized my entire spice cabinet (why do I have 4 bottles of oregano?), learned 17 new TikTok dances, and somehow became an expert on the mating habits of penguins. The original to-do list? Still sitting there, judging me silently. But hey, at least I'm now prepared for any penguin-related emergencies that might arise! 🐧✨ #AdultingIsHard #PenguinExpert #SpiceCabinetGoals"
    }
  };

  const mockHashtags = {
    technology: ['#TechInnovation', '#DigitalTransformation', '#AI', '#MachineLearning', '#CloudComputing', '#Cybersecurity', '#DataScience', '#IoT', '#Blockchain', '#TechTrends'],
    healthcare: ['#HealthTech', '#MedicalInnovation', '#PatientCare', '#HealthcareIT', '#Telemedicine', '#MedicalDevice', '#HealthData', '#WellnessTech', '#DigitalHealth', '#HealthcareLeadership'],
    finance: ['#FinTech', '#DigitalBanking', '#InvestmentTech', '#CryptoNews', '#FinancialPlanning', '#WealthManagement', '#PaymentTech', '#InsurTech', '#FinancialInnovation', '#MoneyManagement'],
    general: ['#Innovation', '#Leadership', '#Growth', '#Success', '#Teamwork', '#Motivation', '#Excellence', '#Progress', '#Achievement', '#Inspiration']
  };

  const handleGenerateCaption = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const captions = mockCaptions?.[selectedTone] || mockCaptions?.professional;
    const generatedCaption = captions?.[selectedLength] || captions?.medium;
    
    onContentGenerated(generatedCaption);
    setIsGenerating(false);
  };

  const handleGenerateHashtags = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const hashtags = mockHashtags?.[selectedIndustry] || mockHashtags?.general;
    const selectedHashtags = hashtags?.slice(0, 5)?.join(' ');
    
    onHashtagsGenerated(selectedHashtags);
    setIsGenerating(false);
  };

  const handleImproveContent = async () => {
    if (!currentContent) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const improvedContent = `${currentContent}\n\nWhat are your thoughts on this? I'd love to hear your perspective! 💭`;
    onContentGenerated(improvedContent);
    setIsGenerating(false);
  };

  const tabs = [
    { id: 'captions', label: 'Generate Captions', icon: 'PenTool' },
    { id: 'hashtags', label: 'Hashtag Suggestions', icon: 'Hash' },
    { id: 'improve', label: 'Improve Content', icon: 'Sparkles' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Powered by advanced AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-success font-medium">Online</span>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/30 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Caption Generation */}
      {activeTab === 'captions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Tone"
              options={toneOptions}
              value={selectedTone}
              onChange={setSelectedTone}
            />
            <Select
              label="Length"
              options={lengthOptions}
              value={selectedLength}
              onChange={setSelectedLength}
            />
          </div>
          
          <Select
            label="Industry/Niche"
            options={industryOptions}
            value={selectedIndustry}
            onChange={setSelectedIndustry}
          />

          <Button
            variant="default"
            onClick={handleGenerateCaption}
            loading={isGenerating}
            iconName="Sparkles"
            fullWidth
          >
            {isGenerating ? 'Generating Caption...' : 'Generate Caption'}
          </Button>
        </div>
      )}
      {/* Hashtag Generation */}
      {activeTab === 'hashtags' && (
        <div className="space-y-4">
          <Select
            label="Industry/Topic"
            options={industryOptions}
            value={selectedIndustry}
            onChange={setSelectedIndustry}
          />

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Smart Hashtag Tips</p>
                <p className="text-muted-foreground">
                  Mix popular and niche hashtags for better reach. Aim for 5-10 hashtags per post.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            onClick={handleGenerateHashtags}
            loading={isGenerating}
            iconName="Hash"
            fullWidth
          >
            {isGenerating ? 'Finding Hashtags...' : 'Generate Hashtags'}
          </Button>
        </div>
      )}
      {/* Content Improvement */}
      {activeTab === 'improve' && (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Content Enhancement</p>
                <p className="text-muted-foreground">
                  AI will analyze your content and suggest improvements for better engagement.
                </p>
              </div>
            </div>
          </div>

          {currentContent ? (
            <div className="space-y-3">
              <div className="p-3 bg-input rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Current content:</p>
                <p className="text-sm text-foreground">{currentContent?.slice(0, 100)}...</p>
              </div>
              
              <Button
                variant="default"
                onClick={handleImproveContent}
                loading={isGenerating}
                iconName="Sparkles"
                fullWidth
              >
                {isGenerating ? 'Improving Content...' : 'Improve Content'}
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Write some content first, then I can help improve it!
              </p>
            </div>
          )}
        </div>
      )}
      {/* Usage Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">AI Credits Used Today</span>
          <span className="text-foreground font-medium">7/50</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '14%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;