import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaManager = ({ mediaFiles, onRemoveMedia, onReorderMedia }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileType = (file) => {
    if (file?.type?.startsWith('image/')) return 'image';
    if (file?.type?.startsWith('video/')) return 'video';
    return 'unknown';
  };

  const handlePreview = (media) => {
    setSelectedMedia(media);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedMedia(null);
  };

  if (mediaFiles?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="ImagePlus" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Media Added</h3>
        <p className="text-muted-foreground">
          Upload images or videos to enhance your content and increase engagement.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Media Files</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {mediaFiles?.length} file{mediaFiles?.length !== 1 ? 's' : ''}
            </span>
            <Button variant="ghost" size="sm" iconName="Grid3X3">
              Grid View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaFiles?.map((media, index) => (
            <div
              key={media?.id || index}
              className="relative group bg-muted/30 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-200"
            >
              {/* Media Preview */}
              <div className="aspect-square relative">
                {getFileType(media) === 'image' ? (
                  <Image
                    src={media?.preview || media?.url || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400"}
                    alt={media?.name || `Media ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : getFileType(media) === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <Icon name="Play" size={32} className="text-white" />
                    <video
                      src={media?.preview || media?.url}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                      muted
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Icon name="File" size={32} className="text-muted-foreground" />
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(media)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveMedia(index)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-white border-red-500/30"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>

                {/* File Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    getFileType(media) === 'image' ?'bg-blue-500/20 text-blue-300 border border-blue-500/30' :'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {getFileType(media) === 'image' ? 'IMG' : 'VID'}
                  </span>
                </div>

                {/* Processing Status */}
                {media?.processing && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/70 rounded px-2 py-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-white">Processing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">
                  {media?.name || `Media ${index + 1}`}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(media?.size || 0)}
                  </span>
                  {media?.duration && (
                    <span className="text-xs text-muted-foreground">
                      {media?.duration}s
                    </span>
                  )}
                </div>
                
                {/* Platform Compatibility */}
                <div className="flex items-center space-x-1 mt-2">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-xs text-success">All platforms</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        {mediaFiles?.length > 1 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Drag to reorder • First image will be the cover
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="ArrowUpDown">
                  Reorder
                </Button>
                <Button variant="ghost" size="sm" iconName="Trash2">
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Media Preview Modal */}
      {showPreview && selectedMedia && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClosePreview}
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
            
            <div className="bg-card rounded-lg overflow-hidden">
              {getFileType(selectedMedia) === 'image' ? (
                <Image
                  src={selectedMedia?.preview || selectedMedia?.url || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800"}
                  alt={selectedMedia?.name || 'Media preview'}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <video
                  src={selectedMedia?.preview || selectedMedia?.url}
                  controls
                  className="max-w-full max-h-[80vh]"
                />
              )}
              
              <div className="p-4 border-t border-border">
                <h4 className="font-medium text-foreground">
                  {selectedMedia?.name || 'Media File'}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatFileSize(selectedMedia?.size || 0)} • {getFileType(selectedMedia)?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaManager;