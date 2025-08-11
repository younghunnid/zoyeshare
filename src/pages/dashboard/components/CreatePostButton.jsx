import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CreatePostButton = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/content-creator');
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold text-white mb-2">Ready to Create?</h3>
      <p className="text-white/80 mb-4">Share your content across all platforms with one click</p>
      <Button
        variant="outline"
        size="lg"
        onClick={handleCreatePost}
        iconName="PenTool"
        iconPosition="left"
        className="bg-white text-primary hover:bg-white/90 border-white"
      >
        Create New Post
      </Button>
    </div>
  );
};

export default CreatePostButton;