import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TopPostsTable = ({ posts, title }) => {
  const [sortBy, setSortBy] = useState('engagement');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const platformIcons = {
    Facebook: 'Facebook',
    Instagram: 'Instagram',
    Twitter: 'Twitter',
    LinkedIn: 'Linkedin',
    TikTok: 'Music',
    YouTube: 'Youtube'
  };

  const platformColors = {
    Facebook: 'bg-blue-500',
    Instagram: 'bg-pink-500',
    Twitter: 'bg-sky-500',
    LinkedIn: 'bg-blue-600',
    TikTok: 'bg-black',
    YouTube: 'bg-red-500'
  };

  const sortedPosts = [...posts]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const paginatedPosts = sortedPosts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalPages = Math.ceil(sortedPosts?.length / postsPerPage);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-left hover:text-primary transition-colors duration-200"
    >
      <span>{children}</span>
      {sortBy === column && (
        <Icon 
          name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
          size={14} 
        />
      )}
    </button>
  );

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000)?.toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Post
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Platform
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                <SortButton column="publishedAt">Date</SortButton>
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                <SortButton column="engagement">Engagement</SortButton>
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                <SortButton column="reach">Reach</SortButton>
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                <SortButton column="clicks">Clicks</SortButton>
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts?.map((post, index) => (
              <tr key={post?.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200">
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    {post?.thumbnail && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={post?.thumbnail}
                          alt="Post thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">
                        {post?.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {post?.content}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full ${platformColors?.[post?.platform]} flex items-center justify-center`}>
                      <Icon name={platformIcons?.[post?.platform]} size={12} color="white" />
                    </div>
                    <span className="text-sm text-card-foreground">{post?.platform}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-sm text-card-foreground">
                    {formatDate(post?.publishedAt)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} className="text-error" />
                    <span className="text-sm font-medium text-card-foreground">
                      {formatNumber(post?.engagement)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-card-foreground">
                      {formatNumber(post?.reach)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="MousePointer" size={14} className="text-accent" />
                    <span className="text-sm font-medium text-card-foreground">
                      {formatNumber(post?.clicks)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart3"
                      iconSize={14}
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconSize={14}
                    >
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, sortedPosts?.length)} of {sortedPosts?.length} posts
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              iconName="ChevronLeft"
              iconSize={16}
            >
              Previous
            </Button>
            <span className="text-sm text-card-foreground px-3">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              iconName="ChevronRight"
              iconSize={16}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPostsTable;